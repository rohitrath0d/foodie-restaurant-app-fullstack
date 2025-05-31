const TagModel = require("../models/TagModel");

// create tag
const createTagController = async (req, res) => {
  try {
    const { name, color, isGlobal } = req.body;

    // Validate required fields
    if (!name || !color) {
      return res.status(400).send({
        success: false,
        message: "Name and color are required",
      });
    }

    // Create new tag
    const newTag = new TagModel({
      name,
      color,
      // createdBy: req.admin.id,             // Assuming req.admin contains the authenticated admin's info
      isGlobal: isGlobal || false,
    });

    await newTag.save();

    res.status(201).send({
      success: true,
      message: "Tag created successfully",
      tag: newTag,
    });
  } catch (error) {
    console.error("Error creating tag:", error);
    res.status(500).send({
      success: false, 
      message: "Error creating tag",
      error: error.message,
    });
  }
};

const getAllTagsController = async (req, res) => {
  try {
    const tags = await TagModel.find();                 // you can add filters if needed
    // return res.status(200).send({
    //   success: true,
    //   message: "Tags fetched successfully",
    //   tags
    // });          // --> for .json() we need to return, but in case of res.send() we don't need to return anything, it directly sends it as a response
    res.status(200).send({
      success: true,
      message: "Tags fetched successfully",
      tags
    });
  } catch (error) {
    console.error('Error fetching tags:', error.message);
    res.status(500).send({ 
      success: false,
      message: 'Failed to fetch tags',
      error: error.message, 
    });
  }
};


const getTagByIdController = async (req, res) => {
  try {
    const { tagId } = req.params;

    // Find the tag by ID
    const tag = await TagModel.findById(tagId);
    if (!tag) {
      return res.status(404).send({
        success: false,
        message: "Tag not found",
      });
    }
    res.status(200).send({
      success: true,
      tag,
    });
}
  catch (error) {
    console.error("Error fetching tag:", error);
    res.status(500).send({
      success: false,
      message: "Error fetching tag",
      error: error.message,
    });
  }
}

const updateTagController = async (req, res) => {
  try {
    const { tagId } = req.params;
    const { name, color, isGlobal } = req.body;

    // Validate required fields
    if (!name || !color) {
      return res.status(400).send({
        success: false,
        message: "Name and color are required",
      });
    }

    // Find the tag by ID and update it
    const updatedTag = await TagModel.findByIdAndUpdate(
      tagId,
      { name, color, isGlobal },
      { new: true, runValidators: true }
    );

    if (!updatedTag) {
      return res.status(404).send({
        success: false,
        message: "Tag not found",
      });
    }

    res.status(200).send({
      success: true,
      message: "Tag updated successfully",
      tag: updatedTag,
    });
    
  } catch (error) {
    console.error("Error updating tag:", error);
    res.status(500).send({
      success: false,
      message: "Error updating tag",
      error: error.message,
    }); 
  }
}



const deleteTagController = async (req, res) => {
  try {
    const { tagId } = req.params;

    // Find the tag by ID and delete it
    const deletedTag = await TagModel.findByIdAndDelete(tagId);
    if (!deletedTag) {
      return res.status(404).send({
        success: false,
        message: "Tag not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Tag deleted successfully",
      tag: deletedTag,
    });
  } catch (error) {
    console.error("Error deleting tag:", error);
    res.status(500).send({
      success: false,
      message: "Error deleting tag",
      error: error.message,
    });
  }
}

module.exports = { createTagController, updateTagController,getAllTagsController, getTagByIdController, deleteTagController };