import React, { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import Footer from "./Footer";
const AddFoodItem = () => {
  const [category, setCategory] = useState(""); // Single category as string
  const [options, setOptions] = useState([{ optionName: "", price: "" }]);
  const [formData, setFormData] = useState({
    name: "",
    img: "",
    description: "",
  });
  const [message, setMessage] = useState("");

  // Handle adding more options
  const handleAddOption = () => {
    setOptions([...options, { optionName: "", price: "" }]);
  };

  // Handle removing an option
  const handleRemoveOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, img, description } = formData;

    // Check if any required field is empty
    if (!name || !img || !description || !category || options.length === 0) {
      setMessage("All fields are required.");
      return;
    }

    // Check if options are populated correctly
    if (options.some((option) => !option.optionName || !option.price)) {
      setMessage("Please fill in all option names and pricing.");
      return;
    }

    // Prepare the options in the dynamic format
    const formattedOptions = options.reduce((acc, option) => {
      // Dynamically set optionName as the key and price as the value
      acc.push({ [option.optionName]: option.price });
      return acc;
    }, []);

    try {
      const response = await axios.post("http://localhost:5000/api/addItem", {
        CategoryName: category, // Send category as a single string
        name,
        img,
        options: formattedOptions, // Send the dynamically formatted options
        description,
      });

      setMessage("Food item added successfully!");
      setFormData({ name: "", img: "", description: "" });
      setCategory(""); // Reset category
      setOptions([{ optionName: "", price: "" }]); // Reset options
    } catch (error) {
      console.error("Error adding food item:", error);
      setMessage("Failed to add food item. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="d-flex justify-content-center align-items-center vh-100 bg-dark text-light"
        style={{ padding: "20px" }}
      >
        <div
          className="card bg-dark text-light shadow-lg"
          style={{ width: "100%", maxWidth: "700px" }}
        >
          <div className="card-body">
            <h3 className="card-title text-center mb-4">Add Food Item</h3>
            {message && (
              <div
                className={`alert ${
                  message.includes("successfully")
                    ? "alert-success"
                    : "alert-danger"
                }`}
                role="alert"
              >
                {message}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Item Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g., Chicken Fried Rice"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="img" className="form-label">
                  Image URL
                </label>
                <input
                  type="url"
                  className="form-control"
                  id="img"
                  name="img"
                  value={formData.img}
                  onChange={(e) =>
                    setFormData({ ...formData, img: e.target.value })
                  }
                  placeholder="Paste the image URL here"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  name="description"
                  rows="3"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Enter a brief description of the food item"
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="Category Name (e.g., Main Course)"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Options</label>
                {options.map((option, index) => (
                  <div className="input-group mb-2" key={index}>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Option Name (e.g., Size, Topping)"
                      value={option.optionName}
                      onChange={(e) => {
                        const updatedOptions = [...options];
                        updatedOptions[index].optionName = e.target.value;
                        setOptions(updatedOptions);
                      }}
                      required
                    />
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Price"
                      value={option.price}
                      onChange={(e) => {
                        const updatedOptions = [...options];
                        updatedOptions[index].price = e.target.value;
                        setOptions(updatedOptions);
                      }}
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleRemoveOption(index)}
                      disabled={options.length === 1}
                    >
                      -
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddOption}
                >
                  + Add Option
                </button>
              </div>
              <button type="submit" className="btn btn-success w-100">
                Add Item
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddFoodItem;
