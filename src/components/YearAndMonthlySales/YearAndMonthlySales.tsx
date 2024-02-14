interface YearAndMonthlySales {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  isLoading: boolean;
}

const YearAndMonthlySales: React.FC<YearAndMonthlySales> = ({
  data,
  isLoading,
}) => {
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
  // console.log("data", data?.data[0]?.monthlyData);
  // console.log("data.data.monthlyData", data?.data);
  const bgColor = ["#4410bf", "#1d3b9e", "#2277cb", "#069d94"];
  function getRandomIndex() {
    return Math.round(Math.random() * (bgColor.length - 1));
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-1 py-9">
        {/*  eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {data?.data[0]?.monthlyData.map((monthlyData: any, i: any) => (
          <div
            key={i}
            className={`card  text-neutral-content`}
            style={{ backgroundColor: `${bgColor[getRandomIndex()]}` }}
          >
            <div className="card-body items-center text-center">
              <h2 className="card-title">{monthlyData.month}</h2>
              <p>Total amount: {monthlyData?.totalAmount} $</p>
              <p>Unite sold: {monthlyData?.totalQuantity} </p>
              <div className="py-2 text-start">
                <div className="font-semibold">
                  <p>Best selling product: {monthlyData?.bestProduct?.name}</p>
                  <p>Bestseller: {monthlyData?.bestSeller?.username}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default YearAndMonthlySales;
