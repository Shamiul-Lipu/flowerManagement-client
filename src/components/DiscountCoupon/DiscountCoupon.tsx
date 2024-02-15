import { useGetDiscountCouponQuery } from "../../redux/features/sales/salesApi";

interface ICoupon {
  _id: string;
  coupon: string;
  discountPercentage: number;
  createdBy: string;
  __v: number;
}

const DiscountCoupon = () => {
  const { data } = useGetDiscountCouponQuery(undefined);
  // console.log(data?.data);

  return (
    <div className="text-gray-700 items-center text-center">
      <h3 className="font-bold text-gray-500">
        Grab this coupon for some awesome discounts!
      </h3>
      <div className="">
        <div className="flex justify-center items-center grow">
          {data?.data?.map((coupon: ICoupon) => (
            <p
              key={coupon._id}
              className="flex justify-center items-center bg-slate-700 p-1 rounded-md text-gray-300 mx-2"
            >
              <span className="text-black bg-lime-100 p-1 rounded-md m-1 flex justify-center items-center">
                {coupon?.coupon}{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-4 h-4 text-green-800 mx-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6h.008v.008H6V6Z"
                  />
                </svg>
              </span>{" "}
              for{" "}
              <span className="font-bold mx-1">
                {coupon?.discountPercentage}%
              </span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiscountCoupon;
