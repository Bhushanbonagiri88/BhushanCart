
// // import React, { useState, useEffect } from "react";
// // import {
// //   Routes,
// //   Route,
// //   Link,
// //   useNavigate,
// //   useLocation,
// // } from "react-router-dom";
// // import { useSelector, useDispatch } from "react-redux";
// // import { logoutUser } from "./Store";

// // // Pages and components
// // import "./App.css";
// // import SplashScreen from "./SplashScreen";
// // import Home from "./Home";
// // import Veg from "./Veg";
// // import Dairy from "./Dairy";
// // import Groceries from "./Groceries";
// // import Electronics from "./Electronics";
// // import Slippers from "./Slippers";
// // import Shoes from "./Shoes";
// // import Cart from "./Cart";
// // import Wishlist from "./Wishlist";
// // import OrdersHistory from "./OrdersHistory";
// // import About from "./About";
// // import Contactus from "./Contactus";
// // import NotFound from "./NotFound";
// // import Login from "./Login";
// // import Register from "./Register";
// // import SearchResults from "./SearchResults";
// // import BuyNow from "./BuyNow";

// // // Electronics sub-pages
// // import Mobiles from "./Mobiles";
// // import Laptops from "./Laptops";
// // import Cameras from "./Cameras";
// // import SmartHome from "./SmartHome";

// // // Clothing sub-pages
// // import Clothing from "./Clothing";
// // import MensClothing from "./MensClothing";
// // import WomensClothing from "./WomensClothing";
// // import KidsWare from "./KidsWare";


// // // Sports sub-pages
// // import Sports from "./Sports";
// // import FootBall from "./FootBall";
// // import Cricket from "./Cricket";
// // import Footwear from "./Footwear";
// // import Kitchen from "./Kitchen";



// // function App() {
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [isNavCollapsed, setIsNavCollapsed] = useState(true);
// //   const [showSplash, setShowSplash] = useState(false);

// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const dispatch = useDispatch();

// //   // ✅ Redux states
// //   const { isAuthenticated, currentUsername } = useSelector(
// //     (state) => state.registerUser
// //   );
// //   const cartItems = useSelector((state) => state.cart);
// //   const wishlistItems = useSelector((state) => state.wishlist);

// //   const totalCartItems = cartItems.reduce(
// //     (sum, item) => sum + item.quantity,
// //     0
// //   );
// //   const totalWishlistItems = wishlistItems.length;

// //   const navLinks = [
// //     { name: "Home", path: "/" },
// //     { name: "Electronics", path: "/electronics" },
// //     { name: "Clothing" , path: "/clothing" },
// //     { name: "Footware", path: "/footware" },
// //     { name: "Sports", path:"/sports"},
// //     { name: "Kitchen Products", path: "/kitchen" },
// //     { name: "Orders", path: "/orders" },
// //     { name: "About", path: "/about" },
// //     { name: "Contact", path: "/contact" },
// //   ];

// //   const handleLogout = () => {
// //     dispatch(logoutUser());
// //     navigate("/login");
// //   };

// //    useEffect(() => {
// //     const hasSeenSplash = localStorage.getItem("hasSeenSplash");
// //     if (!hasSeenSplash) setShowSplash(true);
// //   }, []);

// //   useEffect(() => {
// //     setIsNavCollapsed(true);
// //   }, [location.pathname]);

// //   if (showSplash) {
// //     return <SplashScreen onFinish={() => setShowSplash(false)} />;
// //   }
// //   return (
// //     <>
// //       {/* Header */}
// //       <header className="py-2 shadow-sm fixed-top bg-white">
// //         <div className="container d-flex align-items-center justify-content-between">
// //           <Link to="/" className="d-flex align-items-center text-decoration-none">
// //             <img src="/images/Untitled-1.png" height={50} alt="Logo" />
// //           </Link>

// //           <form
// //             className="d-flex mx-2 flex-grow-1"
// //             style={{ maxWidth: "500px" }}
// //             onSubmit={(e) => {
// //               e.preventDefault();
// //               if (searchQuery.trim() !== "") {
// //                 navigate(`/search?q=${searchQuery}`);
// //                 setSearchQuery("");
// //               }
// //             }}
// //           >
// //             <input
// //               type="search"
// //               className="form-control me-2"
// //               placeholder="Search products..."
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //             />
// //             <button className="btn btn-primary">Search</button>
// //           </form>

