import React from "react";
import { useNavigate } from "react-router-dom";

function Footwear() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Slippers",
      image: "/images/slippers.jpg", // ✅ replace with your slippers image
      color: "info",
      description: "Comfortable slippers for casual and home use.",
      path: "/footware/slippers",
    },
    {
      name: "Shoes",
      image: "/images/shoes.jpg", // ✅ replace with your shoes image
      color: "dark",
      description: "Trendy and durable shoes for every occasion.",
      path: "/footware/shoes",
    },
  ];

  return (
    <section id="footwear" className="py-5 bg-light">
      <div className="container text-center">
        <h2 className="fw-bold mb-4">Shop by Footwear Category</h2>
        <div className="row g-4 justify-content-center">
          {categories.map((cat, index) => (
            <div className="col-auto" key={index}>
              <div
                className="card h-100 shadow-sm border-0 rounded-3"
                style={{ width: "250px" }}
              >
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
                    onClick={() => navigate(cat.path)}
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

export default Footwear;
