import { useLastWeeksalesQuery } from "../../redux/features/sales/salesApi";

const WeeklySales = () => {
  const { data, isLoading } = useLastWeeksalesQuery(undefined);
  if (isLoading)
    return (
      <div className="flex justify-center items-center py-3">
        <div className="flex justify-center items-center">
          <span className="loading loading-bars loading-xs"></span>
          <span className="loading loading-bars loading-sm"></span>
          <span className="loading loading-bars loading-md"></span>
          <span className="loading loading-bars loading-lg"></span>
          <span className="loading loading-bars loading-lg"></span>
          <span className="loading loading-bars loading-md"></span>
          <span className="loading loading-bars loading-sm"></span>
          <span className="loading loading-bars loading-xs"></span>
        </div>
      </div>
    );
  //   console.log(data.data[0]);

  return (
    <div className="card bg-violet-800 text-neutral-content">
      <div className="card-body items-center text-center">
        <h2 className="card-title">Last week Sales</h2>
        <p>Total amount: {data?.data[0]?.totalAmount}$</p>
        <p>Unite sold: {data?.data[0]?.totalQuantity}</p>
        <div className="py-2 text-start">
          <div className="font-semibold">
            <p>
              Top-selling product: {data?.data[0]?.bestProductDetails[0]?.name}
            </p>
            <p>
              Quantity left: {data?.data[0]?.bestProductDetails[0]?.quantity}{" "}
              unite
            </p>
          </div>
          <div>
            <p>Bestseller: {data?.data[0]?.bestSellerDetails[0]?.username}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklySales;
