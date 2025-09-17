import React from "react";
import { useNavigate } from "react-router-dom";

function Kitchen() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Vegetables",
      image: "/images/vegetables.jpg", // ✅ replace with your vegetables image
      color: "success",
      description: "Fresh and organic vegetables for your daily needs.",
      path: "/kitchen/veg",
    },
    {
      name: "Dairy",
      image: "/images/dairy.jpg", // ✅ replace with your dairy image
      color: "warning",
      description: "Milk, cheese, butter, and other fresh dairy products.",
      path: "/kitchen/dairy",
    },
    {
      name: "Groceries",
      image: "/images/groceries.jpg", // ✅ replace with your groceries image
      color: "primary",
      description: "Daily essentials and grocery items for your household.",
      path: "/kitchen/groceries",
    },
  ];

  return (
    <section id="kitchen" className="py-5 bg-light">
      <div className="container text-center">
        <h2 className="fw-bold mb-4">Shop by Kitchen Category</h2>
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

export default Kitchen;