// //           <div className="d-flex align-items-center gap-2">
// //             <Link to="/wishlist" className="btn btn-outline-danger position-relative">
// //               ❤️
// //               {totalWishlistItems > 0 && (
// //                 <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
// //                   {totalWishlistItems}
// //                 </span>
// //               )}
// //             </Link>

// //             <Link to="/cart" className="btn btn-outline-primary position-relative">
// //               🛒
// //               {totalCartItems > 0 && (
// //                 <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
// //                   {totalCartItems}
// //                 </span>
// //               )}
// //             </Link>

// //             {isAuthenticated ? (
// //               <>
// //                 <span className="me-2 fw-semibold">Hello, {currentUsername}</span>
// //                 <button onClick={handleLogout} className="btn btn-outline-dark">
// //                   Logout
// //                 </button>
// //               </>
// //             ) : (
// //               <>
// //                 <Link to="/login" className="btn btn-outline-dark">
// //                   🔑
// //                 </Link>
// //                 <Link to="/register" className="btn btn-outline-dark">
// //                   👤
// //                 </Link>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       </header>

// //       {/* Navbar */}
// //       <nav
// //         className="navbar navbar-expand-lg navbar-dark fixed-top shadow-sm"
// //         style={{
// //           background: "linear-gradient(90deg, #6a11cb, #2575fc)",
// //           top: "65px",
// //         }}
// //       >
// //         <div className="container-fluid">
// //           <button
// //             className="navbar-toggler"
// //             type="button"
// //             onClick={() => setIsNavCollapsed(!isNavCollapsed)}
// //             aria-controls="navbarNav"
// //             aria-expanded={!isNavCollapsed}
// //             aria-label="Toggle navigation"
// //           >
// //             <span className="navbar-toggler-icon"></span>
// //           </button>

// //           <div
// //             className={`collapse navbar-collapse ${!isNavCollapsed ? "show" : ""}`}
// //             id="navbarNav"
// //           >
// //             <ul className="navbar-nav mx-auto text-center">
// //               {navLinks.map((link, i) => (
// //                 <li className="nav-item" key={i}>
// //                   <Link
// //                     className={`nav-link fw-semibold px-3 py-2 ${
// //                       location.pathname === link.path
// //                         ? "active-nav bg-light text-dark rounded"
// //                         : "text-white"
// //                     }`}
// //                     to={link.path}
// //                     onClick={() => setIsNavCollapsed(true)}
// //                   >
// //                     {link.name}
// //                   </Link>
// //                 </li>
// //               ))}
// //             </ul>
// //           </div>
// //         </div>
// //       </nav>

// //       {/* Main Content */}
// //       <div style={{ marginTop: "140px", padding: "1rem" }}>
// //         <Routes>
// //           <Route path="/" element={<Home />} />
// //           <Route path="/kitchen" element={<Kitchen/>}/>
// //           <Route path="/kitchen/veg" element={<Veg />} />
// //           <Route path="/kitchen/dairy" element={<Dairy />} />
// //           <Route path="/kitchen/groceries" element={<Groceries />} />
// //           <Route path="/electronics" element={<Electronics />} />
// //           <Route path="/clothing" element={<Clothing />} />
// //           <Route path="/clothing/mensclothing" element={<MensClothing />} />
// //           <Route path="/clothing/womensclothing" element={<WomensClothing />} />
// //           <Route path="/clothing/kidsware" element={<KidsWare />} />
// //           <Route path="/footware" element={<Footwear />} />
// //           <Route path="/footware/slippers" element={<Slippers />} />
// //           <Route path="/footware//shoes" element={<Shoes />} />
// //           <Route path="/cart" element={<Cart />} />
// //           <Route path="/wishlist" element={<Wishlist />} />
// //           <Route path="/orders" element={<OrdersHistory />} />
// //           <Route path="/about" element={<About />} />
// //           <Route path="/contact" element={<Contactus />} />
// //           <Route path="/login" element={<Login />} />
// //           <Route path="/register" element={<Register />} />
// //           <Route path="/search" element={<SearchResults />} />
// //           <Route path="/buynow" element={<BuyNow />} />
// //           <Route path="/electronics/mobiles" element={<Mobiles />} />
// //           <Route path="/electronics/laptops" element={<Laptops />} />
// //           <Route path="/electronics/cameras" element={<Cameras />} />
// //           <Route path="/electronics/smarthome" element={<SmartHome />} />
// //           <Route path="/sports" element={<Sports />} />
// //           <Route path="/sports/cricket" element={<Cricket />} />
// //           <Route path="/sports/football" element={<FootBall />} />
// //           <Route path="/splash" element={<SplashScreen />} />
// //           <Route path="/*" element={<NotFound />} />
// //         </Routes>
// //       </div>
// //     </>
// //   );
// // }

