const mongoose = require("mongoose");

const subSectionSchema = new mongoose.Schema({
    sectionId:{
        type:String,
        
    },
    title: {
        type: String,
        required: true,
    },
    timeDuration: {
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    video: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model("SubSection", subSectionSchema);
