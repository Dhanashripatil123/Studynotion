const Tag = require("../models/Categories")

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
        const CategorieDetails = await Tag.create({
            name: name,
            description: description
        });
        console.log(CategorieDetails);
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

//getAllcategories handler function

exports.showAllcategories = async (req, res) => {
    try {
        const allCate = await Tag.find({}, { name: true, description: true });
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