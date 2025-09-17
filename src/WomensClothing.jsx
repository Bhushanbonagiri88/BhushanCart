import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, addToWishlist, removeFromWishlist } from "./Store";
import Swal from "sweetalert2";

function WomensClothing() {
  const womensItems = useSelector((state) => state.products.womensClothing);
  const wishlistItems = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const [priceFilter, setPriceFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter by price
  const filteredItems = womensItems.filter((item) => {
    if (priceFilter === "UNDER500") return item.price <= 500;
    if (priceFilter === "500TO1000") return item.price > 500 && item.price <= 1000;
    if (priceFilter === "ABOVE1000") return item.price > 1000;
    return true;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

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

  const handleWishlist = (item) => {
    const exists = wishlistItems.find((w) => w.id === item.id);
    if (exists) {
      dispatch(removeFromWishlist(item.id));
      Swal.fire({
        icon: "info",
        title: "Removed from Wishlist ❌",
        text: `${item.name} removed from your wishlist.`,
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      dispatch(addToWishlist(item));
      Swal.fire({
        icon: "success",
        title: "Added to Wishlist ❤️",
        text: `${item.name} has been added to your wishlist.`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="container my-4">
      <h1 className="text-primary text-center mb-4">👗 Women's Clothing 👗</h1>

      {/* Price Filter */}
      <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
        {[
          { label: "All", value: "ALL" },
          { label: "Under ₹500", value: "UNDER500" },
          { label: "₹500 - ₹1000", value: "500TO1000" },
          { label: "Above ₹1000", value: "ABOVE1000" },
        ].map((filter) => (
          <button
            key={filter.value}
            className={`btn ${priceFilter === filter.value ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => {
              setPriceFilter(filter.value);
              setCurrentPage(1);
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="row">
        {currentItems.length === 0 && (
          <p className="text-center">No products found for the selected price range.</p>
        )}
        {currentItems.map((item) => {
          const inWishlist = wishlistItems.find((w) => w.id === item.id);
          return (
            <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={item.id}>
              <div className="card h-100 shadow-sm border-0 hover-shadow" style={{ transition: "transform 0.3s" }}>
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
                    <button className="btn btn-success flex-fill" onClick={() => handleAddToCart(item)}>
                      🛒 Add To Cart
                    </button>
                    <button className={`btn flex-fill ${inWishlist ? "btn-danger" : "btn-outline-danger"}`} onClick={() => handleWishlist(item)}>
                      {inWishlist ? "❌ Remove" : "❤️ Wishlist"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="d-flex justify-content-center mt-4">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
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
          .btn-outline-primary:hover, .btn-primary:hover {
            background-color: #0d6efdcc;
            color: white;
          }
          .pagination .page-item .page-link {
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
}

export default WomensClothing;
