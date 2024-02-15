/* eslint-disable prefer-const */
import { useState } from "react";
import FlowerCard, {
  PartialFlowerId,
} from "../../components/FlowerCard/FlowerCard";
import {
  useBulkDeleteFlowerflowerMutation,
  useGetAllFlowersQuery,
} from "../../redux/features/flowerCrud/flowerCrudApi";
import FilterAndSearch from "../../components/FilterAndSearch/FilterAndSearch";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { showConfirmationToast } from "../../utils/DeleteWarnToast";
import DiscountCoupon from "../../components/DiscountCoupon/DiscountCoupon";
import { TUser } from "../../types/global";

const Products = () => {
  // const [selectedFlowers, setSelectedFlowers] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFlowers, setSelectedFlowers] = useState<string[]>([]);
  const [queryParams, setQueryParams] = useState({
    searchTerm: "",
    color: "",
    category: "", //select
    fragrance: "", //select
    bloomDate: "", //2023-06-01
    bloomingSeason: "", //select
    rating: "",
    sortBy: "", //select
    sortOrder: "", //select
    minSize: "",
    maxSize: "",
    minPrice: "",
    maxPrice: "",
  });
  const handleResetQueryParams = () => {
    setQueryParams({
      searchTerm: "",
      color: "",
      category: "",
      fragrance: "",
      bloomDate: "",
      bloomingSeason: "",
      rating: "",
      sortBy: "",
      sortOrder: "",
      minSize: "",
      maxSize: "",
      minPrice: "",
      maxPrice: "",
    });
  };

  const [bulkDeleteFlowerflower] = useBulkDeleteFlowerflowerMutation();
  const { data, isLoading } = useGetAllFlowersQuery(queryParams);
  const user = useAppSelector(useCurrentUser) as TUser;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-1 pt-8">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="skeleton card bg-base-100 shadow-xl">
            <div className="skeleton card-body">
              <h2 className="skeleton card-title"></h2>
              <p className="skeleton"></p>
              <div className="skeleton card-actions justify-end">
                <button className="skeleton btn"></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const handleCheckboxClick = (id: string) => {
    const isSelected = selectedFlowers.includes(id);

    setSelectedFlowers((prevSelectedFlowers: string[]) => {
      if (isSelected) {
        return prevSelectedFlowers.filter((flowerId) => flowerId !== id);
      } else {
        return [...prevSelectedFlowers, id];
      }
    });
  };
  // console.log(selectedFlowers);
  const handleBulkDelete = () => {
    showConfirmationToast(
      "Are you sure you want to delete?",
      () => {
        // Handle "Confirm" action
        // console.log("Bulk Delete Array:", selectedFlowers);
        bulkDeleteFlowerflower(selectedFlowers);
        toast.success("Bulk Delete has been successfully done", {
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

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    let value = e.target.value;

    setQueryParams({
      ...queryParams,
      [name]: value,
    });
  };
  //  Value is a string for select elements
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setQueryParams({
      ...queryParams,
      [name]: value,
    });
  };
  // console.log(data);
  return (
    <>
      <div>
        <DiscountCoupon />
        <FilterAndSearch
          handleSelectChange={handleSelectChange}
          setShowFilter={setShowFilter}
          showFilter={showFilter}
          queryParams={queryParams}
          handleOnChange={handleOnChange}
          onResetQueryParams={() => handleResetQueryParams()}
        />

        <div className="flex justify-center items-start py-8 gap-3">
          <button
            onClick={() => setShowFilter(true)}
            className={`btn btn-success bg-black text-white tooltip tooltip-bottom ${
              showFilter ? "hidden" : "block"
            }`}
            data-tip="click for additional data filtering"
          >
            Show filters !
          </button>
          {user?.role === "manager" && (
            <button
              onClick={() => {
                handleBulkDelete();
              }}
              className="btn btn-error bg-red-950 text-white tooltip tooltip-bottom"
              data-tip="card checkbox-select and delete multiple items"
            >
              Bulk delete!
            </button>
          )}
        </div>

        {/* display flower products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-1">
          {data?.data?.map((flower: PartialFlowerId) => (
            <FlowerCard
              key={flower._id}
              flower={flower}
              handleCheckboxClick={handleCheckboxClick}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