// // export default App;

// import React, { useState, useEffect } from "react";
// import {
//   Routes,
//   Route,
//   Link,
//   useNavigate,
//   useLocation,
// } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { logoutUser } from "./Store";

// // Import all pages and components
// import "./App.css";
// import SplashScreen from "./SplashScreen";
// import Home from "./Home";
// import Veg from "./Veg";
// import Dairy from "./Dairy";
// import Groceries from "./Groceries";
// import Electronics from "./Electronics";
// import Slippers from "./Slippers";
// import Shoes from "./Shoes";
// import Cart from "./Cart";
// import Wishlist from "./Wishlist";
// import OrdersHistory from "./OrdersHistory";
// import About from "./About";
// import Contactus from "./Contactus";
// import NotFound from "./NotFound";
// import Login from "./Login";
// import Register from "./Register";
// import SearchResults from "./SearchResults";
// import BuyNow from "./BuyNow";

// // Electronics sub-pages
// import Mobiles from "./Mobiles";
// import Laptops from "./Laptops";
// import Cameras from "./Cameras";
// import SmartHome from "./SmartHome";

// // Clothing sub-pages
// import Clothing from "./Clothing";
// import MensClothing from "./MensClothing";
// import WomensClothing from "./WomensClothing";
// import KidsWare from "./KidsWare";

// // Sports sub-pages
// import Sports from "./Sports";
// import FootBall from "./FootBall";
// import Cricket from "./Cricket";
// import Footwear from "./Footwear";
// import Kitchen from "./Kitchen";
// import { tr } from "framer-motion/client";
// import LocationFinder from "./LocationFinder";
// import VoiceAssistant from "./VoiceAssistant";

// function App() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isNavCollapsed, setIsNavCollapsed] = useState(true);
//   const [showSplash, setShowSplash] = useState(true);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const dispatch = useDispatch();

//   // Redux state
//   const { isAuthenticated, currentUsername } = useSelector(
//     (state) => state.registerUser
//   );
//   const cartItems = useSelector((state) => state.cart);
//   const wishlistItems = useSelector((state) => state.wishlist);

//   const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
//   const totalWishlistItems = wishlistItems.length;

//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "Electronics", path: "/electronics" },
//     { name: "Clothing", path: "/clothing" },
//     { name: "Footware", path: "/footware" },
//     { name: "Sports", path: "/sports" },
//     { name: "Kitchen Products", path: "/kitchen" },
//     { name: "Orders", path: "/orders" },
//     { name: "About", path: "/about" },
//     { name: "Contact", path: "/contact" },
//   ];

//   const handleLogout = () => {
//     dispatch(logoutUser());
//     navigate("/login");
//   };

//   // Show splash screen only once
//   useEffect(() => {
//     // Check if splash has been shown in this session
//     const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");

//     // Detect page reload
//     const isReload =
//       performance.getEntriesByType("navigation")[0]?.type === "reload";

//     // Show splash only if not seen before and not a reload
//     if (!hasSeenSplash && !isReload) {
//       setShowSplash(true);
//       const timer = setTimeout(() => {
//         setShowSplash(false);
//         sessionStorage.setItem("hasSeenSplash", "true");
//       }, 3000);

