import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, addToWishlist, removeFromWishlist } from "./Store";
import Swal from "sweetalert2";
import "./Cricket.css";
import { configureStore, createSlice } from "@reduxjs/toolkit";

function Cricket() {
  const cricketItems = useSelector((state) => state.products.cricket);
  const dispatch = useDispatch();
  const [wishlistItems, setWishlistItems] = useState([]);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    Swal.fire({
      icon: "success",
      title: "Added to Cart",
      text: `${item.name} has been added to your cart.`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleWishlist = (item) => {
    if (wishlistItems.includes(item.id)) {
      dispatch(removeFromWishlist(item));
      setWishlistItems(wishlistItems.filter((id) => id !== item.id));
      Swal.fire({
        icon: "info",
        title: "Removed from Wishlist",
        text: `${item.name} removed from your wishlist.`,
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      dispatch(addToWishlist(item));
      setWishlistItems([...wishlistItems, item.id]);
      Swal.fire({
        icon: "success",
        title: "Added to Wishlist",
        text: `${item.name} added to your wishlist ❤️`,
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  return (
    <>
      <h1 className="text-primary text-center my-4">🏏 Cricket Equipment 🏏</h1>
      <div className="container-fluid">
        <div className="row">
          {cricketItems.map((item) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={item.id}>
              <div className="card h-100 shadow-sm border-0 hover-shadow" style={{ transition: "transform 0.3s" }}>
                <img
                  src={item.image}
                  className="card-img-top"
                  alt={item.name}
                  style={{ height: "150px", objectFit: "cover" }}
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
                      className={`btn flex-fill ${
                        wishlistItems.includes(item.id) ? "btn-danger" : "btn-outline-danger"
                      }`}
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

      
    </>
  );
}

export default Cricket;
