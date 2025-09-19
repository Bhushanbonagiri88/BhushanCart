import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, addToWishlist, removeFromWishlist } from "./Store";
import Swal from "sweetalert2";

function Laptops() {
  const laptopItems = useSelector((state) => state.products.laptops);
  const dispatch = useDispatch();
  const [wishlistItems, setWishlistItems] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Price filter state
  const [priceFilter, setPriceFilter] = useState("ALL");

  // Apply filter
  const filteredItems = laptopItems.filter((item) => {
    if (priceFilter === "UNDER30000") return item.price <= 30000;
    if (priceFilter === "30000TO60000") return item.price > 30000 && item.price <= 60000;
    if (priceFilter === "ABOVE60000") return item.price > 60000;
    return true; // ALL
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  // Add to cart
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

  // Wishlist
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
      <h1 className="text-primary text-center mb-4">Laptops</h1>

      {/* Price Filter */}
      <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
        {[
          { label: "All", value: "ALL" },
          { label: "Under ₹30,000", value: "UNDER30000" },
          { label: "₹30,000 - ₹60,000", value: "30000TO60000" },
          { label: "Above ₹60,000", value: "ABOVE60000" },
        ].map((filter) => (
          <button
            key={filter.value}
            className={`btn ${
              priceFilter === filter.value ? "btn-primary" : "btn-outline-primary"
            }`}
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
          <p className="text-center">No laptops found for the selected price range.</p>
        )}
        {currentItems.map((item) => (
          <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={item.id}>
            <div className="card h-100 shadow-sm border-0 hover-shadow">
               <img
                    src={item.image}
                    alt={item.name}
                    className="card-img-top product-img"
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
            .product-img {
              height: 220px;       /* consistent height */
              width: 100%;         /* full width */
              object-fit: contain; /* show the full image without cutting */
              padding: 10px;       /* little spacing inside */
              background-color: #f9f9f9; /* optional: light bg for contrast */
              border-radius: 8px;  /* rounded look */
            }

        `}
      </style>
    </div>
  );
}

export default Laptops;
