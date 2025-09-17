import React from "react";
import { useNavigate } from "react-router-dom";

function Clothing() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Mens Clothing",
      image: "/images/mensclothing.jpg",
      color: "success",
      description: "Trendy and comfortable styles for men.",
      path: "/clothing/mensclothing",
    },
    {
      name: "Womens Clothing",
      image: "/images/womensclothing.jpg",
      color: "warning",
      description: "Elegant and stylish outfits for women.",
      path: "/clothing/womensclothing",
    },
    {
      name: "Kids Wear",
      image: "/images/kidswear.jpg",
      color: "primary",
      description: "Fun and comfortable fashion for kids.",
      path: "/clothing/kidsware",
    },
  ];

  return (
    <section id="clothing" className="py-5 bg-light">
      <div className="container text-center">
        <h2 className="fw-bold mb-4">Shop by Clothing Category</h2>
        <div className="row g-4 justify-content-center">
          {categories.map((cat, index) => (
            <div className="col-auto" key={index}> {/* ✅ auto width so we can fix card size */}
              <div
                className="card h-100 shadow-sm border-0 rounded-3"
                style={{ width: "250px" }} // ✅ decreased card width
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

export default Clothing;
