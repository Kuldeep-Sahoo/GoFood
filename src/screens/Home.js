import React, { useCallback, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Card from "../screens/Card";
// import Carousel from "../components/Carousel";
import "./Home.css";
import Modal from "./../Modal";
import FeedbackForm from "./FeedbackForm";

export default function Home() {
  const [search, setSearch] = useState("");
  const [foodItem, setfoodItem] = useState([]);
  const [foodCategory, setfoodCategory] = useState([]);
  const [animate, setAnimate] = useState(true); // State for animation
  const [visible, setVisible] = useState(false);

  const loadData = async () => {
    let response = await fetch(`${process.env.REACT_APP_API_URL}/foodData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setfoodItem(response[0]);
    setfoodCategory(response[1]);
  };

  useEffect(() => {
    loadData();

    // Event listener for tab visibility
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        setAnimate(true); // Trigger animation
        setTimeout(() => setAnimate(false), 1000); // Reset after animation duration
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div>
      {/* navbar */}
      <div>
        <Navbar />
      </div>
      {/* <Carousel /> */}
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{ objectFit: "contain !important" }}
      >
        <div
          className="carousel-inner slide"
          id="carousel"
          data-bs-ride="carousel"
          data-bs-interval="2000"
        >
          <div
            className={`carousel-caption ${animate ? "scale-in-text" : ""}`}
            value={
              (onchange = (e) => {
                setSearch(e.target.value);
              })
            }
            style={{ zIndex: "10" }}
          >
            <h3 style={{ color: "white", marginBottom: "20%" }}>
              Satisfy Your Cravings Anytime, Anywhere!
            </h3>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-success text-white bg-success"
                type="submit"
              >
                Search
              </button>
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="/assets/image4.png"
              className="d-block w-100"
              alt="..."
              style={{ filter: "brightness(30%" }}
            />
          </div>
          <div className="carousel-item active">
            <img
              src="/assets/image.png"
              className="d-block w-100"
              alt="..."
              style={{ filter: "brightness(30%" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="/assets/image2.png"
              className="d-block w-100"
              alt="..."
              style={{ filter: "brightness(30%" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="/assets/image3.png"
              className="d-block w-100"
              alt="..."
              style={{ filter: "brightness(30%" }}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      {/* Logic for display card */}
      <div className="m-2">
        {foodCategory.length > 0 ? (
          foodCategory.map((data) => {
            return (
              <div className=" mb-3">
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                <div
                  className="card-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "1rem",
                  }}
                >
                  {foodItem.length > 0 ? (
                    foodItem
                      .filter((item) => item.CategoryName === data.CategoryName)
                      .map((filterItem) => (
                        <Card
                          key={filterItem._id}
                          foodItem={filterItem}
                          options={filterItem.options[0]}
                          desc={filterItem.description}
                        />
                      ))
                  ) : (
                    <div>No item found....</div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div>No category found....</div>
        )}
      </div>
      <div>
        <Footer />
      </div>
      {
        localStorage.getItem("authToken")?(

      <div>
        <button
          type="button"
          class="btn btn-primary btn-lg feedback-btn"
          data-bs-target="#feedbackModal"
          onClick={setVisible}
        >
          Feedback
        </button>
        {visible ? (
          <Modal onClose={() => setVisible(false)}>
            <FeedbackForm />
          </Modal>
        ) : (
          ""
        )}
      </div>
        ):(
          ""
        )
      }
    </div>
  );
}
