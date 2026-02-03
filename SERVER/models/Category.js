const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        trim: true,
    },
    // store courses belonging to this category
    courses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },
    ],
});

module.exports = mongoose.model("Category", CategorySchema);
