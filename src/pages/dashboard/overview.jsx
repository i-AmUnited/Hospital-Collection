import arrow from "../../assets/icons-svg/arrow.svg";
import OverviewCard from "../../components/dashboard overview/overviewCard";
import growthIcon from "../../assets/icons-svg/growth.svg";
import declineIcon from "../../assets/icons-svg/decline.svg";
import { useDashboardStats } from "../reuseableEffects";
import { useState } from "react";

const Overview = () => {
  const dashboardStats = useDashboardStats();

  const [statPeriod, setStatPeriod] = useState("today");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const options = ["today", "week", "month", "year", "overall"];

  const revenueValue = dashboardStats?.revenue?.[statPeriod]?.amount;
  const invoicesValue = dashboardStats?.invoiceProvided?.[statPeriod]?.amount;
  const bankTransferValue = dashboardStats?.bankTransfer?.[statPeriod]?.amount;
  const POSValue = dashboardStats?.posStats?.[statPeriod]?.amount;

  const formattedRevenueValue = typeof revenueValue === 'number' ? revenueValue.toLocaleString() : '0';
  const formattedInvoicesValue = typeof invoicesValue === 'number' ? invoicesValue.toLocaleString() : '0';
  const formattedBankTransferValue = typeof bankTransferValue === 'number' ? bankTransferValue.toLocaleString() : '0';
  const formattedPOSValue = typeof POSValue === 'number' ? POSValue.toLocaleString() : '0';


  return (
    <div>
      <div className="font-extrabold">Overview</div>
        <div className="text-xs flex items-center gap-4 mt-5 font-bold relative">
              <span>
                Showing{" "}
                <span className="text-primary underline capitalize">{statPeriod}</span> stats
              </span>
        
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span>Change</span>
                <img src={arrow} alt="change" className="h-5" />
              </div>
        
              {dropdownOpen && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded shadow text-black z-10">
                  {options.map((option) => (
                    <div
                      key={option}
                      className="ps-4 pe-16 py-3 hover:bg-gray-100 cursor-pointer capitalize"
                      onClick={() => {
                        setStatPeriod(option);
                        setDropdownOpen(false);
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
        </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        <OverviewCard
          cardTitle={"Total Revenue"}
          value={formattedRevenueValue}
          changeValue={0.5}
          changeIcon={growthIcon}
          trend={"grow"}
        />
        <OverviewCard
          cardTitle={"Issued Invoices (amount)"}
          value={formattedInvoicesValue}
          changeValue={0.5}
          changeIcon={declineIcon}
        />
        <OverviewCard
          cardTitle={"Bank Transfers (amount)"}
          value={formattedBankTransferValue}
          changeValue={0.5}
          changeIcon={declineIcon}
        />
        <OverviewCard
          cardTitle={"POS Transactions (amount)"}
          value={formattedPOSValue}
          changeValue={0.5}
          changeIcon={declineIcon}
        />
      </div>
    </div>
  );
};

export default Overview;
