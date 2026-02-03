// const Profile = require("../models/Profile");
// const User = require("../models/User");
// const Course = require("../models/Course");
// const Fileupload = require("../models/Fileupload"); 
// const translate = require("../")



// exports.updateProfile = async(req,res) => {
//       try{
//         //get data
//         const {dateOfBirth="",about="",contactNumber,gender} = req.body;
//         //get userId
//         const id = req.user.id;
//         //validation
//         if( !contactNumber|| !gender || !id){
//                return res.status(400).json({success:false,
//                     message:"please fill all requirements"                              
//                })                                   
//         }
//         //find profils
//         const userDetails = await User.findById(id);
//         const profileId = userDetails.additionalDetails;
//         const profileDetails =  await Profile.findById(profileId);

//         //update profile
//        profileDetails.dateOfBirth = dateOfBirth;
//        profileDetails.about = about;
//        profileDetails.gender = gender;
//        profileDetails.contactNumber = contactNumber;
//        await profileDetails.save(); //here if we have a object then need to only save in db , if object is not then we are use profilsDetails.create()
//         //retun response  
//         return res.status(200).json({
//             success:true,
//             message:"Profile Upload successfully",
//             profileDetails,
//         })
//       }catch(error){
//          console.log(error);
//           return res.status(500).json({
//             success:false,
//             message:"something went wrong , please try again"                                  
//            })
//       }                                            
// };

// //deleteAccount

// exports.deleteAccount = async(req,res)=>{
//     try{
//         //get id
//         console.log("Printing Id:",req.user.id);
        
//         const id = req.user.id;
//         //validation
//         const user = await User.findById({_id:id});
//         if(!user){
//             return res.status(404).json({
//                 success:false,
//                 message:"User not found",
//             });
//         }
//         //delete profile
//         await Profile.findByIdAndDelete({_id:user.additionalDetails});
         
//         //TODO:HW delete unroll user from all enrolled courses
//         // const id1 = req.Course.id;
//         // const CourseDetails = await Course.findById(id1);
//         // await CourseDetails.updateMany(
                   
//         //     { $pull: { studentsEnrolled: id } }   // remove user ID from studentsEnrolled array
//         // );
//         //delete user
//         await User.findByIdAndDelete({_id:id});
//         //6847c9a73d183e453659044c
//         //return response
   
//           return res.status(400).json({
//             success:true,
//           message:"user deleted successfully"
//         })

//     }catch(error) {
//         console.log(error);
        
//         return res.status(400).json({
//             success: false,
//             message: "something went wrong"
//         })

//     }
// }



// exports.getUserDetails = async (req, res) => {
//     try {
//         const users = await User.find().populate("additionalDetails"); 

//         return res.status(200).json({
//             success: true,
//             message: "Fetched all user details successfully",
//             data: users
//         });
//     } catch (err) {
//         console.error("Error in getUserDetails:", err);
//         return res.status(500).json({
//             success: false,
//             message: "Something went wrong while fetching users"
//         });
//     }
// };

// exports.getEnrolledCourses = async(req,res)=>{
//     try {
//          const userId = req.user.id;

//           if (!userId) {
//       return res.status(401).json({ success: false, message: "Unauthorized" });
//     }

//     const user = await User.findById(userId)
//       .populate({
//         path: "courses",
//         populate: {
//           path: "instructor",
//           select: "firstName lastName email"
//         }
//       });

//        if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }
//         // const Course  = await User.find().populate("studentEnrolled");

//         // return res.status(200).json({
//         //     success: true,
//         //     message: "Fetched all user details successfully",
//         //     data: Course
//         // });

        
//     return res.status(200).json({
//       success: true,
//       message: "Fetched enrolled courses successfully",
//       data: user.courses,
//     });
    
//     } catch (err) {
//         console.error("Error in getUserDetails:", err);
//         return res.status(500).json({
//             success: false,
//             message: "Something went wrong while fetching users"
//         });
//     } 
// };

// exports.imageUpload = async (req, res) => {
//     try {
//         //data fetch
//         const { name, tags, email } = req.body;
//         console.log(name, tags, email);

//         const file = req.files.imageFile;
//         console.log(file);

//         //validation
//         const supportedTypes = ["jpg", "jpeg", "png"];
//         const fileType = file.name.split('.')[1].toLowerCase();
//         console.log("File Type:", fileType);


//         if (!isFileTypeSupported(fileType, supportedTypes)) {
//             return res.status(400).json({
//                 success: false,
//                 message: "File format not supported",
//             })
//         }

//         //file format supported hai
//         console.log("Uploading to Codehelp");
//         const response = await uploadFileToCloundinary(file, "codehelp");
//         console.log(response);

//         //db me entry save krni h 
//         const fileData = await Fileupload.create({
//             name,
//             tags,
//             email,
//             imageUrl: response.api_secret,

//         })

//         res.json({
//             success: true,
//             imageUrl: response.secure_url,
//             message: "Image Successfully Upload",

//         })
//     }

//     catch (error) {
//         console.error(error);
//         res.status(400).json({
//             success: false,
//             message: "something went wrong",
//         })
//     }
// }

// exports.translate= async (req, res) => {
//   try {
//     const { text } = req.body; // English text from user
//     const result = await translate(text, { to: "hi" }); // hi = Hindi
//     res.json({ translatedText: result.text });
//   } catch (err) {
//     res.status(500).json({ error: "Translation failed" });
//   }
// };

const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const Fileupload = require("../models/Fileupload");
const translate = require("../");

