import React, { useState } from "react";
import DailyAndWeelyStat from "../../components/DailyAndWeelyStat/DailyAndWeelyStat";
import SearchYearSell from "../../components/SearchYearSell/SearchYearSell";
import YearAndMonthlySales from "../../components/YearAndMonthlySales/YearAndMonthlySales";
import { useMonthAndYearlySalesHistoryQuery } from "../../redux/features/sales/salesApi";
import YearlySalesHistory from "../../components/YearAndMonthlySales/YearlySalesHistory";
import { useAppSelector } from "../../redux/hooks";
import { useCurrentUser } from "../../redux/features/auth/authSlice";
import { TUser } from "../../types/global";
import CreateCoupone from "../../components/CreateCoupone/CreateCoupone";

const Dashboard = () => {
  const [input, setInput] = useState("");
  const [year, setYear] = useState(2024);
  const { data, isLoading } = useMonthAndYearlySalesHistoryQuery(year);
  const user = useAppSelector(useCurrentUser) as TUser;

  const handleInputChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const newYear = Number(parseFloat(input).toFixed(2));
    setYear(newYear);
    // console.log(newYear);
  };

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
      <div className="w-full bg-gray-700 py-2 my-2 rounded-md flex justify-center items-center">
        <h3 className="text-white font-bold">
          Username: {user?.username}, Role: {user?.role}
        </h3>
      </div>
      {user?.role === "manager" && <CreateCoupone />}
      <h3 className="text-center font-bold py-8 text-2xl">
        Sales History Dashboard
      </h3>
      <SearchYearSell
        handleInputChange={handleInputChange}
        setInput={setInput}
        input={input}
      />
      <YearlySalesHistory data={data} isLoading={isLoading} />
      <DailyAndWeelyStat />
      <YearAndMonthlySales data={data} isLoading={isLoading} />
    </>
  );
};

export default Dashboard;
