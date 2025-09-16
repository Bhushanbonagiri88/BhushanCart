import { useSelector, useDispatch } from "react-redux";
import {
  addOrder,
  decreaseItem,
  increaseItem,
  removeFromCart,
  clearCart,
} from "./store";
import { useState } from "react";
import {
  buttonDiscount as calculateButtonDiscount,
  getCouponDiscount,
} from "./discount";
import emailjs from "@emailjs/browser";
import QRCode from "react-qr-code";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

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

  const formatPrice = (price) =>
    price.toLocaleString("en-IN", { style: "currency", currency: "INR" });

  const buttonDiscountAmount = calculateButtonDiscount(
    totalPrice,
    buttonDiscount
  );

  const handleApplyCoupon = () => {
    const result = getCouponDiscount(
      couponCode,
      totalPrice - buttonDiscountAmount
    );
    setCouponResult(result);

    if (result.isValid) {
      toast.success(
        `🎉 Coupon Applied! You got ${result.discountPercentage}% OFF (Saved ${formatPrice(
          result.discountAmount
        )})`
      );
    } else {
      toast.error("❌ Invalid coupon code. Please try again!");
    }
  };

  const finalPrice =
    totalPrice - buttonDiscountAmount - (couponResult?.discountAmount || 0);
  const taxAmount = finalPrice * 0.18; // 18% GST
  const finalPriceWithTax = finalPrice + taxAmount;

  // ✅ Checkout + Send Email
  const handleCompletePurchase = () => {
    if (!paymentMethod) {
      toast.warning("⚠️ Please select a payment method!");
      return;
    }
    if (!customerEmail) {
      toast.warning("⚠️ Please enter your email!");
      return;
    }

    const purchaseDetails = {
      date: new Date().toLocaleString(),
      items: [...cartItems],
      totalPrice: finalPriceWithTax,
      email: customerEmail,
      paymentMethod,
    };

    // Send Email
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
        toast.success("✅ Order placed & email sent!");
        setCustomerEmail("");
        dispatch(clearCart());
        dispatch(addOrder(purchaseDetails));
      })
      .catch(() => {
        toast.error("❌ Failed to send email. Order not placed.");
      });
  };

  return (
    <div
      className="w-100"
      style={{
        minHeight: "100vh",
        background: "#f8f9fa",
        padding: "30px",
      }}
    >
      <h2 className="mb-4 text-center text-primary fw-bold">
        🛒 Shopping Cart ({totalItems} items)
      </h2>

      {cartItems.length > 0 ? (
        <div className="row">
          {/* Cart Items */}
          <div className="col-md-7">
            <div className="d-flex flex-column gap-3">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="card shadow-sm border-0 rounded-3 p-3 d-flex flex-row align-items-center cart-item-card"
                  style={{ transition: "all 0.3s ease" }}
                >
                  {/* Image */}
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                  )}

                  {/* Content */}
                  <div className="flex-grow-1 ms-4 d-flex flex-column justify-content-center">
                    <h5 className="fw-bold text-dark">{item.name}</h5>
                    <p className="small text-muted mb-1">
                      Price: <strong>{formatPrice(item.price)}</strong>
                    </p>
                    <p className="small text-muted mb-2">
                      Subtotal:{" "}
                      <strong>{formatPrice(item.price * item.quantity)}</strong>
                    </p>

                    {/* ✅ Quantity Selector Centered */}
                    <div className="d-flex justify-content-center">
                      <div
                        className="d-flex align-items-center rounded-pill bg-light px-3 py-1"
                        style={{ width: "150px", justifyContent: "center" }}
                      >
                        <button
                          className="btn btn-sm btn-light border-0 fw-bold"
                          disabled={item.quantity === 1}
                          onClick={() => dispatch(decreaseItem(item))}
                        >
                          −
                        </button>
                        <span className="mx-2 fw-bold">{item.quantity}</span>
                        <button
                          className="btn btn-sm btn-light border-0 fw-bold"
                          onClick={() => dispatch(increaseItem(item))}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <div className="ms-3">
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
          </div>

          {/* Summary + Payment */}
          <div className="col-md-5">
            {/* ✅ Smaller Cart Summary */}
            <div
              className="card shadow border-0 rounded-3 mb-4 mx-auto"
              style={{ maxWidth: "350px" }}
            >
              <div className="card-body">
                <h4 className="text-dark">🧾 Cart Summary</h4>
                <hr />
                <p>Total: <strong>{formatPrice(totalPrice)}</strong></p>
                <p className="text-success">
                  Manual Discount ({buttonDiscount}%): -{" "}
                  {formatPrice(buttonDiscountAmount)}
                </p>
                {couponResult.isValid && (
                  <p className="text-success">
                    Coupon Discount ({couponResult.discountPercentage}%): -{" "}
                    {formatPrice(couponResult.discountAmount)}
                  </p>
                )}
                <h5 className="text-dark">
                  Final Price (with Tax): {formatPrice(finalPriceWithTax)}
                </h5>

                {/* Discount Buttons */}
                <div className="mt-3">
                  {[10, 20, 30].map((d) => (
                    <button
                      key={d}
                      className={`btn mx-1 ${
                        buttonDiscount === d
                          ? "btn-primary"
                          : "btn-outline-primary"
                      }`}
                      onClick={() => setButtonDiscount(d)}
                    >
                      {d}% Off
                    </button>
                  ))}
                </div>

                {/* Coupon inline */}
                <div className="mt-4 row g-2">
                  <div className="col-8">
                    <input
                      type="text"
                      placeholder="Enter Coupon Code"
                      className="form-control"
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

                {/* Email input */}
                <div className="mt-3">
                  <input
                    type="email"
                    className="form-control"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </div>

            {/* ✅ Smaller Payment Card */}
            <div
              className="card shadow border-0 rounded-3 mx-auto"
              style={{ maxWidth: "350px" }}
            >
              <div className="card-body text-center">
                <h4 className="text-dark">💳 Payment</h4>
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
                          paymentMethod === "qr"
                            ? "btn-primary"
                            : "btn-outline-primary"
                        }`}
                        onClick={() => setPaymentMethod("qr")}
                      >
                        QR Code
                      </button>
                      <button
                        className={`btn ${
                          paymentMethod === "card"
                            ? "btn-primary"
                            : "btn-outline-primary"
                        }`}
                        onClick={() => setPaymentMethod("card")}
                      >
                        Card
                      </button>
                      <button
                        className={`btn ${
                          paymentMethod === "cod"
                            ? "btn-primary"
                            : "btn-outline-primary"
                        }`}
                        onClick={() => setPaymentMethod("cod")}
                      >
                        Cash on Delivery
                      </button>
                    </div>

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
                        <p className="small text-muted">
                          UPI ID: BhushanCart@UPI
                        </p>
                      </div>
                    )}

                    {/* Checkout */}
                    <button
                      onClick={handleCompletePurchase}
                      className="btn btn-lg btn-success mt-3 w-100 shadow-sm"
                    >
                      ✅ Complete Purchase
                    </button>

                    <button
                      className="btn btn-sm btn-outline-secondary mt-2"
                      onClick={() => setShowPaymentOptions(false)}
                    >
                      ❌ Cancel
                    </button>
                  </>
                )}
              </div>
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

      {/* ✅ Clear Cart Button */}
      {cartItems.length > 0 && (
        <div className="mt-3 text-center">
          <button
            className="btn btn-danger "
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
