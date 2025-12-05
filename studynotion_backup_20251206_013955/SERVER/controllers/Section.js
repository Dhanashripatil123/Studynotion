const Section = require("../models/Section");
const Course = require("../models/Course");

// ======================= CREATE SECTION =======================
exports.createSection = async (req, res) => {
  try {
    // data fetch
    const { sectionName, courseId } = req.body;

    // data validation
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Fill all requirements",
      });
    }

    // create section
    const newSection = await Section.create({ sectionName, course: courseId });

    // update course with section objectID
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { courseContent: newSection._id },
      },
      { new: true }
    )
      .populate({
        path: "courseContent", // populate all sections
        populate: {
          path: "subSection", // populate subsections inside sections
        },
      })
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Section created successfully",
      updatedCourseDetails,
    });
  } catch (error) {
    console.log("Error creating section:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again",
    });
  }
};

// ======================= UPDATE SECTION =======================
exports.updatedSection = async (req, res) => {
  try {
    const { sectionName, sectionId, courseId } = req.body;

    // validation
    if (!sectionName || !sectionId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "All fields (sectionName, sectionId, courseId) are required",
      });
    }

    // update section
    const section = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // fetch updated course with populated sections + subsections
    const updatedCourse = await Course.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    if (!updatedCourse) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Section updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.log("Error updating section:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ======================= DELETE SECTION =======================
exports.deleteSection = async (req, res) => {
  try {
    // get IDs from body
    const { sectionId, courseId } = req.body;

    // delete section
    const section = await Section.findByIdAndDelete(sectionId);
    if (!section) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    // also remove the section reference from courseContent
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $pull: { courseContent: sectionId } }, // remove deleted section from array
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    // return response
    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
      data: updatedCourse,
    });
  } catch (err) {
    console.log("Error deleting section:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again",
    });
  }
};
