import { Route, Routes } from "react-router-dom";
import Overview from "./overview";
import luthLogo from "../../assets/luthLogo.svg";
import { useSelector } from "react-redux";
import SignOut from "../auth pages/signOut";
import { Link } from "react-router-dom";
import Collections from "./collections";
import Settings from "./settings";
import Users from "./manageUsers";
import Settlements from "./settlements";

const Dashboard = () => {

  const userSessionData = useSelector((state) => state.user.userSession);
  if (!userSessionData) {
    return <SignOut />;
  }


  return (
    <div className="bg-[#f9f9f9] min-h-screen relative">
      <div className="px-8 py-3 border-b border-b-lightGray/40 bg-white flex items-center gap-4 fixed top-0 z-50 w-full">
        <img src={luthLogo} alt="" className="h-12" />
        <div className="font-extrabold">LUTH Portal</div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 h-screen pt-[70px]">
        <div className="lg:col-span-2 border-r border-r-lightGray/40 ps-8 pe-5 py-7 bg-white relative text-xs font-medium">
          <ul className="grid gap-6 fixed">
            <li><Link to={"/dashboard"}>Overview</Link></li>
            <li><Link to={"/dashboard/settlements"}>Settlements</Link></li>
            <li><Link to={"/dashboard/collections"}>Collections</Link></li>
            <li><Link to={"/dashboard/settings"}>Settings</Link></li>
            <li>
              <Link to={"/sign-out"}>
                sign out
              </Link>
            </li>
          </ul>
        </div>
        <div className="lg:col-span-10 px-5 py-6">
            <Routes>
              <Route index element={<Overview />} />
              <Route path="collections" element={<Collections />} />
              <Route path="settlements" element={<Settlements />} />
              <Route path="settings" element={<Settings />} />
              <Route path="manage-users" element={<Users />} />
              
            </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
