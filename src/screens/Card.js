import React, { useState, useEffect, useRef } from "react";
import{Link} from "react-router-dom"
import { useDispatchCart, useCart } from "./ContextReducer";
// new
import Modal from "../Modal";

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  let options = props.options;
  let priceOptions = Object.keys(options);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const priceRef = useRef();

  // new
  const [cardView, setCardView] = useState(false);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }
    if (food != []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItem._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItem._id,
          name: props.foodItem.name,
          price: finalPrice,
          qty: qty,
          size: size,
        });
        console.log("Size different so simply ADD one more to the list");
        return;
      }
      return;
    }
    await dispatch({
      type: "ADD",
      id: props.foodItem._id,
      name: props.foodItem.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });
    console.log(data);
  };
  let finalPrice = qty * parseInt(options[size]);

  return (
    <div>
      <div className="card mt-2" style={{ width: "18rem", maxHeight: "360px" }}>
        <Link>
        <img
          // src="https://www.shutterstock.com/image-photo/close-tasty-burger-isolated-on-600nw-2494691375.jpg"
          src={props.foodItem.img}
          // src={imgSrc}
          className="card-img-top"
          alt="..."
          style={{ height: "200px", objectFit: "cover" }}
          // new
          onClick={() => setCardView(true)}
          cardDesc={props.desc}
        />
        </Link>
        {/* new */}
        {cardView ? (
          <Modal onClose={() => setCardView(false)}>
            <div style={{margin:"200px"}}>{props.desc}</div>
          </Modal>
        ) : (
          ""
        )}
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className="container w-100">
            <select
              className="m-2 h-100 bg-success rounded"
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(10), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                );
              })}
            </select>
            <select
              className="m-2 h-100 bg-success rounded "
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
            <div className="d-inline h-100 fs-5">Rs {finalPrice}/-</div>
          </div>
          <hr></hr>
          <button
            className="btn btn-success justify-content-center ms-2"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
