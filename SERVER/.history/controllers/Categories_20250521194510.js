const Categorie = require("../models/Categorie")

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
            message: "categorie created successfully"
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

//getAllcategories handler function

exports.showAllcategorie = async (req, res) => {
    try {
        const getAllcategorie = await Tag.find({}, { name: true, description: true });
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

//categoryPageDetails

exports.CategoryPageDetails = async(req,res) => {
    try{
       //get category
       const {categoryId} = req.body;
       //get course for specified categorId
       const selectedCategory = await Category.findById(categoryId)
                                .populate("courses")
                                .exec();
       //validation 
        if(!selectedCategory){
            return res.status().json({
                success:false,
                message:"data not found"
            });
        }
       //get coursefor different categories
       const differentcatego
       //get top selling courses
       //return res  
    }catch(err){

    }
}