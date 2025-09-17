import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, addToWishlist, removeFromWishlist } from "./Store";
import Swal from "sweetalert2";

function Mobiles() {
  const mobiles = useSelector((state) => state.products.mobiles);
  const wishlistItems = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

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
      dispatch(removeFromWishlist(item)); // ✅ Pass entire item
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

  return (
    <div className="container my-4">
      <h1 className="text-primary text-center mb-4">📱 Mobiles</h1>
      <div className="row">
        {mobiles.map((item) => (
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
                    🛒 Cart
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
        ))}
      </div>

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