//       return () => clearTimeout(timer);
//     }
//   }, []);

//   if (showSplash) {
//     return <SplashScreen onFinish={() => setShowSplash(false)} />;
//   }
//   return (
//     <>
//       {/* Header */}
//       <header className="py-2 shadow-sm fixed-top bg-white">
//         <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">
//           {/* Logo */}
//           <Link
//             to="/"
//             className="d-flex align-items-center text-decoration-none mb-2 mb-md-0"
//           >
//             <img src="/images/Untitled-1.png" height={50} alt="Logo" />
//           </Link>

//          <small className="text-muted mt-1">
//          <LocationFinder />
//   </small>

//           {/* Search Bar */}
//           <form
//             className="d-flex w-100 w-md-auto flex-grow-1 mb-2 mb-md-0"
//             style={{ maxWidth: "500px" }}
//             onSubmit={(e) => {
//               e.preventDefault();
//               if (searchQuery.trim() !== "") {
//                 navigate(`/search?q=${searchQuery}`);
//                 setSearchQuery("");
//               }
//             }}
//           >
//             <input
//               type="search"
//               className="form-control me-2"
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//             <button className="btn btn-primary">Search</button>
//           </form>
//           <VoiceAssistant products={products} />

//           {/* Icons & Auth */}
//           <div className="d-flex align-items-center gap-2 flex-wrap justify-content-center">
//             {/* Wishlist */}
//             <Link
//               to="/wishlist"
//               className="btn btn-outline-danger position-relative"
//             >
//               ❤️
//               {totalWishlistItems > 0 && (
//                 <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
//                   {totalWishlistItems}
//                 </span>
//               )}
//             </Link>

//             {/* Cart */}
//             <Link
//               to="/cart"
//               className="btn btn-outline-primary position-relative"
//             >
//               🛒
//               {totalCartItems > 0 && (
//                 <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
//                   {totalCartItems}
//                 </span>
//               )}
//             </Link>

//             {/* Auth */}
//             {isAuthenticated ? (
//               <div className="d-flex flex-row align-items-center gap-2">
//                 <span className="fw-semibold small">
//                   Hi, {currentUsername}
//                 </span>
//                 <button
//                   onClick={handleLogout}
//                   className="btn btn-sm btn-outline-dark"
//                 >
//                   Logout
//                 </button>
//               </div>

//             ) : (
//               <div className="d-flex gap-2">
//                 <Link to="/login" className="btn btn-sm btn-outline-dark">
//                   🔑
//                 </Link>
//                 <Link to="/register" className="btn btn-sm btn-outline-dark">
//                   👤
//                 </Link>
//               </div>
//             )}
//           </div>
//         </div>
//       </header>

