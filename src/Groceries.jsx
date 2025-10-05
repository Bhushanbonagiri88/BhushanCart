import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, addToWishlist, removeFromWishlist } from "./Store";
import Swal from "sweetalert2";

function Groceries() {
  const groceryItems = useSelector((state) => state.products.groceries);
  const wishlistItems = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // ✅ Filter state
  const [priceFilter, setPriceFilter] = useState("all");

  // ✅ Apply filter
  const filteredItems = groceryItems.filter((item) => {
    if (priceFilter === "low") return item.price < 100;
    if (priceFilter === "mid") return item.price >= 100 && item.price <= 300;
    if (priceFilter === "high") return item.price > 300;
    return true;
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // ✅ Add to Cart
  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    Swal.fire({
      icon: "success",
      title: "Added to Cart 🛒",
      text: `${item.name} has been added to your cart.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  // ✅ Wishlist handler (category-specific)
  const handleWishlist = (item) => {
    const existing = wishlistItems.find(
      (w) => w.id === item.id && w.category === "groceries"
    );

    if (existing) {
      dispatch(removeFromWishlist({ ...item, category: "groceries" }));
      Swal.fire({
        icon: "error",
        title: "Removed ❌",
        text: `${item.name} removed from wishlist.`,
        showConfirmButton: false,
        timer: 1200,
      });
    } else {
      dispatch(addToWishlist({ ...item, category: "groceries" }));
      Swal.fire({
        icon: "info",
        title: "Wishlist ❤️",
        text: `${item.name} added to wishlist.`,
        showConfirmButton: false,
        timer: 1200,
      });
    }
  };

  return (
    <>
      <h1 className="text-primary text-center my-4"> Groceries </h1>

      {/* ✅ Price Filter Buttons */}
      <div className="container mb-4">
        <div className="d-flex flex-wrap justify-content-center gap-2">
          {["all", "low", "mid", "high"].map((filter) => (
            <button
              key={filter}
              className={`btn ${
                priceFilter === filter ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => {
                setPriceFilter(filter);
                setCurrentPage(1);
              }}
            >
              {filter === "all"
                ? "All"
                : filter === "low"
                ? "Below ₹100"
                : filter === "mid"
                ? "₹100 – ₹300"
                : "Above ₹300"}
            </button>
          ))}
        </div>
      </div>

      {/* ✅ Product Cards */}
      <div className="container-fluid">
        <div className="row">
          {currentItems.map((item) => {
            const inWishlist = wishlistItems.find(
              (w) => w.id === item.id && w.category === "groceries"
            );
            return (
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
                        className={`btn flex-fill ${
                          inWishlist ? "btn-danger" : "btn-outline-danger"
                        }`}
                        onClick={() => handleWishlist(item)}
                      >
                        {inWishlist ? "❌ Remove" : "❤️ Wishlist"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ✅ Pagination */}
        <div className="d-flex justify-content-center my-3">
          <button
            className="btn btn-outline-primary mx-1"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            ⬅ Prev
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`btn mx-1 ${
                currentPage === index + 1
                  ? "btn-primary"
                  : "btn-outline-primary"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            className="btn btn-outline-primary mx-1"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next ➡
          </button>
        </div>
      </div>

      {/* ✅ Styling */}
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
          .btn-danger:hover {
            background-color: #dc3545cc;
            color: white;
          }
        `}
      </style>
    </>
  );
}

export default Groceries;
