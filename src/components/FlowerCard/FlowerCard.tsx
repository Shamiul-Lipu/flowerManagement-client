import { useState } from "react";
import UpdateModal from "../UpdateModal/UpdateModal";
import { useDeleteFlowerMutation } from "../../redux/features/flowerCrud/flowerCrudApi";
import SellModal from "../SellModal/SellModal";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { showConfirmationToast } from "../../utils/DeleteWarnToast";

export interface Flower {
  _id: string;
  name: string;
  description: string;
  uses: string;
  price: number;
  quantity: number;
  bloomDate: string;
  color: string;
  category: string;
  fragrance: string;
  size: number;
  bloomingSeason: string;
  rating: number;
  isSelectedForDelete?: boolean;
}
export interface PartialFlowerId {
  _id: string;
}

interface FlowerCardProps {
  flower: Partial<Flower>;
  handleCheckboxClick: (flowerId: string) => void;
}

const FlowerCard: React.FC<FlowerCardProps> = ({
  flower,
  handleCheckboxClick,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [flowerId, setFlowerId] = useState({});
  const [showSellsModal, setShowSellsModal] = useState(false);
  const [deleteFlower] = useDeleteFlowerMutation(flowerId);
  const user = useAppSelector(useCurrentUser);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDelete = (flower: any) => {
    showConfirmationToast(
      "Are you sure you want to delete?",
      () => {
        // Handle "Confirm" action
        console.log("confirm");
        setFlowerId(flower._id);
        deleteFlower(flower);
        toast.success("Flower has been deleted successfully", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      },
      () => {
        // Handle "Cancel" action
        // console.log("Cancelled");
      }
    );
  };

  return (
    <>
      {showModal && (
        <UpdateModal flower={flower} handleModal={() => setShowModal(false)} />
      )}
      {showSellsModal && (
        <SellModal
          flower={flower}
          handleModal={() => setShowSellsModal(false)}
        />
      )}
      <div className="card  shadow-xl bg-slate-100">
        <div className="card-body">
          <div className="flex justify-end gap-2">
            {flower._id && (
              <input
                defaultChecked={flower.isSelectedForDelete}
                onClick={() => handleCheckboxClick(flower?._id as string)}
                type="checkbox"
                className="checkbox checkbox-warning"
              />
            )}
          </div>
          <h2 className="card-title font-bold">{flower.name}</h2>
          <p>
            {flower.quantity} unite Available, Price: {flower.price}$
          </p>
          <div className="text-base font-semibold">
            <p>Fragrance: {flower.fragrance} </p>
            <p>{flower.color} Color</p>
            <p>
              Blooming Season: {flower.bloomingSeason} ({flower.bloomDate})
            </p>
            <p>Category: {flower.category} </p>
            <p>Size: {flower.size}'' </p>
          </div>
          <p className="text-sm">{flower.description}</p>
          <p className="text-sm">{flower.uses}</p>
          <div className="flex justify-end items-center space-x-1">
            <div className="rating">
              {Array.from({ length: flower?.rating || 0 }).map((_, i) => (
                <input
                  type="radio"
                  key={i}
                  name="rating-2"
                  className="mask mask-star-2 h-4 w-4 bg-orange-400"
                />
              ))}
            </div>

            <span className="text-xs lg:text-sm">({flower?.rating} Star)</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              {/* delete button */}
              <button
                onClick={() => {
                  user
                    ? handleDelete(flower)
                    : toast.info(
                        "To access this functionality, users must be registered"
                      );
                }}
                className="btn btn-error px-4 py-1 bg-red-100 text-red-950 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
              {/* edit button */}
              <button
                onClick={() => {
                  user
                    ? setShowModal(true)
                    : toast.info(
                        "To access this functionality, users must be registered"
                      );
                }}
                className="btn btn-primary px-4 py-1 bg-blue-200 text-blue-950 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </button>
            </div>
            <button
              onClick={() => {
                user
                  ? setShowSellsModal(true)
                  : toast.info(
                      "To access this functionality, users must be registered"
                    );
              }}
              className="btn btn-success bg-green-200 px-8 hover:text-white"
            >
              Sell
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlowerCard;
