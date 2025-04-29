import arrow from "../../assets/icons-svg/arrow.svg";
import OverviewCard from "../../components/dashboard overview/overviewCard";
import growthIcon from "../../assets/icons-svg/growth.svg";
import declineIcon from "../../assets/icons-svg/decline.svg"; 
import { useDashboardStats } from "../reuseableEffects";

const Overview = () => {
  const dashboardStats = useDashboardStats()
  console.log(dashboardStats)
  return (
    <div>
      <div className="font-extrabold">Overview</div>
      <div className="text-xs flex items-center gap-4 mt-5 font-bold">
        <span>
          Showing <span className="text-primary underline">daily</span> stats
        </span>
        <div className="flex items-center gap-1 text-xs">
          <span>Change</span>
          <img src={arrow} alt="" className="h-5" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        <OverviewCard
          cardTitle={"Total Revenue"}
          value={"400,750.00"}
          changeValue={0.5}
          changeIcon={growthIcon}
          trend={"grow"}
          />
        <OverviewCard
          cardTitle={"Issued Invoices (amount)"}
          value={"400,750.00"}
          changeValue={0.5}
          changeIcon={declineIcon}
          />
        <OverviewCard
          cardTitle={"Bank Transfers (amount)"}
          value={"400,750.00"}
          changeValue={0.5}
          changeIcon={declineIcon}
          />
        <OverviewCard
          cardTitle={"POS Transactions (amount)"}
          value={"400,750.00"}
          changeValue={0.5}
          changeIcon={declineIcon}
          />
      </div>
    </div>
  );
};

export default Overview;
