import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, addToWishlist, removeFromWishlist } from "./Store";
import Swal from "sweetalert2";

function Slippers() {
  const slipperItems = useSelector((state) => state.products.slippers);
  const dispatch = useDispatch();
  const [wishlistItems, setWishlistItems] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter state with categories
  const [priceFilter, setPriceFilter] = useState("ALL");

  // Apply filter
  const filteredItems = slipperItems.filter((item) => {
    if (priceFilter === "UNDER500") return item.price <= 500;
    if (priceFilter === "500TO1000") return item.price > 500 && item.price <= 1000;
    if (priceFilter === "ABOVE1000") return item.price > 1000;
    return true; // ALL
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

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
    <div className="container my-4">
      <h1 className="text-primary text-center mb-4"> Slippers </h1>

      {/* Price Filter Buttons */}
      <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
        {[
          { label: "All", value: "ALL" },
          { label: "Under ₹500", value: "UNDER500" },
          { label: "₹500 - ₹1000", value: "500TO1000" },
          { label: "Above ₹1000", value: "ABOVE1000" },
        ].map((filter) => (
          <button
            key={filter.value}
            className={`btn ${
              priceFilter === filter.value ? "btn-primary" : "btn-outline-primary"
            }`}
            onClick={() => {
              setPriceFilter(filter.value);
              setCurrentPage(1); // Reset to first page
            }}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="row">
        {currentItems.length === 0 && (
          <p className="text-center">No slippers found for the selected price range.</p>
        )}
        {currentItems.map((item) => (
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

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="d-flex justify-content-center mt-4">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
                Previous
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index}
                className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
              >
                <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
              <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
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

export default Slippers;
