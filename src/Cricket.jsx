import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, addToWishlist, removeFromWishlist } from "./Store";
import Swal from "sweetalert2";
import "./Cricket.css";

function Cricket() {
  const cricketItems = useSelector((state) => state.products.cricket);
  const wishlistItems = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  // ✅ Price filter state
  const [filter, setFilter] = useState("all"); // all | low | mid | high

  // ✅ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // ✅ Apply filter by price
  const filteredItems = cricketItems.filter((item) => {
    if (filter === "low") return item.price < 500;
    if (filter === "mid") return item.price >= 500 && item.price <= 1000;
    if (filter === "high") return item.price > 1000;
    return true; // "all"
  });

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    Swal.fire({
      icon: "success",
      title: "Added to Cart 🛒",
      text: `${item.name} has been added to your cart.`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleWishlist = (item) => {
    const exists = wishlistItems.find((w) => w.id === item.id);
    if (exists) {
      dispatch(removeFromWishlist(item));
      Swal.fire({
        icon: "error",
        title: "Removed ❌",
        text: `${item.name} removed from wishlist.`,
        timer: 1200,
        showConfirmButton: false,
      });
    } else {
      dispatch(addToWishlist(item));
      Swal.fire({
        icon: "info",
        title: "Wishlist ❤️",
        text: `${item.name} added to wishlist.`,
        timer: 1200,
        showConfirmButton: false,
      });
    }
  };

  return (
    <>
      <h1 className="text-primary text-center my-4"> Cricket Equipment </h1>

      {/* ✅ Filter Buttons */}
      <div className="d-flex flex-wrap justify-content-center gap-2 mb-4">
        <button
          className={`btn ${filter === "all" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => { setFilter("all"); setCurrentPage(1); }}
        >
          All
        </button>
        <button
          className={`btn ${filter === "low" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => { setFilter("low"); setCurrentPage(1); }}
        >
          Under ₹500
        </button>
        <button
          className={`btn ${filter === "mid" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => { setFilter("mid"); setCurrentPage(1); }}
        >
          ₹500 - ₹1000
        </button>
        <button
          className={`btn ${filter === "high" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => { setFilter("high"); setCurrentPage(1); }}
        >
          Above ₹1000
        </button>
      </div>

      <div className="container-fluid">
        <div className="row">
          {currentItems.length > 0 ? (
            currentItems.map((item) => {
              const inWishlist = wishlistItems.find((w) => w.id === item.id);
              return (
                <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={item.id}>
                  <div className="card h-100 shadow-sm border-0 hover-shadow">
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
            })
          ) : (
            <p className="text-center">⚠️ No items found in this price range.</p>
          )}
        </div>

        {/* ✅ Pagination */}
        {totalPages > 1 && (
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
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next ➡
            </button>
          </div>
        )}
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
          .btn-danger:hover {
            background-color: #dc3545cc;
            color: white;
          }
        `}
      </style>
    </>
  );
}

export default Cricket;
