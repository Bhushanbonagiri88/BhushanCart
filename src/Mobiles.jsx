import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, addToWishlist, removeFromWishlist } from "./Store";
import Swal from "sweetalert2";

function Mobiles() {
  const mobiles = useSelector((state) => state.products.mobiles);
  const wishlistItems = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  // 💰 Price Filter
  const [priceFilter, setPriceFilter] = useState("ALL");

  // 📄 Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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
    if (wishlistItems.some((w) => w.id === item.id)) {
      dispatch(removeFromWishlist(item));
      Swal.fire({
        icon: "info",
        title: "Removed from Wishlist",
        text: `${item.name} removed from wishlist.`,
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      dispatch(addToWishlist(item));
      Swal.fire({
        icon: "success",
        title: "Added to Wishlist",
        text: `${item.name} added to wishlist ❤️`,
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  // ✅ Apply price filter
  const filteredMobiles = mobiles.filter((item) => {
    if (priceFilter === "UNDER15000") return item.price < 15000;
    if (priceFilter === "15000TO30000") return item.price >= 15000 && item.price <= 30000;
    if (priceFilter === "ABOVE30000") return item.price > 30000;
    return true; // ALL
  });

  // 📄 Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredMobiles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredMobiles.length / itemsPerPage);

  return (
    <div className="container my-4">
      <h1 className="text-primary text-center mb-4">Mobiles</h1>

      {/* 💰 Price Filter Buttons */}
      <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
        {[
          { label: "All", value: "ALL" },
          { label: "Under ₹15,000", value: "UNDER15000" },
          { label: "₹15,000 - ₹30,000", value: "15000TO30000" },
          { label: "Above ₹30,000", value: "ABOVE30000" },
        ].map((filter) => (
          <button
            key={filter.value}
            className={`btn ${
              priceFilter === filter.value ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => {
              setPriceFilter(filter.value);
              setCurrentPage(1); // reset to page 1 when filter changes
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="row">
        {currentItems.length > 0 ? (
          currentItems.map((item) => (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={item.id}>
              <div className="card h-100 shadow-sm hover-shadow">
                <img
                  src={item.image}
                  alt={item.name}
                  className="card-img-top"
                  style={{ height: "160px", objectFit: "cover" }}
                />
                <div className="card-body text-center d-flex flex-column justify-content-between">
                  <h5>{item.name}</h5>
                  <p className="text-muted">{item.description}</p>
                  <p className="fw-bold text-primary">₹{item.price}</p>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-success flex-fill"
                      onClick={() => handleAddToCart(item)}
                    >
                      🛒 Add To Cart
                    </button>
                    <button
                      className={`btn flex-fill ${
                        wishlistItems.some((w) => w.id === item.id)
                          ? "btn-danger"
                          : "btn-outline-danger"
                      }`}
                      onClick={() => handleWishlist(item)}
                    >
                      ❤️ Wishlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">No mobiles found for this range.</p>
        )}
      </div>

      {/* 📄 Pagination */}
      {totalPages > 1 && (
        <nav className="d-flex justify-content-center mt-4">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index}
                className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      )}

      <style>
        {`
          .hover-shadow:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.2);
          }
          .btn-success:hover {
            background-color: #28a745cc;
          }
          .btn-outline-danger:hover, .btn-danger:hover {
            background-color: #ff4d4dcc;
            color: white;
          }
        `}
      </style>
    </div>
  );
}

export default Mobiles;
