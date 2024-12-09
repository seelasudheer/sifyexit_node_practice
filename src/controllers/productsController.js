const productsSchema = require("../models/productModel");

const fetchProducts = async (req, res) => {
  try {
    console.log(req?.body, "bodyy");
    let productsList = await productsSchema.find();
    res.send(productsList);
  } catch (err) {
    res.send({ message: err?.message });
  }
};
const fetchByCategories = async (req, res) => {
  try {
    console.log(req?.body, "bodyy");
    let productsList = await productsSchema.aggregate([
      {
        $group: {
          _id: "$category",
          totalCount: { $sum: 1 }, // Group by department
        },
      },
      {
        $sort: { totalCount: -1 }, // Sort by totalEmployees in descending order
      },
      {
        $project: {
          _id: 0, // Exclude the _id field
          categoty: "$_id", // Rename _id to department
          totalCount: 1, // Include totalEmployees field
        },
      },
    ]);
    res.send(productsList);
  } catch (err) {
    res.send({ message: err?.message });
  }
};
const fetchSelectedCategories = async (req, res) => {
  try {
    const { categoriesList = [] } = req.body;
    if (categoriesList?.length > 0) {
      let productsList = await productsSchema.find({ category: { $in: categoriesList } });
      console.log(productsList, "productsList");

      res.send(productsList);
    } else {
      res.status(401).send({ message: "categoriesList shouldn't be empty" });
    }
  } catch (err) {
    res.send({ message: err?.message });
  }
};

const addNewProduct = async (req, res) => {
  try {
    let newItem = await productsSchema.create({ ...req.body });
    console.log(newItem, "newItem");

    res.status(201).send({ message: "New Item created", data: newItem });
  } catch (err) {
    res.send({ message: `Error: ${err?.message}` });
  }
};
const updateProduct = async (req, res) => {
  try {
    let { id } = req?.params;

    if (id) {
      const updateDoc = {
        $set: req.body,
      };
      let updatedResponse = await productsSchema.updateOne({ _id: id }, updateDoc);
      console.log(updatedResponse, "updatedResponse");
      res.status(201).send(updatedResponse);
    } else {
      res.status(400).send({ message: "Id mandatory" });
    }
  } catch (err) {
    res.send({ message: err?.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    let { id } = req?.params;
    console.log(req?.params, "req?.params", req.body);

    if (id) {
      let deletedResponse = await productsSchema.deleteOne({ _id: id });
      console.log(deletedResponse, "deletedResponse");
      res.status(201).send(deletedResponse);
    } else {
      res.status(400).send({ message: "Id mandatory" });
    }
  } catch (err) {
    res.send({ message: err?.message });
  }
};

module.exports = {
  fetchProducts,
  addNewProduct,
  deleteProduct,
  updateProduct,
  fetchByCategories,
  fetchSelectedCategories,
};

//query to update many fields
// let productsList = await productsSchema.updateMany(
//   { category: "headphones" }, // Filter criteria
//   { $set: { category: "Headsets" } } // Update operation
// );
