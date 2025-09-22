// import React, { use } from "react";
// import { useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";

// function SearchResults() {
//   const location = useLocation();
//   const queryParam = new URLSearchParams(location.search).get("q");
//   const query = queryParam ? queryParam.toLowerCase() : "";

//   // ✅ Get products from Redux (make sure key matches your store)
//   const veg = useSelector((state) => state.products?.veg || []);
//   const dairy = useSelector((state) => state.products?.dairy || []);
//   const electronics = useSelector((state) => state.products?.electronics || []);
//   const mens = useSelector((state) => state.products?.mensclothing || []);
//   const womens = useSelector((state) => state.products?.womensclothing || []);
//   const kids = useSelector((state) => state.products?.kidsware || []);
//   const shoes = useSelector((state) => state.products?.shoes || []);
//   const slippers = useSelector((state) => state.products?.slippers || []);
//   const mob = useSelector((state) => state.products?.mobiles || []);
//   const lap = useSelector((state) => state.products?.laptops || []);
//   const cam = useSelector((state) => state.products?.cameras || []);
//   const samrt = useSelector((state) => state.products?.smartHome || []);
//   const cric = useSelector ((state) => state.products?.cricket || []);
//   const foot = useSelector ((state) => state.products?.football || []);
//   const gro = useSelector ((state) => state.products?.grocery || []);


//   // ✅ Combine all products
//   const allProducts = [
//   ...veg.map(p => ({ ...p, category: "veg" })),
//   ...dairy.map(p => ({ ...p, category: "dairy" })),
//   ...electronics.map(p => ({ ...p, category: "electronics" })),
//   ...mens.map(p => ({ ...p, category: "mens clothing" })),
//   ...womens.map(p => ({ ...p, category: "womens clothing" })),
//   ...kids.map(p => ({ ...p, category: "kidsware" })),
//   ...shoes.map(p => ({ ...p, category: "shoes" })),
//   ...slippers.map(p => ({ ...p, category: "slippers" })),
//   ...mob.map(p => ({ ...p, category: "mobiles" })),
//   ...lap.map(p => ({ ...p, category: "laptops" })),
//   ...cam.map(p => ({ ...p, category: "cameras" })),
//   ...samrt.map(p => ({ ...p, category: "smart home" })),
//   ...cric.map(p => ({ ...p, category: "cricket" })),
//   ...foot.map(p => ({ ...p, category: "football" })),
//   ...gro.map(p => ({ ...p, category: "grocery" })),
// ];


//   // ✅ Filter
//   const results = query
//   ? allProducts.filter(
//       (p) =>
//         p.name.toLowerCase().includes(query) ||
//         p.category.toLowerCase().includes(query)
//     )
//   : [];
//   return (
//     <div className="container my-4">
//       <h2 className="text-center text-primary fw-bold">
//         🔍 Search Results for "{query}"
//       </h2>
//       <div className="row mt-4">
//         {results.length > 0 ? (
//           results.map((item, index) => (
//             <div className="col-md-3 mb-4" key={index}>
//               <div className="card shadow-sm h-100">
//                 <img
//                   src={item.image}
//                   className="card-img-top"
//                   alt={item.name}
//                   style={{ height: "200px", objectFit: "contain" }}
//                 />
//                 <div className="card-body text-center">
//                   <h5 className="card-title">{item.name}</h5>
//                   <p className="card-text text-success fw-bold">
//                     ₹{item.price}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <h4 className="text-danger text-center mt-4">
//             ❌ No products found
//           </h4>
//         )}
//       </div>
//     </div>
//   );
// }

// export default SearchResults;
import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  addToWishlist,
  removeFromWishlist,
} from "./Store";
import Swal from "sweetalert2";

function SearchResults() {
  const location = useLocation();
  const queryParam = new URLSearchParams(location.search).get("q");
  const query = queryParam ? queryParam.toLowerCase() : "";

  const dispatch = useDispatch();

  // ✅ Get wishlist from Redux
  const wishlistItems = useSelector((state) => state.wishlist);

  // ✅ Get products from Redux (make sure key matches your store)
  const veg = useSelector((state) => state.products?.veg || []);
  const dairy = useSelector((state) => state.products?.dairy || []);
  const electronics = useSelector((state) => state.products?.electronics || []);
  const mens = useSelector((state) => state.products?.mensclothing || []);
  const womens = useSelector((state) => state.products?.womensclothing || []);
  const kids = useSelector((state) => state.products?.kidsware || []);
  const shoes = useSelector((state) => state.products?.shoes || []);
  const slippers = useSelector((state) => state.products?.slippers || []);
  const mob = useSelector((state) => state.products?.mobiles || []);
  const lap = useSelector((state) => state.products?.laptops || []);
  const cam = useSelector((state) => state.products?.cameras || []);
  const samrt = useSelector((state) => state.products?.smartHome || []);
  const cric = useSelector((state) => state.products?.cricket || []);
  const foot = useSelector((state) => state.products?.football || []);
  const gro = useSelector((state) => state.products?.grocery || []);

  // ✅ Combine all products
  const allProducts = [
    ...veg.map((p) => ({ ...p, category: "veg" })),
    ...dairy.map((p) => ({ ...p, category: "dairy" })),
    ...electronics.map((p) => ({ ...p, category: "electronics" })),
    ...mens.map((p) => ({ ...p, category: "mens clothing" })),
    ...womens.map((p) => ({ ...p, category: "womens clothing" })),
    ...kids.map((p) => ({ ...p, category: "kidsware" })),
    ...shoes.map((p) => ({ ...p, category: "shoes" })),
    ...slippers.map((p) => ({ ...p, category: "slippers" })),
    ...mob.map((p) => ({ ...p, category: "mobiles" })),
    ...lap.map((p) => ({ ...p, category: "laptops" })),
    ...cam.map((p) => ({ ...p, category: "cameras" })),
    ...samrt.map((p) => ({ ...p, category: "smart home" })),
    ...cric.map((p) => ({ ...p, category: "cricket" })),
    ...foot.map((p) => ({ ...p, category: "football" })),
    ...gro.map((p) => ({ ...p, category: "grocery" })),
  ];

  // ✅ Filter
  const results = query
    ? allProducts.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      )
    : [];

  // ✅ Format price as INR
  const formatPrice = (price) =>
    price.toLocaleString("en-IN", { style: "currency", currency: "INR" });

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

  // ✅ Add/Remove Wishlist
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
        text: `${item.name} has been added to wishlist.`,
        timer: 1200,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="container my-4">
      <h2 className="text-center text-primary fw-bold">
        🔍 Search Results for "{query}"
      </h2>
      <div className="row mt-4">
        {results.length > 0 ? (
          results.map((item, index) => {
            const inWishlist = wishlistItems.find((w) => w.id === item.id);
            return (
              <div className="col-md-3 mb-4" key={index}>
                <div className="card shadow-sm h-100">
                  <img
                    src={item.image}
                    className="card-img-top"
                    alt={item.name}
                    style={{ height: "200px", objectFit: "contain" }}
                    onError={(e) => (e.target.src = "/images/placeholder.jpg")}
                  />
                  <div className="card-body d-flex flex-column justify-content-between text-center">
                    <div>
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text text-success fw-bold">
                        {formatPrice(item.price)}
                      </p>
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
          <h4 className="text-danger text-center mt-4">
            ❌ No products found
          </h4>
        )}
      </div>
    </div>
  );
}

export default SearchResults;
