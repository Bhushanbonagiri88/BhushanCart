import React from "react";
import { useNavigate } from "react-router-dom";

function Electronics() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Mobiles",
      image: "/image/mobiles.jpg",
      color: "success",
      description: "Latest smartphones with amazing features and deals.",
      path: "/electronics/mobiles",
    },
    {
      name: "Laptops",
      image: "/image/laptops.jpg",
      color: "warning",
      description: "High-performance laptops for work, gaming, and study.",
      path: "/electronics/laptops",
    },
    {
      name: "Cameras",
      image: "/image/cameras.jpg",
      color: "primary",
      description: "Capture moments with top-quality cameras and accessories.",
      path: "/electronics//cameras",
    },
    {
      name: "Smart Home",
      image: "/image/smarthome.jpg",
      color: "info",
      description: "Smart devices and appliances to make your home intelligent.",
      path: "/electronics//smarthome",
    },
  ];

  return (
    <section id="electronics" className="py-5 bg-light">
      <div className="container text-center">
        <h2 className="fw-bold mb-4">Shop by Electronics Category</h2>
        <div className="row g-4">
          {categories.map((cat, index) => (
            <div className="col-md-3" key={index}>
              <div className="card h-100 shadow-sm border-0 rounded-3">
                <img
                  src={cat.image}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                  alt={cat.name}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{cat.name}</h5>
                  <p className="card-text flex-grow-1">{cat.description}</p>
                  <button
                    className={`btn btn-${cat.color} mt-auto`}
                    onClick={() => navigate(cat.path)} // ✅ Navigate to page
                  >
                    Shop {cat.name}
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
