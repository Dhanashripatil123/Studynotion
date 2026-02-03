const Tag = require("../models/Categories")

//craete tag ka handler function

exports.createcategori = async (req, res) => {
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
        const CategorieDetail = await Tag.create({
            name: name,
            description: description
        });
        console.log(CategorieDetail);
        //return response

        return res.status(200).json({
            success: true,
            message: "Tag created successfully"
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

//getAll handler function

exports.showAllCategorie = async (req, res) => {
    try {
        const allCategorie = await Tag.find({}, { name: true, description: true });
        res.status(200).json({
            success: true,
            message: "All tags are return successfully",
            allTags,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}