import { useSelector, useDispatch } from "react-redux";
import { removeFromWishlist, clearWishlist } from "./store";
import Swal from "sweetalert2";

function Wishlist() {
  const wishlistItems = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const handleRemove = (id, name) => {
    dispatch(removeFromWishlist(id));
    Swal.fire({
      icon: "info",
      title: "Removed from Wishlist",
      text: `${name} removed from wishlist.`,
      timer: 1500,
      showConfirmButton: false,
    });
  };

  const handleClear = () => {
    dispatch(clearWishlist());
    Swal.fire({
      icon: "warning",
      title: "Wishlist Cleared",
      text: "All items removed from wishlist.",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  return (
    <div className="container my-4">
      <h2 className="text-center text-danger fw-bold mb-4">
        ❤️ My Wishlist ({wishlistItems.length})
      </h2>

      {wishlistItems.length === 0 ? (
        <p className="text-center text-muted fs-5 mt-4">
          No items in wishlist yet. Browse products and click ❤️ to add them.
        </p>
      ) : (
        <>
          <div className="row g-4">
            {wishlistItems.map((item) => (
              <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item.id}>
                <div className="card h-100 shadow-sm hover-shadow">
                  <img
                    src={item.image}
                    className="card-img-top"
                    alt={item.name}
                    style={{
                      height: "180px",
                      objectFit: "cover",
                    }}
                  />
                  <div className="card-body d-flex flex-column text-center">
                    <h5 className="card-title fw-bold">{item.name}</h5>
                    <p className="card-text text-muted small">{item.description}</p>
                    <p className="fw-bold text-success fs-5">₹{item.price}</p>
                    <div className="mt-auto">
                      <button
                        className="btn btn-danger btn-sm w-100"
                        onClick={() => handleRemove(item.id, item.name)}
                      >
                        ❌ Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-4">
            <button className="btn btn-outline-danger" onClick={handleClear}>
              🗑️ Clear Wishlist
            </button>
          </div>
        </>
      )}

      <style>{`
        .hover-shadow {
          transition: all 0.3s ease;
        }
        .hover-shadow:hover {
          transform: translateY(-5px); 
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
}

export default Wishlist;
