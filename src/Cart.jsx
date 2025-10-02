import { useSelector, useDispatch } from "react-redux";
import {
  addOrder,
  decreaseItem,
  increaseItem,
  removeFromCart,
  clearCart,
} from "./Store";
import { useState } from "react";
import {
  buttonDiscount as calculateButtonDiscount,
  getCouponDiscount,
} from "./discount";
import emailjs from "@emailjs/browser";
import QRCode from "react-qr-code";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
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

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const buttonDiscountAmount = calculateButtonDiscount(totalPrice, buttonDiscount);
  const finalPrice =
    totalPrice - buttonDiscountAmount - (couponResult?.discountAmount || 0);
  const taxAmount = finalPrice * 0.18;
  const finalPriceWithTax = finalPrice + taxAmount;

  const formatPrice = (price) =>
    price.toLocaleString("en-IN", { style: "currency", currency: "INR" });

  const handleApplyCoupon = () => {
    const result = getCouponDiscount(couponCode, totalPrice - buttonDiscountAmount);
    setCouponResult(result);
    if (result.isValid) {
      toast.success(
        `🎉 Coupon Applied! ${result.discountPercentage}% OFF (Saved ${formatPrice(
          result.discountAmount
        )})`
      );
    } else {
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

    const purchaseDetails = {
      date: new Date().toLocaleString(),
      items: [...cartItems],
      totalPrice: finalPriceWithTax,
      email: customerEmail,
      paymentMethod,
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
      .send(
        "service_4q4udeu",
        "template_qhw76wo",
        templateParams,
        "H423NUzKmJf2SqI3Q"
      )
      .then(() => {
        dispatch(clearCart());
        dispatch(addOrder(purchaseDetails));
        toast.success("🎉 Order placed successfully! Redirecting...", {
          autoClose: 2000,
        });
        setTimeout(() => navigate("/"), 2000);
      })
      .catch(() => toast.error("❌ Failed to send email. Order not placed."));
  };

  const handleButtonDiscount = (d) => {
    setButtonDiscount(d);
    toast.info(`🎁 ${d}% Discount Applied!`);
  };

  return (
    <div className="cart-page">
      <h2>🛒 Shopping Cart ({totalItems} items)</h2>

      {cartItems.length > 0 ? (
        <div className="row">
          {/* Cart Items */}
          <div className="col-md-7">
            <div className="d-flex flex-column gap-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="cart-card d-flex align-items-center"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-product-img"
                    />
                  )}

                  <div className="flex-grow-1 ms-3 d-flex flex-column justify-content-center align-items-center">
                    <h5>{item.name}</h5>
                    <p>
                      Price: <strong>{formatPrice(item.price)}</strong>
                    </p>
                    <p>
                      Subtotal: <strong>{formatPrice(item.price * item.quantity)}</strong>
                    </p>

                    <div className="d-flex justify-content-center align-items-center gap-2 flex-wrap mt-2">
                      <button
                        className="btn quantity-btn"
                        disabled={item.quantity === 1}
                        onClick={() => dispatch(decreaseItem(item))}
                      >
                        −
                      </button>
                      <span className="quantity-text">{item.quantity}</span>
                      <button
                        className="btn quantity-btn"
                        onClick={() => dispatch(increaseItem(item))}
                      >
                        +
                      </button>
                      <button
                        className="btn btn-outline-danger remove-btn"
                        onClick={() => dispatch(removeFromCart(item))}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary + Payment */}
          <div className="col-md-5">
            <div className="checkout-box mx-auto mb-4">
              <h4>🧾 Cart Summary</h4>
              <hr />
              <p>Total: <strong>{formatPrice(totalPrice)}</strong></p>
              <p className="text-success">
                Manual Discount ({buttonDiscount}%): - {formatPrice(buttonDiscountAmount)}
              </p>
              {couponResult.isValid && (
                <p className="text-success">
                  Coupon Discount ({couponResult.discountPercentage}%): -{" "}
                  {formatPrice(couponResult.discountAmount)}
                </p>
              )}
              <h5>Final Price (with Tax): {formatPrice(finalPriceWithTax)}</h5>

              {/* Discount Buttons */}
              <div className="mt-3">
                {[10, 20, 30].map((d) => (
                  <button
                    key={d}
                    className={`btn mx-1 discount-btn ${
                      buttonDiscount === d ? "active" : ""
                    }`}
                    onClick={() => handleButtonDiscount(d)}
                  >
                    {d}% Off
                  </button>
                ))}
              </div>

              {/* Coupon */}
              <div className="mt-4 row g-2">
                <div className="col-8">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Coupon Code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                </div>
                <div className="col-4">
                  <button
                    className="btn btn-secondary w-100"
                    onClick={handleApplyCoupon}
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Email */}
              <div className="mt-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Payment */}
            <div className="checkout-box mx-auto">
              <h4 className="text-center">💳 Payment</h4>
              <hr />
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
                        paymentMethod === "qr" ? "btn-primary" : "btn-outline-primary"
                      }`}
                      onClick={() => setPaymentMethod("qr")}
                    >
                      QR Code
                    </button>
                    <button
                      className={`btn ${
                        paymentMethod === "card" ? "btn-primary" : "btn-outline-primary"
                      }`}
                      onClick={() => setPaymentMethod("card")}
                    >
                      Card
                    </button>
                    <button
                      className={`btn ${
                        paymentMethod === "cod" ? "btn-primary" : "btn-outline-primary"
                      }`}
                      onClick={() => setPaymentMethod("cod")}
                    >
                      Cash on Delivery
                    </button>
                  </div>

                  {/* QR Payment */}
                  {paymentMethod === "qr" && (
                    <div className="qr-code mt-3">
                      <h6>Scan to Pay {finalPrice.toFixed(2)}</h6>
                      <div style={{ width: "140px", margin: "0 auto" }}>
                        <QRCode
                          value={`upi://pay?pa=8886760822@ybl&pn=BhushanCart&am=${finalPrice.toFixed(
                            2
                          )}&cu=INR`}
                          size={140}
                        />
                      </div>
                      <p className="small text-muted">UPI ID: BhushanCart@UPI</p>
                      <button
                        className="btn btn-success w-100 mt-3"
                        onClick={handleCompletePurchase}
                      >
                        ✅ Complete Purchase
                      </button>
                    </div>
                  )}

                  {/* Card Payment */}
                  {paymentMethod === "card" && (
                    <div className="card-payment mt-3">
                      <div className="mb-2">
                        <label>Card Number</label>
                        <input
                          type="text"
                          maxLength={16}
                          placeholder="1234 5678 9012 3456"
                          className="form-control"
                        />
                      </div>
                      <div className="mb-2">
                        <label>Cardholder Name</label>
                        <input
                          type="text"
                          placeholder="Your Name"
                          className="form-control"
                        />
                      </div>
                      <div className="d-flex gap-2">
                        <div className="flex-grow-1">
                          <label>Expiry Date</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="form-control"
                            maxLength={5}
                          />
                        </div>
                        <div className="flex-grow-1">
                          <label>CVV</label>
                          <input
                            type="password"
                            placeholder="123"
                            className="form-control"
                            maxLength={3}
                          />
                        </div>
                      </div>
                      <button
                        className="btn btn-success w-100 mt-3"
                        onClick={handleCompletePurchase}
                      >
                        ✅ Complete Purchase
                      </button>
                    </div>
                  )}

                  {/* COD */}
                  {paymentMethod === "cod" && (
                    <button
                      className="btn btn-success w-100 mt-3"
                      onClick={handleCompletePurchase}
                    >
                      ✅ Complete Purchase
                    </button>
                  )}

                  <button
                    className="btn btn-outline-secondary w-100 mt-2"
                    onClick={() => setShowPaymentOptions(false)}
                  >
                    ❌ Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-muted">
          <p>🛍️ Your cart is empty.</p>
          <a href="/" className="btn btn-outline-primary">
            Continue Shopping
          </a>
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="mt-3 text-center">
          <button
            className="btn btn-danger"
            onClick={() => {
              dispatch(clearCart());
              toast.info("🗑️ Cart cleared!");
            }}
          >
            Clear Cart
          </button>
        </div>
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Cart;
