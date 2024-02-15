import { useState } from "react";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import { useCreateSalesMutation } from "../../redux/features/sales/salesApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Flower } from "../FlowerCard/FlowerCard";

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
}

const SellModal: React.FC<SellModalProps> = ({ flower, handleModal }) => {
  const user = useAppSelector(useCurrentUser);
  const [formData, setFormData] = useState<FormData>({
    sellerUserId: (user as { id: string })?.id,
    productId: flower._id as string,
    saleDate: "",
    buyer: "",
    quantitySold: "",
    totalAmount: 0,
  });
  const [createSales] = useCreateSalesMutation();
  const navigate = useNavigate();
  // console.log(data);

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
    }

    let isValid = true;
    if (name === "saleDate") {
      // Validate the entered date format (YYYY-MM-DD)
      isValid = /\d{4}-\d{2}-\d{2}/.test(value);

      // Optionally, handle the case where the date is not valid
      if (!isValid) {
        console.error("Invalid date format");
        // Optionally, you can return or take other actions for invalid date
      }
    }
    updatedFormData = {
      ...updatedFormData,
      [name]: value,
    };

    // Update the state with the accumulated changes
    setFormData(updatedFormData);
  };
  // console.log(user);

  const onSubmit = async () => {
    const formDataToSubmit = {
      ...formData,
    };
    console.log(formDataToSubmit);
    // createSales(formDataToSubmit);
    // toast.success("Sale created successfully", {
    //   position: "top-center",
    //   autoClose: 3000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    //   theme: "light",
    // });
    // navigate("/");
    // handleModal();
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black/60 backdrop-blur-sm">
      <form
        onSubmit={(e) => {
          e.preventDefault(), onSubmit();
        }}
        className="mx-auto my-10 w-full max-w-[740px] rounded-xl border border-[#FEFBFB]/[36%] bg-[#191D26] p-9 max-md:px-4 lg:my-20 lg:p-11"
      >
        <h2 className="mb-9 text-center text-2xl font-bold text-white lg:mb-11 lg:text-[28px]">
          Sells dash
        </h2>
        <h3 className="mb-9 text-center text-lg font-semibold text-gray-400 lg:mb-11">
          {flower.name}has a total of{" "}
          <span className="text-white">{flower.quantity}</span> units accessible
          and each unit is priced at{" "}
          <span className="text-white">{flower.price} $</span>
        </h3>
        <br />
        {formData.totalAmount !== undefined && !isNaN(formData.totalAmount) && (
          <p className="text-white pb-3">Total: {formData.totalAmount} $</p>
        )}

        <div className="space-y-9 text-white lg:space-y-1">
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="title">Buyer Name:</label>
            <input
              className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
              type="text"
              name="buyer"
              required
              value={formData.buyer}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="title">Quantity:</label>
            <input
              className="block w-full rounded-md bg-[#2D323F] px-3 py-2.5"
              type="number"
              name="quantitySold"
              max={flower.quantity}
              min="1"
              placeholder={`max quntity ${flower.quantity}`}
              required
              value={formData.quantitySold}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2 lg:space-y-3">
            <label htmlFor="title">Sales Date:</label>
            <input
              name="saleDate"
              value={formData.saleDate}
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
          {user ? (
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
            >
              Initiate the sale
            </button>
          ) : (
            <button
              type="submit"
              className="rounded bg-blue-600 px-4 py-2 text-white transition-all hover:opacity-80"
            >
              Confirm purchase
            </button>
          )}
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
