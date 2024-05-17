import mongoose from 'mongoose';
import productModel from "../models/productModel.js";
import categoryModel from '../models/categoryModel.js';
import userModel from "../models/userModel.js";
import fs from "fs";
import slugify from "slugify";


export const createProductController = async (req, res) => {
  try {
    const { name, description, age, breed, category } = req.fields;
    const { photo } = req.files;

    // Validation
    switch (true) {
      case !name:
        return res.status(400).send({ error: "Name is required." });
      case !description:
        return res.status(400).send({ error: "Description is required." });
      case !age:
        return res.status(400).send({ error: "Age is required." });
      case !breed:
        return res.status(400).send({ error: "Breed is required." });
      case !category:
        return res.status(400).send({ error: "Category is required." });
      case photo && photo.size > 1000000:
        return res.status(400).send({ error: "Photo should be less than 1 MB." });
    }

    // Ensure user information is available
    if (!req.user || !req.user._id) {
      return res.status(401).send({ error: "Unauthorized: User information is missing." });
    }

    // Create new product with the logged-in user as the poster
    const products = new productModel({
      ...req.fields,
      slug: slugify(name),
      postedBy: req.user._id, // Set to the current logged-in user's ID
    });

    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();

    res.status(201).send({
      success: true,
      message: "Product created successfully.",
      product: products, // Corrected key to be 'product'
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating product.",
    });
  }
};

//get all products
export const getProductController = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).send({
        success: false,
        message: "Unauthorized: User not authenticated.",
      });
    }

    const userId = req.user._id;

    const products = await productModel
      .find({ postedBy: userId })
      .populate("category", "name")
      .populate("postedBy","name")
      .sort({ createdAt: -1 });

    // Transform products to include a URL for the photo
    const productsWithPhotoURL = products.map(product => ({
      ...product._doc,
      photoURL: `/api/v1/product/photo/${product._id}`, // URL to fetch the photo
    }));

    res.status(200).send({
      success: true,
      message: "Products retrieved successfully",
      products: productsWithPhotoURL,
    });
  } catch (error) {
    console.error("Error fetching products by user:", error);
    res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

// get single product
export const getSingleProductController = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category")
      .populate("postedBy", "name");
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Eror while getitng single product",
      error,
    });
  }
};

// get photo
export const productPhotoController = async (req, res) => {
  try {
    const product = await productModel.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Erorr while getting photo",
      error,
    });
  }
};

//delete controller
export const deleteProductController = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pid).select("-photo");
    res.status(200).send({
      success: true,
      message: "Product Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

//upate product
export const updateProductController = async (req, res) => {
  try {
    const { name, description, age, breed, category } =
      req.fields;
    const { photo } = req.files;
    // Validation
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is Required" });
      case !description:
        return res.status(500).send({ error: "Description is Required" });
        case !age:
        return res.status(500).send({ error: "Age is Required" });
        case !breed:
        return res.status(500).send({ error: "Breed is Required" });
      case !category:
        return res.status(500).send({ error: "Category is Required" });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Photo is Required and should be less than 1mb" });
    }

    let updatedFields = { ...req.fields, slug: slugify(name) };

    if (photo) {
      updatedFields = {
        ...updatedFields,
        "photo.data": fs.readFileSync(photo.path),
        "photo.contentType": photo.type,
      };
    }

    const updatedProduct = await productModel.findByIdAndUpdate(
      req.params.pid,
      updatedFields,
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Product Updated Successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Update product",
    });
  }
};


// filters
export const productFiltersController = async (req, res) => {
  try {
      const { checked, radio, breeds } = req.body; // Include breeds in the request body
      let args = {};
      if (checked.length > 0) args.category = checked;
      if (radio.length) args.age = { $gte: radio[0], $lte: radio[1] };
      if (breeds.length) args.breed = { $in: breeds }; // Filter by breeds
      const products = await productModel.find(args);
      res.status(200).send({
          success: true,
          products,
      });
  } catch (error) {
      console.log(error);
      res.status(400).send({
          success: false,
          message: "Error While Filtering Products",
          error,
      });
  }
};



// product count
export const productCountController = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in product count",
      error,
      success: false,
    });
  }
};

// product list base on page
export const productListController = async (req, res) => {
  try {
    const perPage = 2;
    const page = req.params.page ? req.params.page : 1;
    const products = await productModel
      .find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "error in per page ctrl",
      error,
    });
  }
};

// search product
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;

    // Find products that match the given keyword in name
    let results = await productModel.find({
      name: { $regex: keyword, $options: 'i' }
    }).select('-photo');

    // If no results found by name, try searching by category
    if (results.length === 0) {
      const category = await categoryModel.findOne({
        name: { $regex: keyword, $options: 'i' },
      });

      if (category) {
        results = await productModel.find({
          category: category._id
        }).select('-photo');
      }
    }

    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error in Search Product API',
      error: error.message
    });
  }
};


// Get products by shelter ID
export const getProductsByShelterController = async (req, res) => {
  try {
    const { shelterId } = req.params;

    if (!shelterId || !mongoose.Types.ObjectId.isValid(shelterId)) {
      return res.status(400).send({
        success: false,
        message: 'Invalid or missing shelter ID.',
      });
    }

    const shelter = await userModel.findById(shelterId); // Find the shelter by ID
    if (!shelter) {
      return res.status(404).send({
        success: false,
        message: 'Shelter not found.',
      });
    }

    const products = await productModel     
     .find({ postedBy: shelterId }) // Retrieve products by shelter
    .populate('category', 'name') // Populate category with only the 'name' field
    .populate('postedBy', 'name')
    .sort({ createdAt: -1 });

    if (products.length === 0) {
      return res.status(404).send({
        success: false,
        message: 'No products found for the specified shelter.',
      });
    }

    const productsWithPhotoURL = products.map((product) => ({
      ...product._doc,
      photoURL: `/api/v1/product/photo/${product._id}`,
    }));

    res.status(200).send({
      success: true,
      message: 'Products retrieved successfully.',
      products: productsWithPhotoURL,
      shelterName: shelter.name,
    });
  } catch (error) {
    console.error('Error fetching products by shelter:', error);
    res.status(500).send({
      success: false,
      message: 'Internal server error.',
      error: error.toString(), // Log the error as a string
    });
  }
};



