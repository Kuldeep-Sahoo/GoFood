import React, { useCallback, useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Card from "../screens/Card";
// import Carousel from "../components/Carousel";

export default function Home() {
  const [search, setSearch] = useState("")
  const [foodItem, setfoodItem] = useState([]);
  const [foodCategory, setfoodCategory] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json()
    console.log(response[0], response[1]);
    setfoodItem(response[0])
    setfoodCategory(response[1])
  };
  useEffect(() => {
    loadData();
  }, []); //[] means no dependency 

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
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" value={onchange = (e) => { setSearch(e.target.value) }} style={{ zIndex: "10" }}>
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
              src="https://media.istockphoto.com/id/517346167/photo/burgers-on-the-wooden-background.jpg?s=612x612&w=0&k=20&c=0Q90dQHg6FxL2xncT7ZEWW0DTzmfF71U3w5qeZxBIhY="
              className="d-block w-100"
              alt="..."
              style={{ filter: "brightness(30%" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://media.istockphoto.com/id/517346167/photo/burgers-on-the-wooden-background.jpg?s=612x612&w=0&k=20&c=0Q90dQHg6FxL2xncT7ZEWW0DTzmfF71U3w5qeZxBIhY="
              className="d-block w-100"
              alt="..."
              style={{ filter: "brightness(30%" }}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://media.istockphoto.com/id/1305146651/photo/buffet-table-with-mini-hamburgers-at-luxury-wedding-reception-copy-space-serving-food-and.jpg?s=612x612&w=0&k=20&c=VT6UB-i1RldlF99FEPRso8uViYhiZv9_fSgiU7fFgmE="
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
      <div className="m-2 container">
        {
          (foodCategory.length >0)
            ? foodCategory.map((data) => {
              return (
                <div className="row mb-3">
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {
                    (foodItem.length >0)
                      ?
                      foodItem.filter((item) => item.CategoryName === data.CategoryName).map(filterItem => {
                        return (
                          <div key={filterItem._id} className="col-12 col-md-6 col-lg-3">
                            <Card foodItem={filterItem}
                              options={filterItem.options[0] }
                              desc={filterItem.description}
                            ></Card>
                          </div>  
                        )
                      })
                      : <div>No item found....</div>
                  }
                </div>
              )
            })
            : <div>No category found....</div>
        }

      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
