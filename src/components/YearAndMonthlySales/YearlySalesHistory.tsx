interface YearlySalesHistoryProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  isLoading: boolean;
}

const YearlySalesHistory: React.FC<YearlySalesHistoryProps> = ({
  data,
  isLoading,
}) => {
  // console.log("data", data?.data[0]);
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
  return (
    <>
      {data?.data[0]?.clientInput?.year ? (
        <div className="card text-neutral-content  mt-8 bg-violet-950">
          <div className="card-body items-center text-center">
            <h2 className="card-title">
              {data?.data[0]?.clientInput?.year} Sales History
            </h2>

            <p>Total amount: {data?.data[0]?.totalYearlyAmount}$</p>
            <p>Unite sold: {data?.data[0]?.totalYearlyQuantity}</p>
            <div className="py-2 text-center">
              <div className="font-semibold">
                <p>
                  Top-seller of the year:{" "}
                  {data?.data[0]?.bestYearlySeller?.username}
                </p>
                <p>
                  Top-selling product of the year:{" "}
                  {data?.data[0]?.bestYearlyProduct?.name}
                </p>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card text-neutral-content  mt-8 bg-violet-950">
          <div className="card-body items-center text-center">
            <h2 className="card-title">Sales Year not found!</h2>
            <div className="py-2 text-center"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default YearlySalesHistory;
