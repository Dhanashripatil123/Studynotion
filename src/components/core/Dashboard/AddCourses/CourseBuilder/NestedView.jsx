import React, { useState, useEffect } from 'react'
import { RxDropdownMenu } from "react-icons/rx";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { IoCaretDownOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom'

// A lightweight NestedView that works with local state passed from parent.
// Props:
// - sections: array of section objects { _id, sectionName, subSection: [{_id,title,description}] }
// - onAddLecture(sectionId, lectureObj)
// - onDeleteLecture(sectionId, lectureId)
// - onDeleteSection(sectionId)
// - openSectionId: optional id to scroll/open

export default function NestedView({ sections = [], onAddLecture, onDeleteLecture, onDeleteSection, onUpdateSection, openSectionId, highlightLectureId: highlightProp, editSubSection, setEditSubSection }) {
  const navigate = useNavigate()
  const [addSubSectionFor, setAddSubSectionFor] = useState(null)
  const [highlightLectureId, setHighlightLectureId] = useState(null)
  const [localOpen, setLocalOpen] = useState(null)

  useEffect(() => {
    if (openSectionId) {
      setLocalOpen(openSectionId)
      const el = document.getElementById(`section-${openSectionId}`)
      if (el) setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80)
    }

    // if parent requested a lecture highlight, honor it
    if (highlightProp) {
      setHighlightLectureId(highlightProp)
      const lecEl = document.getElementById(`lecture-${highlightProp}`)
      if (lecEl) setTimeout(() => lecEl.scrollIntoView({ behavior: 'smooth', block: 'center' }), 120)
      // clear highlight after a short delay
      setTimeout(() => setHighlightLectureId(null), 3000)
    }
  }, [openSectionId, highlightProp])

  const handleAddLecture = (sectionId, title, description, videoFile) => {
    if (!title?.trim()) return
    const lecture = { title: title.trim(), description: description || '' }
    if (videoFile) lecture.videoFile = videoFile
    if (onAddLecture) onAddLecture(sectionId, lecture)
    setAddSubSectionFor(null)
  }

  const handleDeleteSectionClick = (id) => {
    if (!onDeleteSection) return
    onDeleteSection(id)
  }

  const handleDeleteLectureClick = (sectionId, lectureId) => {
    if (!onDeleteLecture) return
    onDeleteLecture(sectionId, lectureId)
   }

   return (
    <div className="space-y-4">
      {sections.map((section) => (
        <details key={section._id} id={`section-${section._id}`} open={localOpen ?? false} className="group">
          <summary className='flex items-center justify-between gap-x-3 bg-gray-800 rounded-md p-4 hover:bg-gray-700 cursor-pointer transition'>
                        <div className='flex items-center gap-x-3'>
              <div className='w-10 h-10 md:w-12 md:h-12 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-300'>
                           <RxDropdownMenu />
                        </div>
              <div>
                <p className='text-lg font-semibold text-white'>{section.sectionName}</p>
                <p className='text-sm text-gray-400'>{(section.subSection || []).length} lectures</p>
              </div>
            </div>

            <div className='flex items-center gap-x-3 text-gray-300'>
                <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); const newName = window.prompt('Rename section', section.sectionName); if (newName && onUpdateSection) onUpdateSection(section._id, newName); }} className='p-2 rounded hover:bg-gray-700'>
                          <TbEdit />
                        </button>
              <button onClick={(e) => { e.stopPropagation(); handleDeleteSectionClick(section._id) }} className='p-2 rounded hover:bg-gray-700'>
                              <MdDelete />
                           </button>
              <IoCaretDownOutline className={'text-2xl text-gray-400 ml-2'} />
                        </div>
                     </summary>

          <div className='p-4 bg-gray-900 rounded-b-md border border-t-0 border-gray-800'>
            <div className='space-y-2'>
              {(section.subSection || []).map((lecture) => (
                <div key={lecture._id} id={`lecture-${lecture._id}`} className={`flex items-center justify-between gap-x-3 py-3 px-3 rounded-md transition ${highlightLectureId === lecture._id ? 'bg-yellow-500/10 ring-2 ring-yellow-400' : 'hover:bg-gray-800'}`}>
                                 <div className='flex items-center gap-x-3'>
                    <div className='w-8 h-8 rounded bg-gray-800 flex items-center justify-center text-yellow-300'>
                                    <RxDropdownMenu />
                    </div>
                    <p className='cursor-pointer text-yellow-300 hover:text-yellow-400' onClick={() => navigate('/dashboard/view-lecture', { state: { lecture: { ...lecture, sectionId: section._id } } })}>{lecture.title}</p>
                                 </div>

                  <div className='flex items-center gap-x-3 text-gray-300'>
                      <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); if (setEditSubSection) setEditSubSection({ ...lecture, sectionId: section._id }); }} className='p-2 rounded hover:bg-gray-800'>
                                       <TbEdit />
                                    </button>
                    <button onClick={(e) => { e.stopPropagation(); handleDeleteLectureClick(section._id, lecture._id) }} className='p-2 rounded hover:bg-gray-800'>
                                       <MdDelete />
                                    </button>
                                 </div>
                              </div>
              ))}

              <div className='pt-3'>
                {addSubSectionFor === section._id ? (
                  <div className='bg-gray-800 p-4 rounded-md'>
                    <LectureInlineForm onCancel={() => setAddSubSectionFor(null)} onAdd={(t, d, f) => handleAddLecture(section._id, t, d, f)} />
                  </div>
                ) : (
                  <button onClick={() => setAddSubSectionFor(section._id)} className='inline-flex items-center gap-2 bg-yellow-500 text-black px-3 py-2 rounded-md hover:bg-yellow-600'>
                           <FaPlus />
                    <span className='font-semibold'>Add Lecture</span>
                        </button>
                )}
              </div>
            </div>
                     </div>
                  </details>
      ))}
    </div>
  )
}

