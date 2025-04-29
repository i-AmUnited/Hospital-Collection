const OverviewCard = ({ cardTitle, value, changeIcon, changeValue, trend }) => {
  return (
    <div className="bg-white p-4 md:p-6 rounded-md border border-lightGray/30 grid gap-2">
      <div className="text-xs text-lightGray font-medium">{cardTitle}</div>
      <div className="font-bold">
        <span className="font-black">₦ </span>
        {value}
      </div>
      <div className="flex items-center gap-2 text-[10px]">
        <span className={`flex items-center gap-1 ps-1 pe-2 py-1 rounded font-semibold ${trend === "grow" ? "text-primary bg-primary/10" : "text-red-500 bg-red-500/10"}`}>
          <img src={changeIcon} alt="" className="h-4" />
          {changeValue} %
        </span>
        <span className="font-medium">Compared to yesterday</span>
      </div>
    </div>
  );
};

export default OverviewCard;
