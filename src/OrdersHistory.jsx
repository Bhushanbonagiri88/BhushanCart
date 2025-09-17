// import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearOrders } from "./Store"; // Make sure this action exists in your Redux slice
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
      <h2 className="text-center mb-4">🧾 Order History</h2>

      {orders.length === 0 ? (
        <p className="text-center text-muted">No orders yet.</p>
      ) : (
        <div className="list-group">
          {orders.map((purchase, index) => (
            <div
              key={index}
              className="list-group-item mb-3 shadow-sm rounded"
            >
              <p>
                <strong>📅 Date:</strong> {purchase.date}
              </p>
              <p>
                <strong>💰 Total Amount:</strong> ₹
                {purchase.totalPrice.toFixed(2)}
              </p>

              <ul className="list-unstyled">
                {purchase.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="d-flex align-items-center border-bottom py-2"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        marginRight: "12px",
                      }}
                    />
                    <div className="flex-grow-1">
                      <p className="mb-1">
                        <strong>{item.name}</strong>
                      </p>
                      <p className="mb-0 text-muted">
                        {item.quantity} × ₹{item.price} = ₹
                        {(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
       {orders.length > 0 && (
        <div className="text-center mb-4">
          <button className="btn btn-danger" onClick={handleClearOrders}>
            🗑️ Clear All Orders
          </button>
        </div>
      )}

    </div>
  );
}

export default OrdersHistory;
