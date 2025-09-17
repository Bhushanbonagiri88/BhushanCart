import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, addToWishlist, removeFromWishlist } from "./Store";
import Swal from "sweetalert2";

function KidsWare() {
  const kidsItems = useSelector((state) => state.products.kidsWear);
  const wishlistItems = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(kidsItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = kidsItems.slice(indexOfFirstItem, indexOfLastItem);

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
      dispatch(removeFromWishlist(item));
      Swal.fire({
        icon: "error",
        title: "Removed ❌",
        text: `${item.name} removed from wishlist.`,
        showConfirmButton: false,
        timer: 1200,
      });
    } else {
      dispatch(addToWishlist(item));
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
      <h1 className="text-primary text-center my-4">🧸 Kids Wear 🧸</h1>
      <div className="container-fluid">
        <div className="row">
          {currentItems.map((item) => {
            const inWishlist = wishlistItems.find((w) => w.id === item.id);
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

        {/* Pagination */}
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

export default KidsWare;
