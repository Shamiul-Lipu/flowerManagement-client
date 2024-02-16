import { toast } from "react-toastify";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function applyDiscount(
  data: any[],
  couponCode: string,
  totalAmount: number,
  extraDiscount = 0
) {
  const trimmedCouponCode = couponCode.trim();
  let discountPercentage;
  let redeemDiscount = false;

  discountPercentage = data.reduce(
    (acc: any, couponObj: { coupon: string; discountPercentage: any }) => {
      if (couponObj.coupon.trim() === trimmedCouponCode) {
        return couponObj.discountPercentage;
      }
      return acc;
    },
    null
  );

  if (trimmedCouponCode === "REDEEM") {
    discountPercentage = 0;
  }
  if (extraDiscount > 0) {
    redeemDiscount = true;
  }

  if (discountPercentage === null) {
    toast.error("Coupon did not match");
  }

  if (discountPercentage !== null) {
    const totalDiscountPercentage = discountPercentage + extraDiscount;
    const discountedAmount = totalAmount * (1 - totalDiscountPercentage / 100);
    const newAmount = parseFloat(discountedAmount.toFixed(2));
    return { newAmount, redeemDiscount };
  } else {
    return { newAmount: totalAmount, redeemDiscount };
  }
}
