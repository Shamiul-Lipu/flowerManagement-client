import { useState } from "react";
import { toast } from "react-toastify";
import { useCreateCouponMutation } from "../../redux/features/sales/salesApi";
import { useNavigate } from "react-router-dom";

const CreateCoupon = () => {
  const [formData, setFormData] = useState({
    coupon: "",
    discountPercentage: "",
  });
  const [createCoupon] = useCreateCouponMutation();
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "discountPercentage") {
      // Convert the value to an integer
      value = parseInt(value);
    }
    // Use setFormData to update the state
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = () => {
    // console.log(formData);
    createCoupon(formData);
    toast.success("Discount Coupon created successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigate("/");
  };

  return (
    <div>
      <h3 className="text-center font-bold py-8 text-2xl">
        Create Discount Coupon
      </h3>
      <div className="mx-auto w-1/2">
        <div className="space-y-2 lg:space-y-3">
          <label htmlFor="coupon">Code:</label>
          <input
            className="block w-full rounded-md text-white bg-gray-500 px-3 py-2.5"
            type="text"
            id="coupon"
            name="coupon"
            required
            value={formData.coupon}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2 lg:space-y-3">
          <label htmlFor="discountPercentage">Discount Percentage:</label>
          <input
            className="block w-full rounded-md text-white bg-gray-500 px-3 py-2.5"
            type="number"
            id="discountPercentage"
            name="discountPercentage"
            max="100"
            min="1"
            placeholder="Discount amount"
            required
            value={formData.discountPercentage}
            onChange={handleInputChange}
          />
        </div>
        <button
          onClick={onSubmit}
          className="mr-1.5 my-3 flex items-center space-x-1.5 rounded-md rounded-e-lg bg-[#1C4336] px-4 py-2.5 text-sm text-white"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateCoupon;
