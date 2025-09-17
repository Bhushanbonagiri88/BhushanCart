import React from "react";
import { useNavigate } from "react-router-dom";

function Sports() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Cricket",
      image: "/images/cricket.jpg", // ✅ replace with your cricket image path
      color: "success",
      description: "Bats, balls, kits, and accessories for cricket lovers.",
      path: "/sports/cricket",
    },
    {
      name: "Football",
      image: "/images/football.jpg", // ✅ replace with your football image path
      color: "primary",
      description: "Footballs, jerseys, shoes, and gear for football fans.",
      path: "/sports/football",
    },
  ];

  return (
    <section id="sports" className="py-5 bg-light">
      <div className="container text-center">
        <h2 className="fw-bold mb-4">Shop by Sports Category</h2>
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

export default Sports;
