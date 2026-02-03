const Subsection = require('../models/SubSection');
const Section = require('../models/Section');
const { uploadImageToCloundinary } = require("../utils/imageUploader");

// ======================= CREATE SUBSECTION =======================
exports.createSubSection = async (req, res) => {
  try {
    // Debug: log incoming request fields and files to help trace missing data
    console.log('CREATE SUBSECTION - req.body:', req.body);
    console.log('CREATE SUBSECTION - req.files present:', !!req.files, 'files keys:', req.files ? Object.keys(req.files) : []);
    // fetch data from req body
    const { sectionId, title, description } = req.body;

    // extract file/video if uploaded
    const videoFile = req.files && req.files.video ? req.files.video : null;
    const videoUrl = req.body?.video;

    // validation: accept either uploaded file or a video URL
    if (!sectionId || !title || !description || (!videoFile && !videoUrl)) {
      return res.status(400).json({
        success: false,
        message: "All fields (sectionId, title, description) and a video file or URL are required",
      });
    }

    // determine video URL to store
    let finalVideoUrl = videoUrl || null;
    if (videoFile) {
      const uploadDetails = await uploadImageToCloundinary(videoFile, process.env.FOLDER_NAME);
      finalVideoUrl = uploadDetails?.secure_url || null;
    }

    // create a sub-section
    const SubsectionDetails = await Subsection.create({
      title: title,
      description,
      video: finalVideoUrl,
      sectionId: sectionId,
    });

    console.log('CREATE SUBSECTION - created SubsectionDetails:', SubsectionDetails);

    // update section with this sub section ObjectId
    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: {
          subSection: SubsectionDetails._id,
        },
      },
      { new: true }
    ).populate('subSection');

    if (!updatedSection) {
      console.warn('CREATE SUBSECTION - Section.findByIdAndUpdate returned null for sectionId:', sectionId);
    }
    console.log('Updated Section after adding Subsection:', updatedSection);

    return res.status(200).json({
      success: true,
      message: 'Lecture added successfully',
      data: updatedSection,
    });
  } catch (error) {
    console.log('Error creating subsection:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message,
    });
  }
};

// ======================= UPDATE SUBSECTION =======================
exports.updateSubSection = async (req, res) => {
  try {
    // data input
    const {sectionId, subSectionId, title, description } = req.body;

    // validation
    if (!subSectionId) {
      return res.status(400).json({
        success: false,
        message: "subSectionId is required",
      });
    }

    // prepare update object dynamically
    const updateFields = {};
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;

    // update subsection
    const updatedSubsection = await Subsection.findByIdAndUpdate(
      subSectionId,
      updateFields,
      { new: true }
    );

    if (!updatedSubsection) {
      return res.status(404).json({
        success: false,
        message: "Subsection not found",
      });
    }

    // fetch updated section with populated subsections
    const updatedSection = await Section.findById(updatedSubsection.sectionId).populate(
      "subSection"
    );

    // return res
    return res.status(200).json({
      success: true,
      data: updatedSection,
      message: "Successfully updated your Subsection",
    });
  } catch (error) {
    console.log("Error updating subsection:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again",
    });
  }
};

// ======================= DELETE SUBSECTION =======================
exports.deleteSubSection = async (req, res) => {
  try {
    // get ID from req body
    const { subSectionId } = req.body;

    // delete subsection
    const subSection = await Subsection.findByIdAndDelete(subSectionId);

    if (!subSection) {
      return res.status(404).json({
        success: false,
        message: "Subsection not found",
      });
    }

    // also remove the reference from section.subSection array
    const updatedSection = await Section.findByIdAndUpdate(
      subSection.sectionId,
      { $pull: { subSection: subSectionId } },
      { new: true }
    ).populate("subSection");

    // return response
    return res.status(200).json({
      success: true,
      data: updatedSection,
      message: "Subsection deleted successfully",
    });
  } catch (err) {
    console.log("Error deleting subsection:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again",
    });
  }
};
