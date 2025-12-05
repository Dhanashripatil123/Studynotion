const Category = require("../models/Category");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");
const Tag = require ("../models/Tag");

//craete tag ka handler function

exports.createCategorie = async (req, res) => {
    try {
        //fetch data                                        
        const { name, description } = req.body;
        //validation
        if (!name || !description) {
            return res.status(400).json({
                success: false,
                message: "All field are required"
            })
        }
        //create entry in DB
        const CategorieDetails = await Category.create({
            name: name,
            description: description,
            slug: name.trim().toLowerCase().replace(/\s+/g, '-')
        });
        console.log(CategorieDetails);
        //return response

        return res.status(200).json({
            success: true,
            message: "categorie created successfully",
            data: CategorieDetails
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

//getAllcategories handler function

exports.showAllcategorie = async (req, res) => {
    try {
        const getAllcategorie = await Category.find({}, { name: true, description: true, slug: true });
        res.status(200).json({
            success: true,
            message: "All categories returned successfully",
            data: getAllcategorie
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// categoryPageDetails

exports.CategoryPageDetails = async (req, res) => {
    try {
        const { categoryId } = req.body;
        if (!categoryId) {
            return res.status(400).json({ success: false, message: "categoryId is required" });
        }

        const mongoose = require('mongoose');

        // Resolve the category: accept ObjectId, slug, or name
        let selectedCategory = null;
        if (mongoose.Types.ObjectId.isValid(String(categoryId))) {
            selectedCategory = await Category.findById(categoryId).exec();
        }

        if (!selectedCategory) {
            // try finding by slug or name
            selectedCategory = await Category.findOne({ $or: [{ slug: categoryId }, { name: categoryId }] }).exec();
        }

        if (!selectedCategory) {
            // Auto-create curated categories (helpful in dev) instead of failing
            const slugCandidate = String(categoryId).trim().toLowerCase().replace(/\s+/g, '-');
            try {
                selectedCategory = await Category.create({
                    name: categoryId,
                    description: `Auto-created category for ${categoryId}`,
                    slug: slugCandidate
                });
                console.log('Auto-created category for:', categoryId, '->', selectedCategory._id);
            } catch (createErr) {
                console.error('Failed to auto-create category:', createErr);
                return res.status(404).json({ success: false, message: "Category not found" });
            }
        }

        const differentcategories = await Category.find({ _id: { $ne: selectedCategory._id } }).exec();

        // Find courses matching either the stored category (string) or the category id
        const categoryCourses = await Course.find({
            $or: [
                { category: selectedCategory._id },
                { category: selectedCategory.name },
                { category: selectedCategory.slug }
            ]
        })
            .limit(100)
            .exec();

        const topsellingcourse = await Course.find({})
            .sort({ studentEnrolled: -1 })
            .limit(10)
            .exec();

        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                differentcategories,
                categoryCourses,
                topsellingcourse
            }
        });
    } catch (error) {
        console.error("CategoryPageDetails error:", error && error.stack ? error.stack : error);
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
    }
}

