import { useState } from "react";
import {
  useAddFlowerMutation,
  useUpdateFlowerMutation,
} from "../../redux/features/flowerCrud/flowerCrudApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Flower } from "../FlowerCard/FlowerCard";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { TUser } from "../../types/global";

interface UpdateModalProps {
  flower: Partial<Flower>;
  handleModal: () => void;
}

const UpdateModal: React.FC<UpdateModalProps> = ({ flower, handleModal }) => {
  const [inputValues, setInputValues] = useState({
    id: flower._id,
    name: flower.name || "",
    description: flower.description || "",
    uses: flower.uses || "",
    price: flower.price || "",
    quantity: flower.quantity || "",
    bloomDate: flower.bloomDate || "", // 2023-03-01
    color: flower.color || "",
    category: flower.category || "",
    fragrance: flower.fragrance || "",
    size: flower.size || "",
    bloomingSeason: flower.bloomingSeason || "",
    rating: flower.rating || "",
    isSelectedForDelete: flower.isSelectedForDelete,
  });
  const [flowerId, setFlowerId] = useState({});
  const user = useAppSelector(useCurrentUser) as TUser;
  const [updateFlower] = useUpdateFlowerMutation(flowerId);
  const [addFlower] = useAddFlowerMutation();
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const name = e.target.name;
    let value = e.target.value;

    if (
      name === "price" ||
      name === "quantity" ||
      name === "size" ||
      name === "rating"
    ) {
      value = Number(parseFloat(value).toFixed(2));
    }

    let isValid = true;
    if (name === "bloomDate") {
      // Validate the entered date format (YYYY-MM-DD)
      isValid = /\d{4}-\d{2}-\d{2}/.test(value);

      // Optionally, handle the case where the date is not valid
      if (!isValid) {
        console.error("Invalid date format");
        // Optionally, you can return or take other actions for invalid date
      }
    }

    setInputValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleUpdateOnSubmit = () => {
    // console.log("update", inputValues);
    setFlowerId(inputValues.id as string);
    updateFlower(inputValues);
    handleModal();
    toast.success("Successfully updated", {
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
  };

  const handleDuplicateOnSubmit = () => {
    // console.log("duplicate", inputValues);
    setFlowerId(inputValues.id as string);
    addFlower(inputValues);
    handleModal();
    toast.success("Varient created successfully", {
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
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-50 bg-black/60 backdrop-blur-sm">
      <div className="h-screen w-full">
        <h3 className="text-center pt-10 font-bold text-2xl text-white">
          Update Flower
        </h3>

        <div className="flex justify-center items-center">
          <div className="mx-auto my-10 w-full max-w-[740px] rounded-xl border  bg-[#777a80] p-9 max-md:px-4 lg:my-20 lg:p-11">
            <div className="flex justify-center gap-3">
              <div className="">
                <div>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text text-white font-semibold">
                        Name:
                      </span>
                    </div>
                    <input
                      name="name"
                      value={inputValues.name}
                      onChange={handleInputChange}
                      required
                      type="text"
                      placeholder="Name"
                      className="input input-bordered w-full max-w-xs"
                    />
                  </label>
                </div>
                <div>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text text-white font-semibold">
                        Description:
                      </span>
                    </div>
                    <input
                      name="description"
                      value={inputValues.description}
                      onChange={handleInputChange}
                      required
                      type="description"
                      placeholder="Description"
                      className="input input-bordered w-full max-w-xs"
                    />
                  </label>
                </div>
                <div>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text text-white font-semibold">
                        Uses:
                      </span>
                    </div>
                    <input
                      name="uses"
                      value={inputValues.uses}
                      onChange={handleInputChange}
                      required
                      type="uses"
                      placeholder="uses"
                      className="input input-bordered w-full max-w-xs"
                    />
                  </label>
                </div>
                <div>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text text-white font-semibold">
                        Price:
                      </span>
                    </div>
                    <input
                      name="price"
                      value={inputValues.price}
                      onChange={handleInputChange}
                      required
                      type="number"
                      step="any"
                      placeholder="price"
                      className="input input-bordered w-full max-w-xs"
                      min="1"
                    />
                  </label>
                </div>
                <div>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text text-white font-semibold">
                        Quantity:
                      </span>
                    </div>
                    <input
                      name="quantity"
                      value={inputValues.quantity}
                      onChange={handleInputChange}
                      required
                      type="number"
                      placeholder="quantity"
                      className="input input-bordered w-full max-w-xs"
                      min="1"
                    />
                  </label>
                </div>
                <div>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text text-white font-semibold">
                        BloomDate:
                      </span>
                    </div>
                    <input
                      name="bloomDate"
                      value={inputValues.bloomDate}
                      pattern="\d{4}-\d{2}-\d{2}"
                      placeholder="YYYY-MM-DD 2023-01-28"
                      onChange={handleInputChange}
                      required
                      type="text"
                      className="input input-bordered w-full max-w-xs"
                    />
                  </label>
                </div>
              </div>
              <div>
                <div>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text text-white font-semibold">
                        Color:
                      </span>
                    </div>
                    <input
                      name="color"
                      value={inputValues.color}
                      onChange={handleInputChange}
                      required
                      type="text"
                      placeholder="color"
                      className="input input-bordered w-full max-w-xs"
                    />
                  </label>
                </div>
                <div>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text text-white font-semibold">
                        Category:
                      </span>
                    </div>
                    <input
                      name="category"
                      value={inputValues.category}
                      onChange={handleInputChange}
                      required
                      type="text"
                      placeholder="category"
                      className="input input-bordered w-full max-w-xs"
                    />
                  </label>
                </div>
                <div>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text text-white font-semibold">
                        Fragrance:
                      </span>
                    </div>
                    <input
                      name="fragrance"
                      value={inputValues.fragrance}
                      onChange={handleInputChange}
                      required
                      type="text"
                      placeholder="fragrance"
                      className="input input-bordered w-full max-w-xs"
                    />
                  </label>
                </div>
                <div>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text text-white font-semibold">
                        Size:
                      </span>
                    </div>
                    <input
                      name="size"
                      value={inputValues.size}
                      onChange={handleInputChange}
                      required
                      type="number"
                      placeholder="size"
                      className="input input-bordered w-full max-w-xs"
                      min="1"
                    />
                  </label>
                </div>
                <div>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text text-white font-semibold">
                        Blooming Season:
                      </span>
                    </div>
                    <select
                      className="block w-full cursor-pointer rounded-md px-3 py-2.5 border-gray-200 border-2"
                      name="bloomingSeason"
                      value={inputValues.bloomingSeason}
                      onChange={handleInputChange}
                      required
                    >
                      <option value={`${inputValues.bloomingSeason}`}>
                        {inputValues.bloomingSeason}
                      </option>
                      <option value="Spring">Spring</option>
                      <option value="Spring-to-Summer">Spring-to-Summer</option>
                      <option value="Summer">Summer</option>
                      <option value="Autumn">Autumn</option>
                    </select>
                  </label>
                </div>
                <div>
                  <label className="form-control w-full max-w-xs">
                    <div className="label">
                      <span className="label-text text-white font-semibold">
                        Rating:
                      </span>
                    </div>
                    <input
                      name="rating"
                      value={inputValues.rating}
                      onChange={handleInputChange}
                      required
                      type="number"
                      placeholder="rating"
                      className="input input-bordered w-full max-w-xs"
                      min="0"
                      max="5"
                    />
                  </label>
                </div>
              </div>
            </div>
            <div className=" flex justify-center items-center gap-5 ">
              <button
                onClick={() => {
                  handleUpdateOnSubmit();
                }}
                className="font-semibold text-sm px-4 py-2 text-black bg-green-200 rounded-md my-5 hover:bg-green-400 "
              >
                Save update
              </button>
              <button
                onClick={() => {
                  handleDuplicateOnSubmit();
                }}
                className="font-semibold text-sm px-4 py-2 text-black bg-blue-200 rounded-md my-5 hover:bg-blue-400 "
              >
                Create Varient
              </button>
              <button
                onClick={handleModal}
                className="font-semibold text-sm px-6 py-2 text-black bg-rose-200  rounded-md my-5  hover:bg-rose-400 "
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
