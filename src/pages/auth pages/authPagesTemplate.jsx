import { Route, Routes } from "react-router-dom";
import signInDoodle from "../../assets/doodle.svg";
import Signin from "./signIn";
import Registeruser from "./registerUser";
import ResetPassword from "./resetPassword";
import luthLogo from "../../assets/luthLogo.svg"

const AuthPages = () => {
    return ( 
        <div>
          <div className="px-8 py-3 border-b border-b-lightGray/40 flex items-center gap-4">
            <img src={luthLogo} alt="" className="h-12"/>
            <div className="font-extrabold">LUTH Portal</div>
          </div>
          <div className="p-4 md:p-8">
            <div className="rounded-md border border-[#c4c4c432] grid grid-cols-1 lg:grid-cols-12">
              <div className="px-6 md:px-8 py-10 grid gap-10 lg:col-span-5">
                <Routes>
                  <Route index element={<Signin />} />
                  <Route path="create-account" element={<Registeruser />} />
                  <Route path="reset-password" element={<ResetPassword />} />
                </Routes>
              </div>
              <div className="lg:col-span-7 p-1">
                <img src={signInDoodle} alt="" className="h-full object-cover"/>
              </div>
            </div>
          </div>
        </div>
     );
}
 
export default AuthPages;