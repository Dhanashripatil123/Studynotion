import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ReactPlayer from 'react-player';
// IconButton removed in favor of inline styled buttons
import { updateCompletedLectures } from '../../../slices/viewCoursesSlice';
import { FaPlayCircle } from "react-icons/fa";

function VideoDetail() {
  const { sectionId, subsectionId, courseId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const playbackRef = useRef(null);
  const [videoData, setVideoData] = useState(null);
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const location = useLocation();
  const [muted, setMuted] = useState(false);
  

  // The reducer is registered under `ViewCourse` in root reducer
  const viewState = useSelector((state) => state.ViewCourse ?? {});
  const {
    courseSectionData = [],
    courseEntireData = {},
    completedLectures = [],
  } = viewState;

  const instructor = courseEntireData?.instructor || {};

  useEffect(() => {
    if (!Array.isArray(courseSectionData) || courseSectionData.length === 0) return;

    if (!sectionId || !subsectionId) {
      navigate('/dashboard/enrolled-courses');
      return;
    }

    const section = courseSectionData.find((s) => s._id === sectionId);
    if (!section) {
      navigate('/dashboard/enrolled-courses');
      return;
    }

    const subsections = section.subSection || section.lectures || [];
    const sub = subsections.find((t) => t._id === subsectionId);
    if (!sub) {
      navigate('/dashboard/enrolled-courses');
      return;
    }

    setVideoData(sub);
    setVideoEnded(false);
    // if navigation requested autoplay (from sidebar), start playing
    const autoplayRequested = location?.state?.autoplay;
    if (autoplayRequested) {
      // browsers block unmuted autoplay — start muted then allow user to unmute
      setMuted(true);
      setPlaying(true);
    } else {
      setPlaying(false);
    }
    console.log('[VideoDetail] selected video data:', sub);
  }, [courseSectionData, sectionId, subsectionId, navigate]);

  

  const getCurrentIndexes = () => {
    const sIndex = courseSectionData.findIndex((s) => s._id === sectionId);
    if (sIndex === -1) return { sIndex: -1, subIndex: -1 };
    const subsections = courseSectionData[sIndex].subSection || courseSectionData[sIndex].lectures || [];
    const subIndex = subsections.findIndex((t) => t._id === subsectionId);
    return { sIndex, subIndex, subsections };
  };

  const isFirstVideo = () => {
    const { sIndex, subIndex } = getCurrentIndexes();
    return sIndex === 0 && subIndex === 0;
  };

  const isLastVideo = () => {
    const { sIndex, subIndex, subsections } = getCurrentIndexes();
    if (sIndex === -1) return true;
    return sIndex === courseSectionData.length - 1 && subIndex === subsections.length - 1;
  };

  const gotoNextVideo = () => {
    const { sIndex, subIndex, subsections } = getCurrentIndexes();
    if (sIndex === -1) return;
      if (subIndex < subsections.length - 1) {
      const nextSubId = subsections[subIndex + 1]._id;
      navigate(`/view-course/${courseId}/section/${courseSectionData[sIndex]._id}/subsection/${nextSubId}`);
    } else if (sIndex < courseSectionData.length - 1) {
      const nextSection = courseSectionData[sIndex + 1];
      const nextSubId = (nextSection.subSection || nextSection.lectures || [])[0]?._id;
      if (nextSubId) {
        navigate(`/view-course/${courseId}/section/${nextSection._id}/subsection/${nextSubId}`);
      }
    }
  };

  const gotoPreviousVideo = () => {
    const { sIndex, subIndex, subsections } = getCurrentIndexes();
    if (sIndex === -1) return;
    if (subIndex > 0) {
      const prevSubId = subsections[subIndex - 1]._id;
      navigate(`/view-course/${courseId}/section/${courseSectionData[sIndex]._id}/subsection/${prevSubId}`);
    } else if (sIndex > 0) {
      const prevSection = courseSectionData[sIndex - 1];
      const prevSubList = prevSection.subSection || prevSection.lectures || [];
      const prevSubId = prevSubList[prevSubList.length - 1]?._id;
      if (prevSubId) {
        navigate(`/view-course/${courseId}/section/${prevSection._id}/subsection/${prevSubId}`);
      }
    }
  };

  const handleLectureCompletion = async () => {
    setLoading(true);
    try {
      // Mark locally - server call can be added later
      dispatch(updateCompletedLectures(subsectionId));
    } catch (err) {
      console.error('Failed to mark complete', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 text-white">
      {!videoData ? (
        <div>No data found</div>
      ) : (
        <>
          {/* normalize various possible video sources */}
          {(() => {
            const candidate = videoData?.videoUrl || videoData?.video || (videoData?.video && videoData.video.secure_url) || (videoData?.video && videoData.video.url) || null;
            const videoUrl = typeof candidate === 'string' ? candidate : (candidate?.secure_url || candidate?.url || null);
            console.log('[VideoDetail] resolved videoUrl:', videoUrl);
            return (
              <div className="player-wrapper">
                <FaPlayCircle
                  onClick={async () => {
                    try {
                      // Prefer directly calling play on internal player
                      const player = playbackRef.current;
                      if (player) {
                        let internal = null;
                        try { internal = player.getInternalPlayer(); } catch (e) { internal = null; }
                        if (internal && typeof internal.play === 'function') {
                          const p = internal.play();
                          if (p && typeof p.then === 'function') {
                            p.then(() => {
                              console.log('[VideoDetail] internal player play() succeeded');
                              setPlaying(true);
                            }).catch((err) => {
                              console.warn('[VideoDetail] internal player play() rejected, falling back to playing=true', err);
                              setPlaying(true);
                            });
                            return;
                          }
                        }
                        // fallback: set playing flag for ReactPlayer
                        setPlaying(true);
                      } else {
                        setPlaying(true);
                      }
                    } catch (e) {
                      console.error('[VideoDetail] Play click handler error', e);
                      setPlaying(true);
                    }
                  }}
                  style={{ cursor: 'pointer', fontSize: 36 }}
                  aria-label="Play video"
                />
                {videoUrl ? (
                  (() => {
                    const isMp4 = String(videoUrl).toLowerCase().includes('.mp4');
                    if (isMp4) {
                      return (
                        <div>
                          <video
                            ref={playbackRef}
                            src={videoUrl}
                            controls
                            autoPlay={playing}
                            muted={muted}
                            playsInline
                            width="100%"
                            height={360}
                            crossOrigin="anonymous"
                            onCanPlay={() => console.log('[VideoDetail] native video canplay')}
                            onPlay={() => console.log('[VideoDetail] native video play')}
                            onPause={() => console.log('[VideoDetail] native video pause')}
                            onEnded={() => { setVideoEnded(true); setPlaying(false); }}
                            onError={(e) => {
                              console.error('[VideoDetail] native video error', e);
                            }}
                            style={{ backgroundColor: '#111' }}
                          />
                        </div>
                      );
                    }
                    return (
                      <ReactPlayer
                        ref={playbackRef}
                        url={videoUrl}
                        playing={playing}
                        controls
                        muted={muted}
                        width="100%"
                        height="360px"
                        config={{ file: { attributes: { crossOrigin: 'anonymous', playsInline: true } } }}
                        onReady={() => {
                          try { console.log('[VideoDetail] player ready, ref:', playbackRef.current); } catch(e){}
                        }}
                        onPlay={() => console.log('[VideoDetail] player event: play')}
                        onPause={() => console.log('[VideoDetail] player event: pause')}
                        onError={(e) => {
                          console.error('[VideoDetail] ReactPlayer error', e);
                        }}
                        onEnded={() => { setVideoEnded(true); setPlaying(false); }}
                      />
                    );
                  })()
                ) : (
                  <div className="p-4 bg-gray-900 rounded text-red-400">No playable video URL found for this lecture. Raw value: <pre style={{whiteSpace:'pre-wrap',fontSize:12}}>{JSON.stringify(videoData?.video || videoData?.videoUrl || videoData, null, 2)}</pre></div>
                )}
                {/* HTML5 fallback handled by onError logs; no diagnostic UI */}
                {/* Unmute control for muted autoplay fallback */}
                {muted && (
                  <div style={{ marginTop: 8 }}>
                    <button
                      className="px-3 py-1 bg-yellow-400 text-black rounded"
                      onClick={() => {
                        setMuted(false);
                        // attempt to play unmuted after user interaction
                        try {
                          const player = playbackRef.current;
                          const internal = player?.getInternalPlayer ? player.getInternalPlayer() : null;
                          if (internal && typeof internal.play === 'function') internal.play().catch((e) => console.warn('unmute-play prevented', e));
                        } catch (e) { console.warn('unmute attempt failed', e); }
                      }}
                    >
                      Unmute
                    </button>
                  </div>
                )}

                {/* Diagnostic UI removed per design — logs retained in console */}
              </div>
            )
          })()}

          <div className="mt-4">
            <div className="flex items-center gap-3 mb-4">
              <img src={instructor?.image || instructor?.profile || 'https://via.placeholder.com/80'} alt="instructor" className="w-16 h-16 rounded-full object-cover" />
              <div>
                <div className="text-xs text-gray-400">Instructor</div>
                <div className="text-sm font-semibold text-white">{instructor?.firstName ? `${instructor.firstName} ${instructor.lastName || ''}` : (instructor?.email || 'Instructor')}</div>
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-md border border-gray-700 mb-3">
              <div className="text-xs text-gray-400 mb-1">Lecture name</div>
              <h1 className="text-2xl font-bold text-white">{videoData?.title}</h1>
            </div>

            <div className="bg-gray-800 p-4 rounded-md border border-gray-700">
              <div className="text-xs text-gray-400 mb-1">Description</div>
              <p className="text-gray-300 text-base">{videoData?.description}</p>
            </div>

            <div className="mt-4 flex items-center gap-3">
              {/* Mark Complete / Completed box */}
              {completedLectures.includes(subsectionId) ? (
                <div className="inline-flex items-center gap-2 bg-green-600 text-white px-3 py-2 rounded-lg shadow">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172 4.707 7.879a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8z" clipRule="evenodd" /></svg>
                  <span className="font-medium">Completed</span>
                </div>
              ) : (
                videoEnded && (
                  <button
                    disabled={loading}
                    onClick={handleLectureCompletion}
                    className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-2 rounded-md font-semibold shadow"
                  >
                    Mark as Complete
                  </button>
                )
              )}

              {/* Rewatch button */}
              <button
                disabled={loading}
                onClick={() => {
                  try {
                    if (playbackRef?.current?.seekTo) {
                      playbackRef.current.seekTo(0);
                    } else if (playbackRef?.current?.getInternalPlayer) {
                      const internal = playbackRef.current.getInternalPlayer();
                      if (internal && typeof internal.seekTo === 'function') internal.seekTo(0);
                    }
                  } catch (e) { console.error('Rewatch seek error', e); }
                  setVideoEnded(false);
                }}
                className="px-3 py-2 border border-gray-700 text-gray-200 rounded-md hover:bg-gray-700"
              >
                Rewatch
              </button>

              {/* Prev/Next controls */}
              <div className="ml-auto flex gap-2">
                {!isFirstVideo() && (
                  <button disabled={loading} onClick={gotoPreviousVideo} className="px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white">
                    ← Previous
                  </button>
                )}
                {!isLastVideo() && (
                  <button disabled={loading} onClick={gotoNextVideo} className="px-3 py-2 bg-sky-600 hover:bg-sky-700 rounded-md text-white">
                    Next →
                  </button>
                )}
              </div>
            </div>

            {/* Small controls row: Rewatch, Rewind, Fast-forward */}
            <div className="mt-3 flex items-center gap-2 text-sm text-gray-300">
              <button onClick={() => { try { const p = playbackRef.current?.getInternalPlayer?.(); if (p && typeof p.currentTime === 'number') { /* noop */ } } catch (e){} }} className="px-2 py-1 bg-gray-800 rounded">Settings</button>
              <button onClick={() => { try { const player = playbackRef.current; if (player?.seekTo) player.seekTo(Math.max(0, (player.getCurrentTime ? player.getCurrentTime() : 0) - 10)); } catch(e){}}} className="px-2 py-1 bg-gray-800 rounded">◀ 10s</button>
              <button onClick={() => { try { const player = playbackRef.current; if (player?.seekTo) player.seekTo((player.getCurrentTime ? player.getCurrentTime() : 0) + 10); } catch(e){}}} className="px-2 py-1 bg-gray-800 rounded">10s ▶</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default VideoDetail;
