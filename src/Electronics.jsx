import React from "react";
import { useNavigate } from "react-router-dom";

function Electronics() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Mobiles",
      image: "/images/Smartphones.webp",
      description: "Latest smartphones with amazing features and deals.",
      path: "/electronics/mobiles",
      gradient: "linear-gradient(45deg, #1e3c72, #2a5298)", // blue
    },
    {
      name: "Laptops",
      image: "/images/laptops.webp",
      description: "High-performance laptops for work, gaming, and study.",
      path: "/electronics/laptops",
      gradient: "linear-gradient(45deg, #f7971e, #ffd200)", // orange-yellow
    },
    {
      name: "Cameras",
      image: "/images/cameras.webp",
      description: "Capture moments with top-quality cameras and accessories.",
      path: "/electronics/cameras",
      gradient: "linear-gradient(45deg, #11998e, #38ef7d)", // green
    },
    {
      name: "Smart Home",
      image: "/images/smarthome.jpg",
      description: "Smart devices and appliances to make your home intelligent.",
      path: "/electronics/smarthome",
      gradient: "linear-gradient(45deg, #4776e6, #8e54e9)", // purple-blue
    },
  ];

  return (
    <section
      id="electronics"
      style={{
        background: "#f9f9f9",
        marginTop: "0", // remove unwanted margin
        paddingTop: "70px", // equal to navbar height if fixed-top
        paddingBottom: "3rem", // keep bottom spacing
      }}
    >
      <div className="container text-center">
        <h2
          className="fw-bold mb-5"
          style={{ fontSize: "2.2rem", color: "#333", marginTop: "0" }}
        >
          ✨ Shop by Electronics Category
        </h2>

        <div className="row g-4 justify-content-center">
          {categories.map((cat, index) => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={index}>
              <div
                className="card shadow border-0 rounded-4 h-100"
                style={{
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 25px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 15px rgba(0,0,0,0.1)";
                }}
              >
                {/* Image */}
                <div style={{ overflow: "hidden" }}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="card-img-top"
                    style={{
                      height: "180px",
                      objectFit: "cover",
                      transition: "transform 0.4s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.1)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  />
                </div>

                {/* Body */}
                <div className="card-body d-flex flex-column">
                  <h5
                    className="card-title fw-bold"
                    style={{ fontSize: "1.2rem" }}
                  >
                    {cat.name}
                  </h5>
                  <p
                    className="card-text flex-grow-1 text-muted"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {cat.description}
                  </p>

                  <button
                    className="btn mt-auto text-white fw-semibold"
                    style={{
                      background: cat.gradient,
                      border: "none",
                      borderRadius: "8px",
                      padding: "10px 16px",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.opacity = "0.85")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.opacity = "1")
                    }
                    onClick={() => navigate(cat.path)}
                  >
                    Shop {cat.name} →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Electronics;
