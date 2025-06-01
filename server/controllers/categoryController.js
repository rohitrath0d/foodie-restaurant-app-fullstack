const categoryModel = require("../models/categoryModel");

// create restaurant
const createCategoryController = async (req, res) => {
  try {

    //  const userId = req.user.id; // Extracted from token by auth middleware

    // Optional: check if user is admin — either here or in separate middleware
    // const user = await userModel.findById(userId);
    // if (user.usertype !== 'admin') return res.status(403).send({ ... });


    const { title, imageUrl } = req.body;
    // validation
    if (!title | !imageUrl) {
      return res.status(500).send({
        success: false,
        message: "please provide category title or image",
        error: error.message
      })
    }
    const newCategory = new categoryModel({ 
      title, 
      imageUrl 
      // createdBy: userId, // optional
    })
    // saving newCategory 
    await newCategory.save();
    res.status(201).send({
      success: true,
      message: "Category created successfully!",
      category: newCategory
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Category APi",
      error: error.message
    })
  }
};



const getAllCategoryCategory = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    if (!categories) {
      return res.status(404).send({
        success: false,
        message: "No Categories found.",
        error: error.message
      })
    }
    res.status(200).send({
      success: true,
      totalCategory: categories.length,
      categories
    })

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get all category APi",
      error: error.message,
    })

  }
}



const updateCategoryByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imageUrl } = req.body;
    // the { new: true } option tells Mongoose:
    // “Hey, after updating, give me the updated document, not the old one.”
    //  Without { new: true }:
    // You would get the old version of the document (before the update), which is usually not helpful when you want to show the updated result immediately on the frontend.
    const updateCategory = await categoryModel.findByIdAndUpdate(id, { title, imageUrl }, { new: true });       //   {new: true} -> ✅ return the updated document
    if (!updateCategory) {
      return res.status(500).send({
        success: false,
        message: "No Category Found",
        // error: error.message
      })
    }
    res.status(200).send({
      success: true,
      message: "Category updated successfully!",
      updatedCategory: updateCategory, // send the data
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Update Category APi",
      error: error.message
    })

  }
}

const deleteCategoryByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(500).send({
        success: false,
        message: "Please provide Category ID",
      })
    }
    const category = await categoryModel.findById(id);
    if (!category) {
      return res.status(500).send({
        success: false,
        message: "No category was found with this id",
      })
    }
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category Deleted Successfully!",
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in a Delete Category APi",
      error: error.message,
    })

  }

}
module.exports = { createCategoryController, getAllCategoryCategory, updateCategoryByIdController, deleteCategoryByIdController }