const express = require("express");
const { ObjectId } = require("mongodb");
const router = express.Router();

// Route to add a food item
router.post("/addItem", async (req, res) => {
  try {
    // Destructure data from the request body
    const { CategoryName, name, img, options, description } = req.body;

    // Validate required fields
    if (
      !CategoryName ||
      !name ||
      !img ||
      !options ||
      options.length === 0 ||
      !description
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Validate that options are structured properly
    const invalidOption = options.find((option) => {
      // Ensure each option object has valid key-value pairs (like {"half": "130", "full": "220"})
      const keys = Object.keys(option);
      const prices = Object.values(option);
      // Ensure each option has at least one key, and each price is a valid number
      return keys.length === 0 || !prices.every((price) => !isNaN(price));
    });

    if (invalidOption) {
      return res.status(400).json({
        error:
          "Each option must have valid key-value pairs (e.g., 'half': '130').",
      });
    }

    // Access the database
    const db = require("../db");
    const foodItemsCollection = db.collection("food-items");
    const foodCategoryCollection = db.collection("food-category");

    // Check if the category exists
    const existingCategory = await foodCategoryCollection.findOne({
      CategoryName,
    });

    // If the category doesn't exist, add it to the food-category collection
    if (!existingCategory) {
      const newCategory = {
        _id: new ObjectId(), // Generate a unique _id for the category
        CategoryName,
      };
      await foodCategoryCollection.insertOne(newCategory);
      console.log(`New category added: ${CategoryName}`);
    }

    // Insert the new food item with options as received
    const newItem = {
      CategoryName,
      name,
      img,
      options, // Store the options directly as received (array of objects with dynamic keys)
      description,
    };

    const result = await foodItemsCollection.insertOne(newItem);

    // Send success response
    res.status(201).json({
      message: "Item added successfully.",
      itemId: result.insertedId,
    });
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ error: "An error occurred while adding the item." });
  }
});

module.exports = router;
