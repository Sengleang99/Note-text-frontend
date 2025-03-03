import React from "react";
import { getInitails } from "../../utils/helper";

const ProfileInfo = ({ onSignOut, userInfo }) => {
    if (!userInfo) return null;
  return (
    <div className=" flex items-center gap-3">
      <div className=" w-12 h-12 flex items-center justify-center bg-gray-200 rounded-full">
        {getInitails(userInfo.name)}
      </div>
      <div className="">
        <p className=" text-sm font-medium">{userInfo.name}</p>
        <button
          onClick={onSignOut}
          className=" text-sm text-slate-700 underline"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
