import { Link } from "react-router-dom";

const Settings = () => {
    return ( 
        <div>
            <div className="font-extrabold mb-5">Settings</div>
            <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4 font-medium">
                <Link to={"/dashboard/manage-users"} className="p-4 border border-lightGray/32 rounded-sm text-xs">Manage users</Link>
                <div className="p-4 border border-lightGray/32 rounded-sm text-xs">Manage hospitals</div>
                <div className="p-4 border border-lightGray/32 rounded-sm text-xs">Manage roles</div>
                <div className="p-4 border border-lightGray/32 rounded-sm text-xs">Manage units</div>
                <div className="p-4 border border-lightGray/32 rounded-sm text-xs">Manage departments</div>
            </div>
        </div>
     );
}
 
export default Settings;