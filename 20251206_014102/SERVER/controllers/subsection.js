const Subsection = require('../models/SubSection');
const Section = require('../models/section');
const { uploadImageToCloundinary } = require("../utils/imageUploader");

// ======================= CREATE SUBSECTION =======================
exports.creteSubSection = async (req, res) => {
  try {
    // fetch data from req body
    const { sectionId, title, description } = req.body;

    // extract file/video
    const video = req.files.video;

    // validation
    if (!sectionId || !title || !description || !video) {
      return res.status(404).json({
        success: false,
        message: "All fields are required",
      });
    }

    // upload video to cloudinary
    const uploadDatails = await uploadImageToCloundinary(
      video,
      process.env.FOLDER_NAME
    );

    // create a sub-section
    const SubsectionDetails = await Subsection.create({
      title: title,
      description,
      video: uploadDatails.secure_url,
      sectionId: sectionId,
    });

    // update section with this sub section ObjectId
    const updateSubSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: {
          subSection: SubsectionDetails._id, // ✅ lowercase "subSection" matches schema
        },
      },
      { new: true }
    ).populate("subSection");

    // ======================= HW: log updated section here =======================
    console.log("Updated Section after adding Subsection:", updateSubSection);

    // return response
    return res.status(200).json({
      success: true,
      message: "SubSection created successfully",
      data: updateSubSection,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
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
