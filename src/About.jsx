import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./About.css";

function About() {
  return (
    <div className="container my-5">
      {/* Heading */}
      <div className="card shadow-lg p-4 mb-4 text-center">
        <h2 className="mb-3 text-primary">ℹ️ About Bhushan Cart</h2>
        <p className="fs-5 mb-0">
          Welcome to <strong>Bhushan Cart</strong> — your one-stop destination for
          top-quality products at affordable prices. We provide everything from
          fresh groceries to electronics, with{" "}
          <span className="text-primary fw-bold">best discounts</span>,{" "}
          <span className="text-success fw-bold">express delivery</span>, and{" "}
          <span className="text-danger fw-bold">customer-first services</span>.
          Our goal is to make online shopping{" "}
          <strong>easy, affordable, and reliable</strong> for everyone.
        </p>
      </div>

      {/* Vision & Mission */}
      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <div className="card shadow-sm p-4 h-100">
            <h3 className="text-secondary">🌍 Our Vision</h3>
            <p className="text-muted mb-0">
              To revolutionize online shopping by combining convenience,
              affordability, and trust — making sure every household can get
              quality products with a single click.
            </p>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm p-4 h-100">
            <h3 className="text-secondary">🎯 Our Mission</h3>
            <p className="text-muted mb-0">
              Deliver happiness to millions of customers by providing{" "}
              <strong>seamless shopping experiences</strong>,{" "}
              <strong>fair pricing</strong>, and{" "}
              <strong>unmatched customer support</strong>.
            </p>
          </div>
        </div>
      </div>

      {/* Core Values */}
      <div className="card shadow-lg p-4 mb-4">
        <h3 className="text-secondary mb-4 text-center">🌟 Our Core Values</h3>
        <div className="row g-3">
          {[
            { title: "🤝 Integrity", text: "Building trust with honesty." },
            { title: "⚡ Innovation", text: "Always improving experiences." },
            { title: "❤️ Customer First", text: "Every decision for our users." },
            { title: "🌱 Sustainability", text: "Eco-friendly future shopping." },
          ].map((value, i) => (
            <div className="col-md-3 col-6" key={i}>
              <div className="card border-0 shadow-sm p-3 h-100 text-center">
                <h5 className="text-primary">{value.title}</h5>
                <p className="text-muted small">{value.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="card shadow-lg p-4 mb-4">
        <h3 className="text-secondary mb-4 text-center">🏆 Achievements</h3>
        <div className="row g-3">
          {[
            {
              title: "Best Startup 2023",
              text: "Recognized among the top 50 e-commerce startups in India.",
            },
            {
              title: "5M+ Deliveries",
              text: "Milestone reached with trust & customer love.",
            },
            {
              title: "ISO Certified",
              text: "Ensuring quality standards & secure operations.",
            },
          ].map((ach, i) => (
            <div className="col-md-4" key={i}>
              <div className="card border-0 shadow-sm p-3 h-100 text-center">
                <h5 className="text-success">{ach.title}</h5>
                <p className="text-muted small">{ach.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="card shadow-lg p-4 mb-4">
        <h3 className="text-secondary text-center">💬 What Customers Say</h3>
        <div className="row g-3 mt-3">
          {[
            {
              text: "“Bhushan Cart has made my life easier. Fast delivery & best prices!”",
              name: "– Anjali Sharma",
            },
            {
              text: "“I love the eco-friendly packaging & quality of products.”",
              name: "– Rajesh Kumar",
            },
            {
              text: "“Customer support is amazing. Highly recommend this platform.”",
              name: "– Sneha Verma",
            },
          ].map((testi, i) => (
            <div className="col-md-4" key={i}>
              <div className="card border-0 shadow p-3 h-100">
                <p className="text-muted">{testi.text}</p>
                <h6 className="text-primary">{testi.name}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="card shadow-lg p-4 mb-4">
        <div className="row text-center g-3">
          {[
            { number: "1M+", text: "Happy Customers" },
            { number: "5M+", text: "Orders Delivered" },
            { number: "500+", text: "Trusted Partners" },
            { number: "100+", text: "Cities Covered" },
          ].map((stat, i) => (
            <div className="col-6 col-md-3" key={i}>
              <h2 className="text-primary">{stat.number}</h2>
              <p className="text-muted">{stat.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Closing Note */}
      <div className="card shadow-lg p-4 mb-4 text-center">
        <h5 className="text-secondary">
          🛍️ Bhushan Cart — Shop Smart, Save More, Live Better!
        </h5>
      </div>

      {/* Payment & Social */}
      <div className="row g-4">
        <div className="col-md-6">
          <div className="card shadow-sm p-4 h-100 text-center">
            <h6 className="text-secondary fw-bold">PAYMENT</h6>
            <div className="d-flex justify-content-center flex-wrap gap-3 fs-3">
              💳 💵 🏦 📲
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm p-4 h-100 text-center">
            <h6 className="text-secondary fw-bold">CONNECT</h6>
            <div className="d-flex justify-content-center flex-wrap gap-3 fs-3">
              <a href="#" className="text-decoration-none">ⓕ</a>
              <a href="#" className="text-decoration-none">𝕏</a>
              <a href="#" className="text-decoration-none">🅾</a>
              <a href="#" className="text-decoration-none">[in]</a>
              <a href="#" className="text-decoration-none">▶</a>
              <a href="#" className="text-decoration-none">➤</a>
              <a href="#" className="text-decoration-none">✆</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
