import breedModel from "../models/breedModel.js";
import slugify from "slugify";
export const createBreedController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(401).send({ message: "Name is required" });
    }
    const existingBreed = await breedModel.findOne({ name });
    if (existingBreed) {
      return res.status(200).send({
        success: true,
        message: "Breed Already Exisits",
      });
    }
    const breed = await new breedModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: "new breed created",
      breed,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      errro,
      message: "Errro in breed",
    });
  }
};

//update category
export const updateBreedController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const breed = await breedModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      messsage: "Breed Updated Successfully",
      breed,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while updating Breed",
    });
  }
};

// get all cat
export const breedControlller = async (req, res) => {
  try {
    const breed = await breedModel.find({});
    res.status(200).send({
      success: true,
      message: "All Breed List",
      breed,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error while getting all Breed",
    });
  }
};

// single category
export const singleBreedController = async (req, res) => {
  try {
    const breed = await breedModel.findOne({ slug: req.params.slug });
    res.status(200).send({
      success: true,
      message: "Get Single Breed Successfully",
      breed,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While getting Single Breed",
    });
  }
};

//delete category
export const deleteBreedCOntroller = async (req, res) => {
  try {
    const { id } = req.params;
    await breedModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Breed Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error while deleting Breed",
      error,
    });
  }
};