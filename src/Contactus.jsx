import { useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contactus.css"; // Import CSS

function Contactus() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      setStatus("⚠️ Please fill in all fields.");
      return;
    }

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    emailjs
      .send(
        "service_y18721x",
        "template_e2y4ldt",
        templateParams,
        "P20VDVmFOyqHIaXJsy"
      )
      .then(
        () => setStatus("✅ Message sent successfully!"),
        (error) => {
          console.error("EmailJS Error:", error);
          setStatus("❌ Failed to send message. Try again later.");
        }
      );

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contactus-container">
      <div className="contactus-wrapper">
        <h2 className="text-center text-primary fw-bold mb-4">📩 Contact Us</h2>

        <div className="card shadow contactus-card">
          <div className="card-body p-4">
            <div className="row">
              {/* Contact Form (Left) */}
              <div className="col-md-6 border-end">
                <h4 className="mb-3 text-dark">Send us a Message</h4>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Your Message</label>
                    <textarea
                      name="message"
                      className="form-control"
                      rows="4"
                      placeholder="Enter your message"
                      value={formData.message}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary w-100">
                    📧 Send Message
                  </button>
                </form>

                {status && (
                  <div className="alert alert-info mt-3 text-center">{status}</div>
                )}
              </div>

              {/* Branch Details (Right) */}
              <div className="col-md-6">
                <h4 className="mb-3 text-dark">🏢 Our Main Branch</h4>
                <p>
                  <strong>BhushanCart Pvt. Ltd.</strong> <br />
                  123 Shopping Street, <br />
                  Hyderabad, Telangana, India <br />
                  PIN: 500001
                </p>

                <p>
                  <strong>📞 Phone:</strong> +91 88867 60822 <br />
                  <strong>📧 Email:</strong> support@bhushancart.com
                </p>

                <h5 className="mt-4 mb-2">🗺️ Find Us on Map</h5>
                <div style={{ width: "100%", height: "250px" }}>
                  <iframe
                    title="Branch Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.575977637115!2d78.48667101537666!3d17.385044907919923!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb97885d47a9a1%3A0xbafed9c8b!2sHyderabad!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: "0" }}
                    allowFullScreen=""
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contactus;