//       {/* Navbar */}
//       <nav
//         className="navbar navbar-expand-lg navbar-dark fixed-top shadow-sm"
//         style={{
//           background: "linear-gradient(90deg, #6a11cb, #2575fc)",
//           top: "55px",
//         }}
//       >
//         <div className="container-fluid">
//           <button
//             className="navbar-toggler"
//             type="button"
//             onClick={() => setIsNavCollapsed(!isNavCollapsed)}
//             aria-controls="navbarNav"
//             aria-expanded={!isNavCollapsed}
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           <div
//             className={`collapse navbar-collapse ${
//               !isNavCollapsed ? "show" : ""
//             }`}
//             id="navbarNav"
//           >
//             <ul className="navbar-nav mx-auto text-center">
//               {navLinks.map((link, i) => (
//                 <li className="nav-item" key={i}>
//                   <Link
//                     className={`nav-link fw-semibold px-3 py-2 ${
//                       location.pathname === link.path
//                         ? "active-nav bg-light text-dark rounded"
//                         : "text-white"
//                     }`}
//                     to={link.path}
//                     onClick={() => setIsNavCollapsed(true)}
//                   >
//                     {link.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* Main Content */}
//       <div style={{ marginTop: "140px", padding: "1rem" }}>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/kitchen" element={<Kitchen />} />
//           <Route path="/kitchen/veg" element={<Veg />} />
//           <Route path="/kitchen/dairy" element={<Dairy />} />
//           <Route path="/kitchen/groceries" element={<Groceries />} />
//           <Route path="/electronics" element={<Electronics />} />
//           <Route path="/clothing" element={<Clothing />} />
//           <Route path="/clothing/mensclothing" element={<MensClothing />} />
//           <Route path="/clothing/womensclothing" element={<WomensClothing />} />
//           <Route path="/clothing/kidsware" element={<KidsWare />} />
//           <Route path="/footware" element={<Footwear />} />
//           <Route path="/footware/slippers" element={<Slippers />} />
//           <Route path="/footware/shoes" element={<Shoes />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/wishlist" element={<Wishlist />} />
//           <Route path="/orders" element={<OrdersHistory />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contactus />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/search" element={<SearchResults />} />
//           <Route path="/buynow" element={<BuyNow />} />
//           <Route path="/electronics/mobiles" element={<Mobiles />} />
//           <Route path="/electronics/laptops" element={<Laptops />} />
//           <Route path="/electronics/cameras" element={<Cameras />} />
//           <Route path="/electronics/smarthome" element={<SmartHome />} />
//           <Route path="/sports" element={<Sports />} />
//           <Route path="/sports/cricket" element={<Cricket />} />
//           <Route path="/sports/football" element={<FootBall />} />
//           <Route path ="/location" element={<LocationFinder />} />
//           <Route path="/*" element={<NotFound />} />
//         </Routes>
//       </div>
//     </>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "./Store";

// Import all pages and components
import "./App.css";
import SplashScreen from "./SplashScreen";
import Home from "./Home";
import Veg from "./Veg";
import Dairy from "./Dairy";
import Groceries from "./Groceries";
import Electronics from "./Electronics";
import Slippers from "./Slippers";
import Shoes from "./Shoes";
import Cart from "./Cart";
import Wishlist from "./Wishlist";
import OrdersHistory from "./OrdersHistory";
import About from "./About";
import Contactus from "./Contactus";
import NotFound from "./NotFound";
import Login from "./Login";
import Register from "./Register";
import SearchResults from "./SearchResults";
import BuyNow from "./BuyNow";

// Electronics sub-pages
import Mobiles from "./Mobiles";
import Laptops from "./Laptops";
import Cameras from "./Cameras";
import SmartHome from "./SmartHome";

// Clothing sub-pages
import Clothing from "./Clothing";
import MensClothing from "./MensClothing";
import WomensClothing from "./WomensClothing";
import KidsWare from "./KidsWare";

// Sports sub-pages
import Sports from "./Sports";
import FootBall from "./FootBall";
import Cricket from "./Cricket";
import Footwear from "./Footwear";
import Kitchen from "./Kitchen";
import LocationFinder from "./LocationFinder";
import VoiceAssistant from "./VoiceAssistant";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  // Redux state
  const { isAuthenticated, currentUsername } = useSelector(
    (state) => state.registerUser
  );
  const cartItems = useSelector((state) => state.cart);
  const wishlistItems = useSelector((state) => state.wishlist);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const triggerToast = (msg) => {
  setToastMessage(msg);
  setShowToast(true);
  setTimeout(() => setShowToast(false), 2500);
};

  // get products from redux and flatten
