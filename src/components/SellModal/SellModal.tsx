import { useState } from "react";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import {
  useCreateSalesMutation,
  useGetDiscountCouponQuery,
  useMemberPurchesPointsQuery,
} from "../../redux/features/sales/salesApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Flower } from "../FlowerCard/FlowerCard";
import DiscountCoupon from "../DiscountCoupon/DiscountCoupon";
import { applyDiscount } from "../../utils/applyDiscount";
import { TUser } from "../../types/global";

interface SellModalProps {
  flower: Partial<Flower>;
  handleModal: () => void;
}

interface FormData {
  sellerUserId?: string;
  productId: string;
  saleDate: string;
  buyer: string;
  quantitySold: string;
  totalAmount: number;
  redeemPurchesPointsUsed: boolean;
}

const SellModal: React.FC<SellModalProps> = ({ flower, handleModal }) => {
  const user = useAppSelector(useCurrentUser) as TUser;
  const [formData, setFormData] = useState<FormData>({
    sellerUserId: (user as { id: string })?.id,
    productId: flower._id as string,
    saleDate: "",
    buyer: "",
    quantitySold: "",
    totalAmount: 0,
    redeemPurchesPointsUsed: false,
  });
  const [discountCode, setDiscountCode] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [redeemPointUsed, setRedeemPointUsed] = useState(false);
  const [createSales] = useCreateSalesMutation();
  const { data: coupon } = useGetDiscountCouponQuery(undefined);
  const { data: userPurchesPoint } = useMemberPurchesPointsQuery(undefined);
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const name = e.target.name;
    let value = e.target.value;
    let updatedFormData = { ...formData };
    if (name === "quantitySold") {
      value = Number(parseFloat(value).toFixed(2));
      const productPrice = flower.price;
      const totalCount = (value * (productPrice as number)).toFixed(2);
      const totalAmount = parseFloat(totalCount);

      updatedFormData = {
        ...updatedFormData,
        [name]: value,
        totalAmount: totalAmount,
      };
      setButtonDisabled(false);
    }

    let isValid = true;
    if (name === "saleDate") {
      // Validate the entered date format (YYYY-MM-DD)
      isValid = /\d{4}-\d{2}-\d{2}/.test(value);

      if (!isValid) {
        console.error("Invalid date format");
      }
    }
    updatedFormData = {
      ...updatedFormData,
      [name]: value,
    };

    setFormData(updatedFormData);
  };

  const onSubmit = async () => {
    const formDataToSubmit = {
      ...formData,
    };

    if (redeemPointUsed) {
      formDataToSubmit.redeemPurchesPointsUsed = true;
    }

    // console.log(formDataToSubmit);
    createSales(formDataToSubmit);
    toast.success("Sale created successfully", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate("/");
    handleModal();
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black/60 backdrop-blur-sm">
      <form
        onSubmit={(e) => {
          e.preventDefault(), onSubmit();
        }}
        className="mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11"
      >
        <h2 className="mb-5 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
          Sells dash
        </h2>
        <DiscountCoupon />
        <h3 className="mb-4 text-center text-lg font-semibold text-gray-400 lg:mb-11 mt-1">
          {flower?.name}has a total of{" "}
          <span className="text-white">{flower?.quantity}</span> units
          accessible and each unit is priced at{" "}
          <span className="text-white">{flower?.price} $</span> <br />
          {user?.role === "member" && (
            <>
              <small className="text-white mr-1">
                Purches Points:
                {userPurchesPoint?.data},
              </small>
              <small className="text-amber-200 font-normal">
                If you want only purches points discount, use coupon{" "}
                <span className="p-1 rounded-sm bg-lime-100 text-black">
                  REDEEM
                </span>
                & click Calculate coupone discount with redeem points
              </small>
            </>
          )}
        </h3>
        <br />
        <div>
          {formData.totalAmount !== undefined &&
            !isNaN(formData?.totalAmount) && (
              <span className="pb-3  my-1 p-2 rounded-md border border-gray-300 text-green-200 font-semibold text-lg">
                Total: {formData?.totalAmount} $
              </span>
            )}
          {isButtonDisabled && (
            <small className="text-amber-200 ml-1">
              Re-adjust the quantity to update the total amount and discount.
            </small>
          )}
          <div className="space-y-3">
            <input
              className="text-white rounded-md bg-[#2D323F] px-3 py-2.5 mr-2"
              type="text"
              name="discountCode"
              value={discountCode}
              onChange={(e) => {
                setDiscountCode(e.target.value);
              }}
              placeholder="Coupon Code"
            />
            <button
              onClick={() => {
                const { newAmount, redeemDiscount } = applyDiscount(
                  coupon?.data,
                  discountCode,
                  formData?.totalAmount
                );
                formData.totalAmount = newAmount as number;
                setRedeemPointUsed(redeemDiscount);
                setButtonDisabled(true);
              }}
              disabled={isButtonDisabled}
              className="btn btn-success text-white"
            >
              Calculate only by coupone code discount
            </button>
          </div>
          {user?.role === "member" && (
            <div className="space-y-3">
              <input
                className="text-black rounded-md bg-[#606266] px-3 py-2.5 mr-2"
                disabled={true}
                placeholder={`Redeem: ${userPurchesPoint?.data}% discount`}
              />
              <button
                onClick={() => {
                  const { newAmount, redeemDiscount } = applyDiscount(
                    coupon?.data,
                    discountCode,
                    formData?.totalAmount,
                    userPurchesPoint?.data
                  );
                  formData.totalAmount = newAmount as number;
                  setRedeemPointUsed(redeemDiscount);

                  setButtonDisabled(true);
                }}
                disabled={isButtonDisabled}
                className="btn btn-info text-white tooltip  tooltip-bottom  tooltip-warning"
                data-tip={`If you want only purches points discount,\n use coupon REDEEM`}
              >
                Calculate coupone discount with redeem points
              </button>
            </div>
          )}
        </div>

        <div className="space-y-9 text-white lg:space-y-1">
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="title">Buyer Name:</label>
            <input
              className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
              type="text"
              name="buyer"
              required
              placeholder="Buyer name"
              value={formData?.buyer}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="title">Quantity:</label>
            <input
              className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
              type="number"
              name="quantitySold"
              max={flower?.quantity}
              min="1"
              placeholder={`max quntity ${flower?.quantity}`}
              required
              value={formData?.quantitySold}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="title">Sales Date:</label>
            <input
              name="saleDate"
              value={formData?.saleDate}
              pattern="\d{4}-\d{2}-\d{2}"
              placeholder="YYYY-MM-DD 2023-01-28"
              onChange={handleInputChange}
              required
              type="text"
              className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
            />
          </div>
        </div>

        <div className="mt-16 flex justify-center lg:mt-20 gap-2">
          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80 tooltip  tooltip-top  tooltip-info"
            data-tip={`Calculate discount before purchase`}
          >
            Confirm purchase
          </button>

          <button
            onClick={handleModal}
            className="rounded bg-red-400 px-4 py-2 text-white transition-all hover:opacity-80"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellModal;
