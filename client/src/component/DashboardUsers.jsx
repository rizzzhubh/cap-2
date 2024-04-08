import React, { useEffect, useState } from "react";
import { AiOutlineClear } from "react-icons/ai";
import { motion } from "framer-motion";
import { changingUserRole, getAllUsers, removeUser } from "../../api";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import {MdDelete} from "react-icons/md"

export const DashboardUsersCard = ({ data, index }) => {
  const [{ user }, dispatch] = useStateValue();
  const [isUserRoleUpdated, setIsUserRoleUpdated] = useState(false);
  const updateUserRole = (userId, role) => {
    setIsUserRoleUpdated(false);
      changingUserRole(userId, role).then((res) => {
        if (res) {
          getAllUsers().then((data) => {
            dispatch({
              type: actionType.SET_ALL_USERS,
              allUsers: data.data,
            });
          });
        }
      })
  }

  const deleteUser = (userId) => {
    removeUser(userId).then((res) => {
      if (res) {
        getAllUsers().then((data) => {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.data,
          });
        });
      }
    })
  }
  return (
    <>
   <tr className="py-4 bg-lightOverlay rounded-md cursor-pointer hover:bg-card hover:shadow-md">
   {data._id !== (user?.user?._id ?? '') && (
   <motion.div 
   whileTap={{ scale: 0.75 }} className="absolute left-4 w-8 h-8 rounded-md flex items-center justify-center bg-gray-200" onClick={() => deleteUser(data._id)}>
    <MdDelete className="text-xl text-red-400 hover:text-red-500 "/>
   </motion.div>
   )}
  <td>
    <div className="relative rounded-md flex items-start justify-flex-end; py-4">
      <img src={data.imageurl} referrerPolicy="no-referrer" alt="" className="w-10 h-10 object-cover rounded-md min-w-[30px] text-center shadow-md mx-auto" />
    </div>
  </td>
  <td className="text-base text-textColor w-275 min-w-[160px] text-center">{data.name}</td>
  <td className="text-base text-textColor w-275 min-w-[160px] text-center">{data.email}</td>
  <td className="text-base text-textColor w-275 min-w-[160px] text-center">{data.email_verified ? "True" : "False"}</td>
  <td className="text-base text-textColor w-275 min-w-[160px] text-center">{new Date(data.createdAt).toLocaleString()}</td>
  <td className="text-base text-textColor w-275 min-w-[160px] text-center">{data.role}</td>
  {data._id !== (user?.user?._id ?? '') && (
    <div className="flex justify-center items-center"> 
  <motion.button whileTap={{ scale: 0.75 }} className="text-[11px] font-semibold text-black-200 px-1 mt-7  text-center item-center rounded-sm bg-slate-200" onClick={() => setIsUserRoleUpdated(true)}>
    {data.role === "admin" ? "Member" : "Admin"}
  </motion.button>
</div>

)}
{isUserRoleUpdated && (
 
 <motion.div
 initial = {{opacity:0, scale:0.5}}
 animate ={{opacity:1, scale:1}}
 exit={{opacity:0, scale:0.5}} className="absolute z-10 top-6 right-4 flex items-start flex-col gap-4 bg-white shadow-xl rounded-md">
<br />
<div className="flex items-center gap-4">

  <p className="text-textcolor text-[14px] font-semibold px-2 h-20"> Are you sure you want to mark the user as <span>{data.role === "admin" ? "member" : "admin"}</span>?</p>
  <motion.button whileTap={{ scale: 0.75 }} className="outline-none border-none text-sm px-4 py-1 rounded-md bg-blue-200 text-black hover:shadow-md" onClick={() => updateUserRole(data._id, data.role === "admin" ? "member": "admin" )}>Yes</motion.button>
  <motion.button whileTap={{ scale: 0.75 }} className="outline-none border-none text-sm px-4 py-1 rounded-md bg-red-200 text-black hover:shadow-md" onClick={() => setIsUserRoleUpdated(false)}>No</motion.button>
  <br />
</div>
</motion.div>

)}

</tr>
      </>
  );
};

const DashboardUsers = () => {
  const [{ allUsers }, dispatch] = useStateValue();

  useEffect(() => {
    if (!allUsers || allUsers.length === 0) {
      getAllUsers()
        .then((data) => {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.users,
          });
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [allUsers, dispatch]);

  return (
    <div className="w-full p-4 flex items-center justify-center flex-col">
      <div className="relative w-full py-12 min-h-[400px] overflow-x-scroll my-4 flex flex-col items-center justify-start p-4 border border-gray-300 rounded-md gap-3">
        <div className="absolute top-4 left-4">
          <p className="text-sm font-semibold">
            Count:{" "}
            <span className="text-xl font-bold text-textColor">
              {allUsers ? allUsers.length : 0}
            </span>
          </p>
        </div>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Image</th>
              <th className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Name</th>
              <th className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Email</th>
              <th className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Verified</th>
              <th className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Created</th>
              <th className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">Role</th>
            </tr>
          </thead>
          <tbody>
            {allUsers &&
              allUsers.map((data, index) => (
                <DashboardUsersCard key={index} data={data} index={index} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardUsers;





