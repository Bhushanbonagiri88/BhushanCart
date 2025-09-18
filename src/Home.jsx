import React from "react";
import { useDispatch } from "react-redux";
import { addToCart, addToWishlist } from "./Store";
import { useNavigate } from "react-router-dom"; // ✅ for Buy Now navigation
import "./Home.css"; // ✅ your CSS for banner & wishlist button

function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🌟 Banner Images
  const banners = [
    "/images/banner1.jpg.jpg",
    "/images/banner2.jpg.jpg",
    "/images/banner3.jpg.jpg",
    "/images/banner4.jpg.jpg",
    "/images/banner5.jpg.jpg",
    "/images/banner6.jpg.jpg",
  ];

  // 🛍️ Product Data
  const products = [
    {
      id: 1,
      name: "iPhone 14",
      price: 69999,
      description: "Apple iPhone 14 with A15 Bionic chip",
      image: "/images/iphone14.jpg",
    },
    {
      id: 2,
      name: "Samsung Galaxy S23",
      price: 74999,
      description: "Samsung flagship with AMOLED display",
      image: "/images/s23.jpg",
    },
    {
      id: 3,
      name: "Apple MacBook Air M1",
      price: 95000,
      description: "Lightweight laptop with M1 chip",
      image: "/images/macbook.jpg",
    },
    {
      id: 4,
      name: "Canon EOS 1500D",
      price: 35000,
      description: "DSLR camera with 24.1MP sensor",
      image: "/images/canon.jpg",
    },
    {
      id: 5,
      name: "Amazon Echo Dot (5th Gen)",
      price: 4499,
      description: "Smart speaker with Alexa",
      image: "/images/echo.jpg",
    },
    {
      id: 6,
      name: "Men's Running Shoes",
      price: 2999,
      description: "Comfortable sports running shoes",
      image: "/images/shoes.jpg",
    },
    {
      id: 7,
      name: "Casual T-Shirt",
      price: 799,
      description: "Cotton t-shirt for everyday wear",
      image: "/images/tshirt.jpg",
    },
    {
      id: 8,
      name: "Basmati Rice (5kg)",
      price: 650,
      description: "Premium quality basmati rice",
      image: "/images/rice.jpg",
    },
  ];

  return (
    <>
      {/* <div
        className="bhushan d-flex flex-column align-items-center"
        style={{
          minHeight: "calc(100vh - 140px)", // full viewport minus header+navbar
          marginTop: "140px", // push below fixed header
          backgroundColor: "#f8f9fa", // light background
          width: "100%", // full width
        }}
      > */}
                  <div
            id="bannerCarousel"
            className="carousel slide mb-4" data-bs-ride="carousel" data-bs-interval="2000">
            {/* Indicators */}
            <div className="carousel-indicators">
              {banners.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#bannerCarousel"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-current={index === 0 ? "true" : "false"}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>

            {/* Slides */}
            <div className="carousel-inner">
              {banners.map((banner, index) => (
                <div
                  key={index}
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                >
                  <img
                    src={banner}
                    className="d-block w-100 img-fluid"
                    alt={`Banner ${index + 1}`}
                    style={{ height: "500px", objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>

            {/* Controls */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#bannerCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#bannerCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>


        {/* ✅ Scrolling Banner */}
        <div className="official-banner">
          <div className="banner-text">
            Hurry Up! 🚀 Sales Are Live | 🛍️ Shop Now & Get Huge Discounts | ⏰
            Limited Time Only
          </div>
        </div>

        {/* 🛍️ Products */}
        <div className="container py-4">
          <h2 className="text-center fw-bold mb-5">🏆 Top Rated Products</h2>
          <div className="row g-4">
            {products.map((product) => (
              <div className="col-md-3 col-sm-6" key={product.id}>
                <div className="card h-100 shadow-sm position-relative">
                  {/* ❤️ Wishlist button */}
                  <button
                    className="wishlist-btn"
                    onClick={() => dispatch(addToWishlist(product))}
                  >
                    ❤️
                  </button>

                  <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="text-primary fw-bold">₹{product.price}</p>
                    <p className="card-text small flex-grow-1">
                      {product.description}
                    </p>
                    <div className="mt-auto">
                      <button
                          className="btn btn-sm btn-success w-100 mb-2"
                          onClick={() => {
                            dispatch(addToCart(product));
                            navigate("/buynow"); // ✅ Go to BuyNow page instead of Cart
                          }}
                        >
                          ⚡ Buy Now
                         </button>

                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 🌟 Modern Footer */}
<footer className="footer bg-dark text-light pt-5 pb-3 mt-5 w-100">
  <div className="container px-5">
    <div className="row gy-4">
      {/* About */}
      <div className="col-lg-3 col-md-6">
        <h5 className="fw-bold mb-3 text-uppercase">About Us</h5>
        <p className="small text-light">
          We bring you the latest and top-rated products at unbeatable prices. 
          Shop with confidence and enjoy fast delivery 🚚.
        </p>
       <ul className="list-unstyled small text-light fade-list">
        <li>👨‍💻 Bhushan Bonagiri – Founder</li>
        <li>🎨 Mohan Kilaparthi – UI/UX Designer</li>
        <li>⚙️ Naveen Golla – Backend Developer</li>
        <li>📦 Avinash Patel – Logistics Manager</li>
      </ul>

      </div>

      {/* Quick Links */}
      <div className="col-lg-3 col-md-6">
        <h5 className="fw-bold mb-3 text-uppercase">Quick Links</h5>
        <ul className="list-unstyled footer-links">
          <li><a href="/">🏠 Home</a></li>
          <li><a href="/wishlist">❤️ Wishlist</a></li>
          <li><a href="/cart">🛒 Cart</a></li>
          <li><a href="/contact">📩 Contact</a></li>
        </ul>
      </div>

      {/* Customer Service */}
      <div className="col-lg-3 col-md-6">
        <h5 className="fw-bold mb-3 text-uppercase">Customer Service</h5>
        <ul className="list-unstyled footer-links">
          <li><a href="/">❓ FAQs</a></li>
          <li><a href="/">🚚 Shipping</a></li>
          <li><a href="/">↩️ Returns</a></li>
          <li><a href="/">🔒 Privacy Policy</a></li>
        </ul>
      </div>

      {/* Contact */}
      <div className="col-lg-3 col-md-6">
        <h5 className="fw-bold mb-3 text-uppercase">Contact Us</h5>
        <p className="small">
          📍 123 Market Street, New Delhi, India <br />
          📞 +91 88867 60822 <br />
          📧 bhushancart@gmail.com
        </p>
        <div className="social-icons d-flex gap-3 mt-3">
          <a href="#" className="social-link"><i className="bi bi-facebook"></i></a>
          <a href="#" className="social-link"><i className="bi bi-twitter"></i></a>
          <a href="#" className="social-link"><i className="bi bi-instagram"></i></a>
          <a href="#" className="social-link"><i className="bi bi-youtube"></i></a>
        </div>
      </div>
    </div>

    <hr className="footer-divider" />
    <div className="text-center small text-muted fade-in">
      © {new Date().getFullYear()} <strong>MyShop</strong>. All rights reserved.
    </div>
  </div>
</footer>

    </>
  );
}

export default Home;
