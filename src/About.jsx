import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./About.css";

function About() {
  return (
    <div
      className="card shadow-lg p-4 text-center"
      style={{
        maxWidth: "1100px",
        width: "90%",
        borderRadius: "15px",
        margin: "0 auto",
      }}
    >
      {/* Heading */}
      <h2 className="mb-3 text-primary">ℹ️ About Bhushan Cart</h2>
      <p className="fs-5 mb-4">
        Welcome to <strong>Bhushan Cart</strong> — your one-stop destination for
        top-quality products at affordable prices. We provide everything from
        fresh groceries to electronics, with{" "}
        <span className="text-primary fw-bold">best discounts</span>,{" "}
        <span className="text-success fw-bold">express delivery</span>, and{" "}
        <span className="text-danger fw-bold">customer-first services</span>.
        Our goal is to make online shopping{" "}
        <strong>easy, affordable, and reliable</strong> for everyone.
      </p>

      {/* Vision & Mission */}
      <div className="my-4">
        <h3 className="text-secondary">🌍 Our Vision</h3>
        <p className="text-muted">
          To revolutionize online shopping by combining convenience,
          affordability, and trust — making sure every household can get quality
          products with a single click.
        </p>
        <h3 className="text-secondary">🎯 Our Mission</h3>
        <p className="text-muted">
          Deliver happiness to millions of customers by providing{" "}
          <strong>seamless shopping experiences</strong>,{" "}
          <strong>fair pricing</strong>, and{" "}
          <strong>unmatched customer support</strong>.
        </p>
      </div>

      {/* Core Values */}
      <div className="row my-5">
        <h3 className="text-secondary mb-4">🌟 Our Core Values</h3>
        <div className="col-md-3 col-6 mb-3">
          <div className="card border-0 shadow-sm p-3">
            <h5 className="text-primary">🤝 Integrity</h5>
            <p className="text-muted small">Building trust with honesty.</p>
          </div>
        </div>
        <div className="col-md-3 col-6 mb-3">
          <div className="card border-0 shadow-sm p-3">
            <h5 className="text-primary">⚡ Innovation</h5>
            <p className="text-muted small">Always improving experiences.</p>
          </div>
        </div>
        <div className="col-md-3 col-6 mb-3">
          <div className="card border-0 shadow-sm p-3">
            <h5 className="text-primary">❤️ Customer First</h5>
            <p className="text-muted small">Every decision for our users.</p>
          </div>
        </div>
        <div className="col-md-3 col-6 mb-3">
          <div className="card border-0 shadow-sm p-3">
            <h5 className="text-primary">🌱 Sustainability</h5>
            <p className="text-muted small">Eco-friendly future shopping.</p>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="row text-center my-5">
        <h3 className="text-secondary mb-4">🏆 Achievements</h3>
        <div className="col-md-4 mb-3">
          <div className="card border-0 shadow-sm p-3">
            <h5 className="text-success">Best Startup 2023</h5>
            <p className="text-muted small">
              Recognized among the top 50 e-commerce startups in India.
            </p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card border-0 shadow-sm p-3">
            <h5 className="text-success">5M+ Deliveries</h5>
            <p className="text-muted small">
              Milestone reached with trust & customer love.
            </p>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card border-0 shadow-sm p-3">
            <h5 className="text-success">ISO Certified</h5>
            <p className="text-muted small">
              Ensuring quality standards & secure operations.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="my-5">
        <h3 className="text-secondary">💬 What Customers Say</h3>
        <div className="row mt-4">
          <div className="col-md-4 mb-3">
            <div className="card border-0 shadow p-3">
              <p className="text-muted">
                “Bhushan Cart has made my life easier. Fast delivery & best
                prices!”
              </p>
              <h6 className="text-primary">– Anjali Sharma</h6>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card border-0 shadow p-3">
              <p className="text-muted">
                “I love the eco-friendly packaging & quality of products.”
              </p>
              <h6 className="text-primary">– Rajesh Kumar</h6>
            </div>
          </div>
          <div className="col-md-4 mb-3">
            <div className="card border-0 shadow p-3">
              <p className="text-muted">
                “Customer support is amazing. Highly recommend this platform.”
              </p>
              <h6 className="text-primary">– Sneha Verma</h6>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="row text-center my-4">
        <div className="col-6 col-md-3 mb-3">
          <h2 className="text-primary">1M+</h2>
          <p className="text-muted">Happy Customers</p>
        </div>
        <div className="col-6 col-md-3 mb-3">
          <h2 className="text-primary">5M+</h2>
          <p className="text-muted">Orders Delivered</p>
        </div>
        <div className="col-6 col-md-3 mb-3">
          <h2 className="text-primary">500+</h2>
          <p className="text-muted">Trusted Partners</p>
        </div>
        <div className="col-6 col-md-3 mb-3">
          <h2 className="text-primary">100+</h2>
          <p className="text-muted">Cities Covered</p>
        </div>
      </div>

      {/* Closing Note */}
      <div className="mt-4">
        <h5 className="text-secondary">
          🛍️ Bhushan Cart — Shop Smart, Save More, Live Better!
        </h5>
      </div>

      {/* Payment & Social Section */}
      <div className="row mt-5">
        {/* Payment */}
        <div className="col-md-6 text-center mb-3">
          <h6 className="text-secondary fw-bold">PAYMENT</h6>
          <div className="d-flex justify-content-center flex-wrap gap-3 fs-3">
            💳 💵 🏦 📲
          </div>
        </div>

        {/* Connect */}
        <div className="col-md-6 text-center mb-3">
          <h6 className="text-secondary fw-bold">CONNECT</h6>
          <div className="d-flex justify-content-center flex-wrap gap-3 fs-3">
            <a href="#" className="text-decoration-none">
              ⓕ
            </a>
            <a href="#" className="text-decoration-none">
              𝕏
            </a>
            <a href="#" className="text-decoration-none">
              🅾
            </a>
            <a href="#" className="text-decoration-none">
              [in]
            </a>
            <a href="#" className="text-decoration-none">
              ▶
            </a>
            <a href="#" className="text-decoration-none">
              ➤
            </a>
            <a href="#" className="text-decoration-none">
              ✆
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
