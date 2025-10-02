// BuyNow.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addOrder, clearCart } from "./Store";
import emailjs from "@emailjs/browser";
import QRCode from "react-qr-code";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./Cart.css"; // reuse the cart CSS

function BuyNow() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.registerUser);

  const [buttonDiscount, setButtonDiscount] = useState(0);
  const [customerEmail, setCustomerEmail] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponResult, setCouponResult] = useState({
    isValid: false,
    discountPercentage: 0,
    discountAmount: 0,
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  // Card payment fields
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
  });

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const buttonDiscountAmount = (totalPrice * buttonDiscount) / 100;
  const finalPrice = totalPrice - buttonDiscountAmount - (couponResult?.discountAmount || 0);
  const taxAmount = finalPrice * 0.18;
  const finalPriceWithTax = finalPrice + taxAmount;

  const formatPrice = (price) =>
    price.toLocaleString("en-IN", { style: "currency", currency: "INR" });

  // Apply coupon
  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "SAVE10") {
      const discountAmount = (totalPrice - buttonDiscountAmount) * 0.1;
      setCouponResult({ isValid: true, discountPercentage: 10, discountAmount });
      toast.success(`🎉 Coupon Applied! 10% OFF (Saved ${formatPrice(discountAmount)})`);
    } else {
      setCouponResult({ isValid: false, discountPercentage: 0, discountAmount: 0 });
      toast.error("❌ Invalid coupon code. Please try again!");
    }
  };

  const handleCompletePurchase = () => {
    if (!paymentMethod) return toast.warning("⚠️ Please select a payment method!");
    if (!customerEmail) return toast.warning("⚠️ Please enter your email!");
    if (!isAuthenticated) {
      toast.error("⚠️ Please login to complete your purchase.");
      return navigate("/login");
    }

    // Card payment validation
    if (paymentMethod === "card") {
      const { cardNumber, expiry, cvv, name } = cardDetails;
      if (!cardNumber || !expiry || !cvv || !name) {
        return toast.warning("⚠️ Please fill all card details!");
      }
    }

    const purchaseDetails = {
      date: new Date().toLocaleString(),
      items: [...cartItems],
      totalPrice: finalPriceWithTax,
      email: customerEmail,
      paymentMethod,
      buttonDiscount,
      coupon: couponResult,
      cardDetails: paymentMethod === "card" ? cardDetails : null,
    };

    const templateParams = {
      order_id: Date.now().toString(),
      orders: cartItems.map((item) => ({
        name: item.name,
        units: item.quantity,
        price: formatPrice(item.price * item.quantity),
        image_url: item.image || "",
      })),
      cost: {
        shipping: formatPrice(50),
        tax: formatPrice(taxAmount),
        total: formatPrice(finalPriceWithTax),
      },
      email: customerEmail,
    };

    emailjs
      .send("service_4q4udeu", "template_qhw76wo", templateParams, "H423NUzKmJf2SqI3Q")
      .then(() => {
        dispatch(addOrder(purchaseDetails));
        dispatch(clearCart());
        toast.success("🎉 Order placed successfully! Redirecting...", { autoClose: 2000 });
        setTimeout(() => navigate("/"), 2000);
      })
      .catch(() => toast.error("❌ Failed to send email. Order not placed."));
  };

  return (
    <div className="cart-page">
      <h2>⚡ Buy Now</h2>

      {cartItems.length > 0 ? (
        <div className="row">
          {/* Cart Items */}
          <div className="col-md-7">
            <div className="d-flex flex-column gap-3">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-card d-flex align-items-center">
                  {item.image && <img src={item.image} alt={item.name} className="cart-product-img" />}
                  <div className="flex-grow-1 ms-3">
                    <h5>{item.name}</h5>
                    <p>Price: <strong>{formatPrice(item.price)}</strong></p>
                    <p>Subtotal: <strong>{formatPrice(item.price * item.quantity)}</strong></p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary & Payment */}
          <div className="col-md-5">
            <div className="checkout-box mx-auto mb-4">
              <h4>🧾 Order Summary</h4>
              <hr />
              <p>Total: <strong>{formatPrice(totalPrice)}</strong></p>
              <p className="text-success">Manual Discount ({buttonDiscount}%): -{formatPrice(buttonDiscountAmount)}</p>
              {couponResult.isValid && (
                <p className="text-success">Coupon Discount ({couponResult.discountPercentage}%): -{formatPrice(couponResult.discountAmount)}</p>
              )}
              <h5>Final Price (with Tax): {formatPrice(finalPriceWithTax)}</h5>

              {/* Discount Buttons */}
              <div className="mt-3">
                {[10, 20, 30].map((d) => (
                  <button
                    key={d}
                    className={`btn mx-1 discount-btn ${buttonDiscount === d ? "btn-primary" : "btn-outline-primary"}`}
                    onClick={() => setButtonDiscount(d)}
                  >
                    {d}% Off
                  </button>
                ))}
              </div>

              {/* Coupon */}
              <div className="mt-3 row g-2">
                <div className="col-8">
                  <input type="text" className="form-control" placeholder="Enter Coupon Code" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} />
                </div>
                <div className="col-4">
                  <button className="btn btn-secondary w-100" onClick={handleApplyCoupon}>Apply</button>
                </div>
              </div>

              {/* Email */}
              <div className="mt-3">
                <input type="email" className="form-control" placeholder="Enter your email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
              </div>
            </div>

            {/* Payment */}
            <div className="checkout-box mx-auto">
              <h4 className="text-center">💳 Payment</h4>
              <hr />
              {!showPaymentOptions ? (
                <button className="btn btn-outline-dark w-100" onClick={() => setShowPaymentOptions(true)}>
                  Select Payment Method
                </button>
              ) : (
                <>
                  <div className="d-flex flex-column gap-2">
                    <button className={`btn ${paymentMethod === "qr" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setPaymentMethod("qr")}>QR Code</button>
                    <button className={`btn ${paymentMethod === "card" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setPaymentMethod("card")}>Card</button>
                    <button className={`btn ${paymentMethod === "cod" ? "btn-primary" : "btn-outline-primary"}`} onClick={() => setPaymentMethod("cod")}>Cash on Delivery</button>
                  </div>

                  {/* QR Payment */}
                  {paymentMethod === "qr" && (
                    <div className="qr-code mt-3 text-center">
                      <h6>Scan to Pay {finalPrice.toFixed(2)}</h6>
                      <div style={{ width: "140px", margin: "0 auto" }}>
                        <QRCode value={`upi://pay?pa=8886760822@ybl&pn=BhushanCart&am=${finalPrice.toFixed(2)}&cu=INR`} size={140} />
                      </div>
                      <p className="small text-muted">UPI ID: BhushanCart@UPI</p>
                    </div>
                  )}

                  {/* Card Payment */}
                  {paymentMethod === "card" && (
                    <div className="card-payment mt-3">
                      <input type="text" className="form-control mb-2" placeholder="Card Number" value={cardDetails.cardNumber} onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })} />
                      <input type="text" className="form-control mb-2" placeholder="Expiry MM/YY" value={cardDetails.expiry} onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })} />
                      <input type="text" className="form-control mb-2" placeholder="CVV" value={cardDetails.cvv} onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })} />
                      <input type="text" className="form-control mb-2" placeholder="Cardholder Name" value={cardDetails.name} onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })} />
                    </div>
                  )}

                  {/* Complete Purchase */}
                  <button className="btn btn-success w-100 mt-3" onClick={handleCompletePurchase}>✅ Complete Purchase</button>
                  <button className="btn btn-outline-secondary w-100 mt-2" onClick={() => setShowPaymentOptions(false)}>❌ Cancel</button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-muted">
          <p>🛍️ Your cart is empty.</p>
          <a href="/" className="btn btn-outline-primary">Continue Shopping</a>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default BuyNow;
