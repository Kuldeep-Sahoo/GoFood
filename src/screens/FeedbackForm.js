import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FeedbackForm = () => {
  const navigate = useNavigate();
  // State to hold form data
  const [rating, setRating] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission

    if (!rating || !message) {
      alert("Please fill out both the rating and the message fields.");
      return; // Exit the function if validation fails
    }

    // Prepare data to be sent
    const email = localStorage.getItem("userEmail");
    const feedbackData = {
      rating,
      message,
      email,
    };

    try {
      // API call to submit feedback
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/feedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(feedbackData),
        }
      );

      if (response.ok) {
        alert("Thanks for Your feedback 👍👍👍");
        window.location.reload();
      } else {
        console.error("Error submitting feedback:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-body">
          <h2 className="text-center mb-4">We Value Your Feedback! 😊</h2>

          <form onSubmit={handleSubmit}>
            <div className="text-center mb-4 emoji-rating" style={{ fontSize: "60px" }}>
              {["1", "2", "3", "4", "5"].map((value) => (
                <span key={value} style={{ cursor: "pointer", fontSize: rating === value ? "80px" : "60px" }}>
                  <input
                    type="radio"
                    name="rating"
                    id={`rating${value}`}
                    value={value}
                    checked={rating === value}
                    onChange={(e) => setRating(e.target.value)}
                    style={{ display: "none" }}
                  />
                  <label htmlFor={`rating${value}`}>
                    {value === "1" ? "😡" : value === "2" ? "😟" : value === "3" ? "😐" : value === "4" ? "😊" : "😍"}
                  </label>
                </span>
              ))}
            </div>
            <div className="mb-3">
              <label htmlFor="feedbackMessage" className="form-label fs-3">
                Leave a message
              </label>
              <textarea
                className="form-control"
                id="feedbackMessage"
                rows="4"
                placeholder="Tell us about your experience..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn btn-success btn-lg">
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FeedbackForm;
