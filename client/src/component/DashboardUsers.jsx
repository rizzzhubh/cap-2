import React, { useEffect, useState } from "react";
import { AiOutlineClear } from "react-icons/ai";
import { motion } from "framer-motion";
import { getAllUsers } from "../../api";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";


export const DashboardUsersCard = ({data,index}) => {
  console.log(data,index)
  return (
    <motion.div className="relative w-full rounded-md flex items-center justify-between py-4 bg-lightOverlay cursor-pointer hover:bg-card hover:shadow-md">
      <div className="w-275 min-w-[160px] flex items-center justify-center">
      <img src={data.imageurl} alt="" className="w-10 h-10 obbject-cover rounded-md min-w-[40px] shadow-md"/>

      </div>
    </motion.div>
  )
}

const DashboardUsers = () => {
  const [{ allUsers }, dispatch] = useStateValue();
  useEffect(() => {
    if (!allUsers || allUsers.length === 0) {
      getAllUsers()
        .then((data) => {
          dispatch({
            type: actionType.SET_ALL_USERS,
            allUsers: data.user,
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
        <div className="w-full min-w-[750px] flex items-center justify-between">
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Image
          </p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Name
          </p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Email
          </p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Verified
          </p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Created
          </p>
          <p className="text-sm text-textColor font-semibold w-275 min-w-[160px] text-center">
            Role
          </p>
        </div>
        {allUsers &&
          allUsers.map((data, index) => (
            <DashboardUsersCard key={index} data={data} index={index} />
          ))}
      </div>
    </div>
  );
};

export default DashboardUsers;
