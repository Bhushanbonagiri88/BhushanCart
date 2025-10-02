import React from "react";
import { useNavigate } from "react-router-dom";

function Clothing() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Mens Clothing",
      image: "/images/mensclothing.jpg",
      gradient: "linear-gradient(45deg, #36d1dc, #5b86e5)", // blue gradient
      description: "Trendy and comfortable styles for men.",
      path: "/clothing/mensclothing",
    },
    {
      name: "Womens Clothing",
      image: "/images/womensclothing.jpg",
      gradient: "linear-gradient(45deg, #f7971e, #ffd200)", // orange-yellow
      description: "Elegant and stylish outfits for women.",
      path: "/clothing/womensclothing",
    },
    {
      name: "Kids Wear",
      image: "/images/kidswear.jpg",
      gradient: "linear-gradient(45deg, #11998e, #38ef7d)", // green
      description: "Fun and comfortable fashion for kids.",
      path: "/clothing/kidswear",
    },
  ];

  return (
    <section
      id="clothing"
      style={{ background: "#f9f9f9", paddingTop: "70px", paddingBottom: "3rem" }}
    >
      <div className="container text-center">
        <h2 className="fw-bold mb-5" style={{ fontSize: "2.2rem", color: "#333" }}>
          👗 Shop by Clothing Category
        </h2>

        <div className="row g-4 justify-content-center">
          {categories.map((cat, index) => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={index}>
              <div
                className="card shadow border-0 rounded-4 h-100"
                style={{ transition: "all 0.3s ease", cursor: "pointer", overflow: "hidden" }}
                onClick={() => navigate(cat.path)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 12px 25px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 6px 15px rgba(0,0,0,0.1)";
                }}
              >
                <div style={{ overflow: "hidden", cursor: "pointer" }}>
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="card-img-top"
                    style={{ height: "180px", objectFit: "cover", transition: "transform 0.4s ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                </div>

                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold" style={{ fontSize: "1.2rem" }}>{cat.name}</h5>
                  <p className="card-text flex-grow-1 text-muted" style={{ fontSize: "0.9rem" }}>
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
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
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

export default Clothing;
