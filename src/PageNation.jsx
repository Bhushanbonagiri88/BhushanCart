import React, { useState } from "react";
import { useSelector } from "react-redux";

function PageNation() {
  const vegItems = useSelector((state) => state.products.veg);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // show 6 items per page

  const totalPages = Math.ceil(vegItems.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = vegItems.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">🥦 Veg & Fruits 🥕</h2>

      <div className="row">
        {currentItems.map((item) => (
          <div className="col-sm-6 col-md-4 col-lg-3 mb-4" key={item.id}>
            <div
              className="card h-100 shadow-sm border-0 hover-shadow"
              style={{ transition: "transform 0.3s" }}
            >
              <img
                src={item.image}
                className="card-img-top"
                alt={item.name}
                style={{ height: "150px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <span className="fw-bold">₹{item.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center align-items-center mt-4">
        <button
          className="btn btn-outline-primary mx-1"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          ⬅ Prev
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`btn btn-sm mx-1 ${
              currentPage === index + 1 ? "btn-primary" : "btn-outline-primary"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          className="btn btn-outline-primary mx-1"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next ➡
        </button>
      </div>

      {/* Hover & Card Styling */}
      <style>
        {`
          .hover-shadow:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.2);
          }
        `}
      </style>
    </div>
  );
}

export default PageNation;
