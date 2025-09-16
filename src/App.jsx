import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useSelector } from "react-redux";
import SplashScreen from "./SplashScreen";

// Pages
import Home from "./Home";
import Veg from "./Veg";
import Dairy from "./Dairy";
import Groceries from "./Groceries";
import Electronics from "./Electronics";
import MensClothing from "./MensClothing";
import WomensClothing from "./WomensClothing";
import KidsWare from "./KidsWare";
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

import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  // Redux values
  const cartItems = useSelector((state) => state.cart);
  const wishlistItems = useSelector((state) => state.wishlist);

  const totalCartItems = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const totalWishlistItems = wishlistItems.length;

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Electronics", path: "/electronics" },
    { name: "Men's Clothing", path: "/mensclothing" },
    { name: "Women's Clothing", path: "/womensclothing" },
    { name: "Kids Wear", path: "/kidsware" },
    { name: "Slippers", path: "/slippers" },
    { name: "Shoes", path: "/shoes" },
    { name: "Vegetables", path: "/veg" },
    { name: "Dairy", path: "/dairy" },
    { name: "Other Groceries", path: "/groceries" },
    { name: "Orders", path: "/orders" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // Add a state to control navbar collapse on mobile
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  useEffect(() => {
    // Close the nav when route changes (helpful on mobile)
    setIsNavCollapsed(true);
  }, [location.pathname]);

  if (loading) {
    return <SplashScreen onFinish={() => setLoading(false)} />;
  }

  return (
    <>
      {/* 🔹 Header */}
      <header className="py-2 shadow-sm fixed-top bg-white">
        <div className="container d-flex align-items-center justify-content-between">
          <Link to="/" className="d-flex align-items-center text-decoration-none">
            <img src="/images/Untitled-1.png" height={50} alt="Logo" />
          </Link>

          <form
            className="d-flex mx-2 flex-grow-1"
            style={{ maxWidth: "500px" }}
            onSubmit={(e) => {
              e.preventDefault();
              if (searchQuery.trim() !== "") {
                navigate(`/search?q=${searchQuery}`);
                setSearchQuery("");
              }
            }}
          >
            <input
              type="search"
              className="form-control me-2"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="btn btn-primary">Search</button>
          </form>

          <div className="d-flex align-items-center gap-2">
            <Link to="/wishlist" className="btn btn-outline-danger position-relative">
              ❤️
              {totalWishlistItems > 0 && (
                <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
                  {totalWishlistItems}
                </span>
              )}
            </Link>

            <Link to="/cart" className="btn btn-outline-primary position-relative">
              🛒
              {totalCartItems > 0 && (
                <span className="badge bg-danger rounded-pill position-absolute top-0 start-100 translate-middle">
                  {totalCartItems}
                </span>
              )}
            </Link>

            <Link to="/login" className="btn btn-outline-dark">
              🔑
            </Link>
            <Link to="/register" className="btn btn-outline-dark">
              👤
            </Link>
          </div>
        </div>
      </header>

      {/* 🔹 Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark fixed-top shadow-sm"
        style={{
          background: "linear-gradient(90deg, #6a11cb, #2575fc)",
          top: "70px",
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
            className={`collapse navbar-collapse ${!isNavCollapsed ? "show" : ""}`}
            id="navbarNav"
          >
            <ul className="navbar-nav mx-auto text-center">
              {navLinks.map((link, i) => (
                <li className="nav-item" key={i}>
                  <Link
                    className={`nav-link fw-semibold px-3 py-2 ${
                      location.pathname === link.path ? "active-nav bg-light text-dark rounded" : "text-white"
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

      {/* 🔹 Main Content */}
      <div style={{ marginTop: "140px", padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/veg" element={<Veg />} />
          <Route path="/dairy" element={<Dairy />} />
          <Route path="/groceries" element={<Groceries />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/mensclothing" element={<MensClothing />} />
          <Route path="/womensclothing" element={<WomensClothing />} />
          <Route path="/kidsware" element={<KidsWare />} />
          <Route path="/slippers" element={<Slippers />} />
          <Route path="/shoes" element={<Shoes />} />
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
          <Route path="/splash" element={<SplashScreen />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
