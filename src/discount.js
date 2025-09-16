export function totalPrice(cartItems) {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
}

export function buttonDiscount(totalPrice, buttonDiscount) {
  return (totalPrice * buttonDiscount) / 100;
}

export function getCouponDiscount(couponCode, totalPrice) {
  let discountPercentage = 0;

  switch (couponCode.toUpperCase()) {  // ✅ ensure case-insensitive
    case "BHUSHAN10":
      discountPercentage = 10;
      break;
    case "BHUSHAN20":
      discountPercentage = 20;
      break;
    case "BHUSHAN30":
      discountPercentage = 30;
      break;
    default:
      discountPercentage = 0;
  }

  const discountAmount = (totalPrice * discountPercentage) / 100;

  return {
    isValid: discountPercentage > 0,
    discountPercentage,
    discountAmount,
  };
}
