import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart, removeFromCart } from "./Store";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import QRCode from "react-qr-code";
import "react-toastify/dist/ReactToastify.css";

function BuyNow() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  // ✅ Customer details
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  // ✅ Coupon & Payment
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [payment, setPayment] = useState("");
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  // ✅ Price Calculations
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const taxAmount = subtotal * 0.18;
  const shipping = 50;
  const codCharge = payment === "cod" ? 15 : 0;
  const finalPriceWithTax =
    subtotal + taxAmount + shipping + codCharge - discount;

  const formatPrice = (price) => `₹${price.toFixed(2)}`;

  // ✅ Apply Coupon
  const handleApplyCoupon = () => {
    if (coupon === "SAVE10") {
      setDiscount(subtotal * 0.1);
      toast.success("🎉 Coupon Applied: 10% OFF");
    } else {
      setDiscount(0);
      toast.error("❌ Invalid Coupon");
    }
  };

  // ✅ Place Order (Send Mail + Clear Cart)
  const handlePlaceOrder = () => {
    if (
      !customer.name ||
      !customer.email ||
      !customer.address ||
      !customer.phone
    ) {
      toast.warn("⚠️ Please fill all customer details!");
      return;
    }
    if (!payment) {
      toast.warn("⚠️ Please select a payment method!");
      return;
    }

    const templateParams = {
      order_id: Date.now().toString(),
      orders: cartItems.map((item) => ({
        name: item.name,
        units: item.quantity,
        price: formatPrice(item.price * item.quantity),
        image_url: item.image || "",
      })),
      cost: {
        shipping: formatPrice(shipping),
        tax: formatPrice(taxAmount),
        cod: formatPrice(codCharge),
        discount: formatPrice(discount || 0),
        total: formatPrice(finalPriceWithTax),
      },
      customer_name: customer.name,
      customer_email: customer.email,
      customer_address: customer.address,
      customer_phone: customer.phone,
      payment_method: payment.toUpperCase(),
    };

    emailjs
      .send(
        "service_4q4udeu", // 🔹 Replace with your service ID
        "template_qhw76wo", // 🔹 Replace with your template ID
        templateParams,
        "H423NUzKmJf2SqI3Q" // 🔹 Replace with your public key
      )
      .then(() => {
        toast.success("✅ Order placed & mail sent successfully!");
        dispatch(clearCart()); // Clear cart after placing order
        setCustomer({ name: "", email: "", address: "", phone: "" });
        setCoupon("");
        setDiscount(0);
        setPayment("");
        setShowPaymentOptions(false);
      })
      .catch((error) => {
        console.log("Email sending failed:", error);
        toast.error("❌ Failed to send email. Please try again later.");
      });
  };

  return (
    <div className="container my-4">
      <ToastContainer position="top-center" autoClose={3000} />
      <h2 className="text-center text-success fw-bold mb-4">⚡ Buy Now</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-muted">No items selected for Buy Now.</p>
      ) : (
        <div className="row">
          {/* Order Items */}
          <div className="col-md-8 mb-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="d-flex align-items-center justify-content-between border rounded mb-3 shadow-sm p-3"
                style={{ minHeight: "150px", background: "#fff" }}
              >
                {/* Image + Details */}
                <div className="d-flex align-items-center flex-grow-1">
                  <img
                    src={item.image}
                    alt={item.name}
                    width="80"
                    height="80"
                    className="rounded me-3 border"
                    style={{ objectFit: "cover" }}
                  />
                  <div>
                    <h6 className="fw-bold mb-1">{item.name}</h6>
                    <p className="mb-0 text-muted small">
                      {item.quantity} × {formatPrice(item.price)}
                    </p>
                    <p className="mb-0 text-success fw-bold">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                </div>

                {/* Remove Button */}
                <div>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => dispatch(removeFromCart(item))}
                  >
                    🗑 Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="col-md-4">
            <div className="card shadow-lg p-4" style={{ minHeight: "600px" }}>
              <h4 className="text-center mb-3">📊 Order Summary</h4>
              <p>Subtotal: {formatPrice(subtotal)}</p>
              <p>Tax (18%): {formatPrice(taxAmount)}</p>
              <p>Shipping: {formatPrice(shipping)}</p>
              {payment === "cod" && (
                <p className="text-danger">COD Charge: +{formatPrice(codCharge)}</p>
              )}
              <p className="text-success">Discount: -{formatPrice(discount)}</p>
              <h5 className="fw-bold text-primary">
                Total: {formatPrice(finalPriceWithTax)}
              </h5>

              {/* Coupon */}
              <div className="input-group my-2">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Coupon"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <button
                  className="btn btn-outline-primary"
                  onClick={handleApplyCoupon}
                >
                  Apply
                </button>
              </div>

              {/* Payment Method */}
              <div className="my-3 text-center">
                <h6>💳 Payment Method</h6>
                {!showPaymentOptions ? (
                  <button
                    className="btn btn-outline-dark w-100"
                    onClick={() => setShowPaymentOptions(true)}
                  >
                    Select Payment Method
                  </button>
                ) : (
                  <>
                    <div className="d-flex flex-column gap-2">
                      <button
                        className={`btn ${
                          payment === "qr" ? "btn-primary" : "btn-outline-primary"
                        }`}
                        onClick={() => setPayment("qr")}
                      >
                        QR Code
                      </button>
                      <button
                        className={`btn ${
                          payment === "card"
                            ? "btn-primary"
                            : "btn-outline-primary"
                        }`}
                        onClick={() => setPayment("card")}
                      >
                        Card
                      </button>
                      <button
                        className={`btn ${
                          payment === "cod" ? "btn-primary" : "btn-outline-primary"
                        }`}
                        onClick={() => setPayment("cod")}
                      >
                        Cash on Delivery
                      </button>
                    </div>

                    {/* QR Code */}
                    {payment === "qr" && (
                      <div className="qr-code mt-3">
                        <h6>Scan to Pay {finalPriceWithTax.toFixed(2)}</h6>
                        <div style={{ width: "140px", margin: "0 auto" }}>
                          <QRCode
                            value={`upi://pay?pa=8886760822@ybl&pn=BhushanCart&am=${finalPriceWithTax.toFixed(
                              2
                            )}&cu=INR`}
                            size={140}
                          />
                        </div>
                        <p className="small text-muted">
                          UPI ID: BhushanCart@UPI
                        </p>
                      </div>
                    )}

                    <button
                      className="btn btn-sm btn-outline-secondary mt-2"
                      onClick={() => setShowPaymentOptions(false)}
                    >
                      ❌ Cancel
                    </button>
                  </>
                )}
              </div>

              {/* Customer Details */}
              <div className="my-3">
                <h6>👤 Customer Details</h6>
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Full Name"
                  value={customer.name}
                  onChange={(e) =>
                    setCustomer({ ...customer, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  className="form-control mb-2"
                  placeholder="Email"
                  value={customer.email}
                  onChange={(e) =>
                    setCustomer({ ...customer, email: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Address"
                  value={customer.address}
                  onChange={(e) =>
                    setCustomer({ ...customer, address: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Phone Number"
                  value={customer.phone}
                  onChange={(e) =>
                    setCustomer({ ...customer, phone: e.target.value })
                  }
                />
              </div>

              <button
                className="btn btn-success w-100"
                onClick={handlePlaceOrder}
              >
                ✅ Place Order & Send Mail
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BuyNow;
