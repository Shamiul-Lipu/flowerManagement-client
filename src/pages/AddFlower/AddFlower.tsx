import { useState } from "react";
import { useAddFlowerMutation } from "../../redux/features/flowerCrud/flowerCrudApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddFlower = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    uses: "",
    price: "",
    quantity: "",
    bloomDate: "", // 2023-03-01
    color: "",
    category: "",
    fragrance: "",
    size: "",
    bloomingSeason: "",
    rating: "",
    isSelectedForDelete: false,
  });
  const [addFlower] = useAddFlowerMutation();
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleOnChange = (e: { target: { name: any; value: any } }) => {
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

    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // console.log(data, isLoading, isError, isSuccess);

  const onSubmit = async () => {
    addFlower(formData);
    toast.success("Flower has been successfully added", {
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
    <div className="h-screen w-full mx-auto ">
      <h3 className="text-center pt-10 font-bold text-2xl">Add Flower</h3>
      <div className="flex justify-center items-center">
        <form
          onSubmit={(e) => {
            e.preventDefault(), onSubmit();
          }}
          className=""
        >
          <div className="flex gap-3">
            <div className="">
              <div>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text font-semibold">Name:</span>
                  </div>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleOnChange}
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
                    <span className="label-text font-semibold">
                      Description:
                    </span>
                  </div>
                  <input
                    name="description"
                    value={formData.description}
                    onChange={handleOnChange}
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
                    <span className="label-text font-semibold">Uses:</span>
                  </div>
                  <input
                    name="uses"
                    value={formData.uses}
                    onChange={handleOnChange}
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
                    <span className="label-text font-semibold">Price:</span>
                  </div>
                  <input
                    name="price"
                    value={formData.price}
                    onChange={handleOnChange}
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
                    <span className="label-text font-semibold">Quantity:</span>
                  </div>
                  <input
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleOnChange}
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
                    <span className="label-text font-semibold">BloomDate:</span>
                  </div>
                  <input
                    name="bloomDate"
                    value={formData.bloomDate}
                    pattern="\d{4}-\d{2}-\d{2}"
                    placeholder="YYYY-MM-DD 2023-01-28"
                    onChange={handleOnChange}
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
                    <span className="label-text font-semibold">Color:</span>
                  </div>
                  <input
                    name="color"
                    value={formData.color}
                    onChange={handleOnChange}
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
                    <span className="label-text font-semibold">Category:</span>
                  </div>
                  <input
                    name="category"
                    value={formData.category}
                    onChange={handleOnChange}
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
                    <span className="label-text font-semibold">Fragrance:</span>
                  </div>
                  <input
                    name="fragrance"
                    value={formData.fragrance}
                    onChange={handleOnChange}
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
                    <span className="label-text font-semibold">Size:</span>
                  </div>
                  <input
                    name="size"
                    value={formData.size}
                    onChange={handleOnChange}
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
                    <span className="label-text font-semibold">
                      Blooming Season:
                    </span>
                  </div>
                  <select
                    className="block w-full cursor-pointer rounded-md px-3 py-2.5 border-gray-200 border-2"
                    name="bloomingSeason"
                    value={formData.bloomingSeason}
                    onChange={handleOnChange}
                    required
                  >
                    <option value="">Select Season</option>
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
                    <span className="label-text font-semibold">Rating:</span>
                  </div>
                  <input
                    name="rating"
                    value={formData.rating}
                    onChange={handleOnChange}
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
          <div className="mx-auto w-1/2">
            <button
              type="submit"
              className="text-sm px-3 py-2 text-gray-200 bg-black rounded-md my-5 w-full hover:bg-slate-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFlower;

// blooming_seasons = ["Spring", "Summer", "Spring to Summer", "Autumn"];
