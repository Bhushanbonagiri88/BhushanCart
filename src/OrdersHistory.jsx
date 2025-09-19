import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearOrders } from "./Store";
import Swal from "sweetalert2";

function OrdersHistory() {
  const orders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  const handleClearOrders = () => {
    if (orders.length === 0) return;

    Swal.fire({
      title: "Are you sure?",
      text: "This will clear all your order history!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, clear it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearOrders());
        Swal.fire({
          icon: "success",
          title: "Orders Cleared",
          text: "All your orders have been removed.",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <div className="container my-4">
      {/* Heading */}
      <h2 className="text-center mb-4">🧾 Order History</h2>

      {/* Empty state */}
      {orders.length === 0 ? (
        <p className="text-center text-muted">No orders yet.</p>
      ) : (
        <div className="row">
          {orders.map((purchase, index) => (
            <div key={index} className="col-md-6 col-lg-4 mb-4">
              <div className="card shadow-sm h-100 rounded-3">
                <div className="card-body">
                  {/* Order Date & Amount */}
                  <h6 className="text-muted mb-2">
                    📅 <strong>Date:</strong> {purchase.date}
                  </h6>
                  <h6 className="mb-3">
                    💰 <strong>Total:</strong> ₹{purchase.totalPrice.toFixed(2)}
                  </h6>

                  {/* Order Items */}
                  {purchase.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="d-flex align-items-center mb-3 border rounded p-2"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="rounded"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                          marginRight: "12px",
                        }}
                      />
                      <div className="flex-grow-1">
                        <p className="fw-bold mb-1">{item.name}</p>
                        <p className="text-muted mb-0">
                          {item.quantity} × ₹{item.price} = ₹
                          {(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Clear Orders Button */}
      {orders.length > 0 && (
        <div className="text-center mt-4">
          <button className="btn btn-danger px-4" onClick={handleClearOrders}>
            🗑️ Clear All Orders
          </button>
        </div>
      )}
    </div>
  );
}

export default OrdersHistory;