// Utility function (YOU MUST HAVE THIS somewhere in utils)
function convertSecondsToDuration(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}h ${m}m ${s}s`;
}


// ======================================================================
//  UPDATE PROFILE
// ======================================================================

exports.updateProfile = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      dateOfBirth = "",
      about = "",
      contactNumber,
      gender,
    } = req.body;

    const id = req.user.id;
    if (!id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Ensure profile exists
    const profileId = userDetails.additionalDetails;
    let profileDetails = null;
    if (profileId) {
      profileDetails = await Profile.findById(profileId);
    }

    // Update profile fields if provided
    if (profileDetails) {
      if (dateOfBirth !== undefined) profileDetails.dateOfBirth = dateOfBirth;
      if (about !== undefined) profileDetails.about = about;
      if (gender !== undefined) profileDetails.gender = gender;
      if (contactNumber !== undefined) profileDetails.contactNumber = contactNumber;
      await profileDetails.save();
    }

    // Update user fields if provided
    if (firstName !== undefined) userDetails.firstName = firstName;
    if (lastName !== undefined) userDetails.lastName = lastName;
    await userDetails.save();

    // Re-fetch user with populated profile details so frontend sees new fields
    const populatedUser = await User.findById(id).populate("additionalDetails");

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: { user: populatedUser, profile: profileDetails },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong, please try again",
    });
  }
};


// ======================================================================
//  DELETE ACCOUNT
// ======================================================================

exports.deleteAccount = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await Profile.findByIdAndDelete(user.additionalDetails);
    await User.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });

  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};


// ======================================================================
//  GET ALL USERS
// ======================================================================

exports.getUserDetails = async (req, res) => {
  try {
    const users = await User.find().populate("additionalDetails");

    return res.status(200).json({
      success: true,
      message: "Fetched all user details successfully",
      data: users,
    });

  } catch (err) {
    console.error("Error in getUserDetails:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching users",
    });
  }
};


// ======================================================================
//  GET ENROLLED COURSES  (SCREENSHOT LOGIC INSERTED HERE)
// ======================================================================

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await User.findById(userId)
      .populate({
        path: "courses",
        populate: [
          { path: "instructor", select: "firstName lastName email" },
          {
            path: "courseContent",
            populate: { path: "subSection" },
          },
        ],
      })
      .lean(); // convert to plain JS object

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // ---------------------------------------------------------
    // ⭐ SCREENSHOT LOGIC STARTS HERE
    // ---------------------------------------------------------

    for (let i = 0; i < user.courses.length; i++) {
      const course = user.courses[i];

      let totalDurationInSeconds = 0;
      let SubsectionLength = 0;

      // Loop through content
      for (let j = 0; j < course.courseContent.length; j++) {
        const module = course.courseContent[j];

        totalDurationInSeconds += module.subSection.reduce(
          (acc, curr) => acc + parseInt(curr.timeDuration || 0),
          0
        );

        SubsectionLength += module.subSection.length;
      }

      course.totalDuration = convertSecondsToDuration(totalDurationInSeconds);

      const courseProgress = await CourseProgress.findOne({
        courseID: course._id,
        userId,
      });

      const completedVideos = courseProgress?.completedVideos?.length || 0;

      if (SubsectionLength === 0) {
        course.progressPercentage = 100;
      } else {
        const multiplier = Math.pow(10, 2);
        course.progressPercentage =
          Math.round((completedVideos / SubsectionLength) * 100 * multiplier) /
          multiplier;
      }
    }

    // ---------------------------------------------------------
    // ⭐ SCREENSHOT LOGIC ENDS HERE
    // ---------------------------------------------------------

    return res.status(200).json({
      success: true,
      message: "Fetched enrolled courses successfully",
      data: user.courses,
    });

  } catch (err) {
    console.error("Error in getEnrolledCourses:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while fetching enrolled courses",
    });
  }
};


// ======================================================================
//  IMAGE UPLOAD
// ======================================================================

exports.imageUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;

    const file = req.files.imageFile;

    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    if (!supportedTypes.includes(fileType)) {
      return res.status(400).json({
        success: false,
        message: "File format not supported",
      });
    }

    const response = await uploadFileToCloudinary(file, "profile-uploads");

    const fileData = await Fileupload.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Image uploaded successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};


// ======================================================================
//  TRANSLATE API
// ======================================================================

exports.translate = async (req, res) => {
  try {
    const { text } = req.body;
    const result = await translate(text, { to: "hi" });

    res.json({ translatedText: result.text });

  } catch (err) {
    res.status(500).json({ error: "Translation failed" });
  }
};

exports.instructorDashboard = async (req, res) => {
  try {
    const userId = req.user && (req.user.id || req.user._id);

    const courseDetails = await Course.find({ instructor: userId });

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = Array.isArray(course.studentEnrolled) ? course.studentEnrolled.length : 0;
      const price = Number(course.price) || 0;
      const totalAmountGenerated = totalStudentsEnrolled * price;

      const courseDetailWithStats = {
        _id: course._id,
        courseName: course.courseName,
        totalStudentsEnrolled,
        courseDescription: course.courseDescription,
        totalAmountGenerated,
      };
      return courseDetailWithStats;
    });

    return res.status(200).json({
      success: true,
      message: 'Course details with stats fetched successfully',
      data: { courses: courseData },
    });
  } catch (err) {
    console.error('Error in instructorDashboard:', err);
    return res.status(500).json({
      success: false,
      message: 'Something went wrong while fetching instructor dashboard data',
    });
  }
};
