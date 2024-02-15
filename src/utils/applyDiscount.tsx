import { toast } from "react-toastify";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function applyDiscount(
  data: any[],
  couponCode = "",
  totalAmount: number,
  extraDiscount = 0
) {
  const trimmedCouponCode = couponCode.trim();

  const discountPercentage = data.reduce(
    (acc: any, couponObj: { coupon: string; discountPercentage: any }) => {
      if (couponObj.coupon.trim() === trimmedCouponCode) {
        return couponObj.discountPercentage;
      }
      return acc;
    },
    null
  );

  if (!discountPercentage) {
    toast.error("Coupon did not match");
  }

  if (discountPercentage !== null) {
    const totalDiscountPercentage = discountPercentage + extraDiscount;
    const discountedAmount = totalAmount * (1 - totalDiscountPercentage / 100);
    return parseFloat(discountedAmount.toFixed(2));
  } else {
    return totalAmount;
  }
}