function LectureInlineForm({ onCancel, onAdd }) {
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [videoFile, setVideoFile] = useState(null)
    const [dragActive, setDragActive] = useState(false)

    const handleDrag = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };

    const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const f = e.dataTransfer.files[0]
        if (!f.type.startsWith('video/')) {
          alert('Please upload a video file')
          return
        }
        setVideoFile(f)
      }
    }

    const handleFileChange = (e) => {
      const f = e.target.files && e.target.files[0]
      if (!f) return
      if (!f.type.startsWith('video/')) {
        alert('Please select a video file')
        return
      }
      setVideoFile(f)
    }

    const removeFile = () => setVideoFile(null)

    const handleAdd = () => {
      if (!title.trim()) return
      onAdd(title, desc, videoFile)
      setTitle('')
      setDesc('')
      setVideoFile(null)
    }

    return (
      <div className='space-y-4'>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Lecture title' className='w-full px-3 py-2 rounded-md bg-white text-gray-900' />
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder='Lecture description' className='w-full px-3 py-2 rounded-md bg-white text-gray-900' />

        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${dragActive ? 'border-yellow-500 bg-yellow-500/10' : 'border-gray-400 bg-gray-700'}`}
        >
          <p className='text-yellow-300 font-semibold mb-2'>Drag and drop your video here</p>
          <p className='text-gray-300 text-sm mb-3'>or</p>
          <label className='cursor-pointer inline-block'>
            <input type='file' accept='video/*' onChange={handleFileChange} className='hidden' />
            <span className='bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-md inline-block'>Choose File</span>
          </label>
          <p className='text-gray-400 text-xs mt-3'>Supported formats: MP4, WebM, Ogg (Max 500MB)</p>

          {videoFile && (
            <div className='mt-3 bg-gray-800 rounded-md p-3 flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='w-8 h-8 bg-green-500 rounded flex items-center justify-center text-black'>🎬</div>
                <div>
                  <p className='text-sm text-yellow-300 truncate max-w-xs'>{videoFile.name}</p>
                  <p className='text-xs text-gray-400'>{(videoFile.size / (1024*1024)).toFixed(2)} MB</p>
         </div>
              </div>
              <div>
                <button type='button' onClick={removeFile} className='text-sm text-gray-200 hover:text-white'>Remove</button>
              </div>
            </div>
         )}
      </div>
   
        <div className='flex gap-3 justify-end'>
          <button type='button' onClick={onCancel} className='px-4 py-2 rounded-md bg-gray-700 text-white'>Cancel</button>
          <button type='button' onClick={handleAdd} className='px-4 py-2 rounded-md bg-yellow-500 text-black'>Add Lecture</button>
        </div>
      </div>
   )
}