const productsState = useSelector((s) => s.products);
const products = productsState ? Object.values(productsState).flat() : [];

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalWishlistItems = wishlistItems.length;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Electronics", path: "/electronics" },
    { name: "Clothing", path: "/clothing" },
    { name: "Footware", path: "/footware" },
    { name: "Sports", path: "/sports" },
    { name: "Kitchen Products", path: "/kitchen" },
    { name: "Orders", path: "/orders" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  // Show splash screen only once
  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    const isReload =
      performance.getEntriesByType("navigation")[0]?.type === "reload";

    if (!hasSeenSplash && !isReload) {
      setShowSplash(true);
      const timer = setTimeout(() => {
        setShowSplash(false);
        sessionStorage.setItem("hasSeenSplash", "true");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }



  return (
    <>
  <header className="py-2 shadow-sm fixed-top bg-white">
      <div className="container">
        <div className="d-flex flex-column flex-md-row align-items-center justify-content-between gap-2">

          {/* Logo */}
          <Link
            to="/"
            className="d-flex align-items-center text-decoration-none mb-2 mb-md-0"
          >
            <img src="/images/Untitled-1.png" height={50} alt="Logo" />
          </Link>

          {/* Location */}
          <small className="text-muted mb-2 mb-md-0 text-center text-md-start">
            <LocationFinder />
          </small>

          {/* Search Bar with Mic */}
          <form
            className="d-flex w-100 w-md-auto flex-grow-1 mb-2 mb-md-0"
            style={{ maxWidth: "500px" }}
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim() !== "") {
                navigate(`/search?q=${searchQuery}`);
                setSearchQuery("");
              }
            }}
          >
            <div className="input-group">
              <input
                type="search"
                className="form-control"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <VoiceAssistant
                  products={products}
                  triggerToast={triggerToast}
                  continuous={false}
                />
              </button>
            </div>
          </form>

          {/* Toast Notification */}
          {showToast && (
            <div
              className="toast show position-fixed top-0 end-0 m-3"
              style={{ zIndex: 2000 }}
            >
              <div className="toast-body fw-bold">{toastMessage}</div>
            </div>
          )}

          {/* Icons & Auth Section */}
          <div className="d-flex align-items-center gap-2 flex-wrap justify-content-center">

            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="btn btn-outline-danger position-relative"
            >
              ❤️
              {totalWishlistItems > 0 && (
                <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
                  {totalWishlistItems}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="btn btn-outline-primary position-relative"
            >
              🛒
              {totalCartItems > 0 && (
                <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
                  {totalCartItems}
                </span>
              )}
            </Link>

            {/* Auth Section */}
            {isAuthenticated ? (
              <div className="d-flex flex-row align-items-center gap-2">
                <span className="fw-semibold small">Hi, {currentUsername}</span>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-outline-dark"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Link to="/login" className="btn btn-sm btn-outline-dark">
                  🔑
                </Link>
                <Link to="/register" className="btn btn-sm btn-outline-dark">
                  👤
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>


      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark fixed-top shadow-sm"
        style={{
          background: "linear-gradient(90deg, #6a11cb, #2575fc)",
          top: "60px",
        }}
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsNavCollapsed(!isNavCollapsed)}
            aria-controls="navbarNav"
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${
              !isNavCollapsed ? "show" : ""
            }`}
            id="navbarNav"
          >
            <ul className="navbar-nav mx-auto text-center">
              {navLinks.map((link, i) => (
                <li className="nav-item" key={i}>
                  <Link
                    className={`nav-link fw-semibold px-3 py-2 ${
                      location.pathname === link.path
                        ? "active-nav bg-light text-dark rounded"
                        : "text-white"
                    }`}
                    to={link.path}
                    onClick={() => setIsNavCollapsed(true)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ marginTop: "140px", padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/kitchen" element={<Kitchen />} />
          <Route path="/kitchen/veg" element={<Veg />} />
          <Route path="/kitchen/dairy" element={<Dairy />} />
          <Route path="/kitchen/groceries" element={<Groceries />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/clothing" element={<Clothing />} />
          <Route path="/clothing/mensclothing" element={<MensClothing />} />
          <Route path="/clothing/womensclothing" element={<WomensClothing />} />
          <Route path="/clothing/kidsware" element={<KidsWare />} />
          <Route path="/footware" element={<Footwear />} />
          <Route path="/footware/slippers" element={<Slippers />} />
          <Route path="/footware/shoes" element={<Shoes />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/orders" element={<OrdersHistory />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contactus />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/buynow" element={<BuyNow />} />
          <Route path="/electronics/mobiles" element={<Mobiles />} />
          <Route path="/electronics/laptops" element={<Laptops />} />
          <Route path="/electronics/cameras" element={<Cameras />} />
          <Route path="/electronics/smarthome" element={<SmartHome />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/sports/cricket" element={<Cricket />} />
          <Route path="/sports/football" element={<FootBall />} />
          <Route path="/location" element={<LocationFinder />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
