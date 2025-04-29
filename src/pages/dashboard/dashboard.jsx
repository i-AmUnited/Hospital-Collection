import { Route, Routes } from "react-router-dom";
import Overview from "./overview";
import luthLogo from "../../assets/luthLogo.svg";
import { useSelector } from "react-redux";
import SignOut from "../auth pages/signOut";
import { Link } from "react-router-dom";

const Dashboard = () => {

  const userSessionData = useSelector((state) => state.user.userSession);
  if (!userSessionData) {
    return <SignOut />;
  }


  return (
    <div className="bg-[#f9f9f9] min-h-screen relative">
      <div className="px-8 py-3 border-b border-b-lightGray/40 bg-white flex items-center gap-4 absolute top-0 w-full">
        <img src={luthLogo} alt="" className="h-12" />
        <div className="font-extrabold">LUTH Portal</div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 h-screen pt-[70px]">
        <div className="lg:col-span-2 border-r border-r-lightGray/40 ps-8 pe-5 py-7 bg-white text-xs font-medium">
          <ul className="grid gap-6">
            <li>Overview</li>
            <li>Manage LUTH</li>
            <li>Manage patients</li>
            <li>Settlements</li>
            <li>Collections</li>
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
              {/* <Route path="create-account" element={<Registeruser />} /> */}
            </Routes>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
