import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "./store";
import { addToWishlist, removeFromWishlist } from "./store"; 
import Swal from "sweetalert2";
import React, { useState } from "react";
import { configureStore, createSlice } from "@reduxjs/toolkit";

function Laptops() {
  const laptopProducts = useSelector((state) => state.products.laptops);
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleWishlist = (item) => {
    alert(`${item.name} added to Wishlist ❤️`);
  };

  return (
    <>
      <h1 className="text-primary text-center my-4">
        💻 Explore Our Laptop Collection 💻
      </h1>
      <div className="container-fluid px-3">
        <div className="row">
          {laptopProducts.map((item) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={item.id}>
              <div
                className="card h-100 shadow-sm border-0 hover-shadow"
                style={{ transition: "transform 0.3s" }}
              >
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.name}
                  style={{ height: "150px", objectFit: "cover" }}
                  onError={(e) => (e.target.src = "/images/placeholder.jpg")}
                />
                <div className="card-body d-flex flex-column justify-content-between text-center">
                  <div>
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                    <p className="card-text fw-bold">Price: ₹{item.price}</p>
                  </div>
                  <div className="d-flex gap-2 mt-2">
                    <button
                      className="btn btn-success flex-fill"
                      onClick={() => handleAddToCart(item)}
                    >
                      🛒 Add To Cart
                    </button>
                    <button
                      className="btn btn-outline-danger flex-fill"
                      onClick={() => handleWishlist(item)}
                    >
                      ❤️ Wishlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          .hover-shadow:hover {
            transform: translateY(-5px) scale(1.03);
            box-shadow: 0 8px 20px rgba(0,0,0,0.2);
          }
          .btn-success:hover {
            background-color: #28a745cc;
          }
          .btn-outline-danger:hover {
            background-color: #ff4d4dcc;
            color: white;
          }
        `}
      </style>
    </>
  );
}

export default Laptops;
