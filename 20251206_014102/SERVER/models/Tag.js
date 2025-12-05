// const mongoose = require("mongoose");

// const tagSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   description: {
//     type: String,
//     required: true
//   }
// });

// module.exports = mongoose.model("Tag", tagSchema);

const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
});

module.exports = mongoose.model("Tag", TagSchema);
