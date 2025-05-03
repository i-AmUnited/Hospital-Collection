import { useState } from "react";
import InputComp from "../../components/inputComp";
import { useListRoles, useListUsers } from "../reuseableEffects";
import SelectComp from "../../components/selectComp";
import ButtonComp from "../../components/buttonComp";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { manageUser } from "../../hooks/local/reducer";
import { showSuccessMessage } from "../../hooks/constants";

const Users = () => {
  const users = useListUsers();
  const roles = useListRoles()
  const [selectedRole, setSelectedRole] = useState("");

  const loading = useSelector((state) => state.user.loading);

  const dispatch = useDispatch();

  
  const roleOptions = roles.map(role => ({
    name:role.name, value: role.id
  }));

  const handleChange = (e) => {
    setSelectedRole(e.target.value);
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter((entry) =>
    Object.values(entry)
      .some((value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const updateUserForm = useFormik({
    initialValues: {
      email: selectedUser?.email || "",
      roleId: selectedUser?.role.id || "",
      isActive: selectedUser?.isActive,
      preferences: selectedUser?.preferences || {},
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Please enter a password"),
    }),
    onSubmit: async (values) => {
      const { email, password } = values;
      let signInData = { email, password };
      const { payload } = await dispatch(manageUser(signInData));
      if (payload.statusCode === 200) {
        showSuccessMessage("sign in succesfull");
      }
    },
  });
  

  return (
    <div>
      <div className="font-extrabold mb-5">Manage users</div>
      <div className="my-5 w-full md:w-2/3 lg:w-1/3">
        <InputComp
          type={"text"}
          isSearch={"true"}
          placeholder={"Search by any field..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 whitespace-nowrap overflow-x-auto border border-lightGray/24 rounded-md mt-6">
        <table className="w-full text-sm text-left bg-white">
          <thead className="border-b border-lightGray/24 bg-lightGray/20 text-xs">
            <tr>
              <th className="ps-6 pe-2 py-[18px] bg-white sticky left-0 z-10">
                No.
              </th>
              <th className="ps-4 pe-6 py-[18px]">Email address</th>
              <th className="px-6 py-[18px]">User name</th>
              <th className="px-6 py-[18px]">Phone number</th>
              <th className="px-6 py-[18px]">Hospital</th>
              <th className="px-6 py-[18px]">Role</th>
              <th className="px-6 py-[18px]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="12" className="text-center py-6">
                  No matching records found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((row, index) => (
                <tr
                  key={index}
                  className="hover:bg-[#c4c4c416] transition duration-500 text-xs font-medium"
                >
                  <td className="py-4 ps-6 pe-2 sticky left-0 bg-white z-10">
                    {index + 1}
                  </td>
                  <td className="py-4 ps-4">{row.email}</td>
                  <td className="py-4 px-6 truncate">{row.userName}</td>
                  <td className="py-4 ps-6">{row.userPhoneNumber}</td>
                  <td className="py-4 ps-6">{row.hospital.hospitalName}</td>
                  <td className="py-4 ps-6">{row.role.name}</td>
                  <td className="py-4 ps-6 flex divide-x divide-lightGray gap-2">
                    <span
                      className="pe-2 underline cursor-pointer hover:text-primary"
                      onClick={() => {
                        setSelectedUser(row);
                        setShowModal(true);
                      }}
                    >
                      Edit user
                    </span>
                    <span className="pe-2 underline cursor-pointer hover:text-amber-600">
                      Assign unit
                    </span>
                    <span className="pe-4 underline cursor-pointer hover:text-amber-600">
                      Assign terminal
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {showModal && selectedUser && (
          <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
            <div className="p-6 flex justify-center w-full">
              <div className="bg-white rounded-md w-full md:w-1/2 p-4 md:p-6">
                <div className="flex justify-between items-center mb-2">
                  <div className="text-sm font-bold">Edit user details</div>
                  <button
                    className="hover:text-black text-xs cursor-pointer font-bold"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
                <div className="text-xs">
                  Username: <span>{selectedUser.userName}</span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
                  <InputComp
                    type={"text"}
                    label={"Email address"}
                    readOnly={"readOnly"}
                    value={selectedUser.userName}
                  />

                  <SelectComp 
                    label={"Select a role"}
                    name={"role"}
                    options={roleOptions}
                    value={selectedRole}
                    onChange={handleChange}
                    placeholder={"Select an option"}
                  />

                 <div className="flex justify-between items-center gap-4">
                   <div className="text-xs">Current Status: <span>{selectedUser.isActive === true ? "Active" : "Inactive"}</span></div>
                   <div className={`${selectedUser.isActive === true ? "text-red-500" : "text-emerald-500"} text-xs`}>{selectedUser.isActive === true ? "Deactivate" : "Activate"}</div>
                 </div>

                </div>
                <div className="mt-8">
                <ButtonComp buttonText={"Update user"} loading={loading}/>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Users;
