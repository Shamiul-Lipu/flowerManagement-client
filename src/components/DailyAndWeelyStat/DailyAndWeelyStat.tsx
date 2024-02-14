import DailySales from "./DailySales";
import WeeklySales from "./WeeklySales";

const DailyAndWeelyStat = () => {
  return (
    <div className="flex justify-center items-center py-8 gap-5">
      {/* todays data */}
      <DailySales />
      {/* Weekly sales */}
      <WeeklySales />
    </div>
  );
};

export default DailyAndWeelyStat;
