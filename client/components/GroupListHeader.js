import React from "react";

const GroupListHeader = ({setSearchGroup}) => {


  return (
    <div className="flex flex-col gap-1 border-b border-gray-700 bg-gray-800 p-2  font-sans w-96 h-[97]">
      <input
        onChange={(e) => setSearchGroup(e.target.value)}
        type="text"
        placeholder="Search Friend..."
        className="w-full border border-gray-600 bg-gray-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 p-2 rounded-md text-gray-200 placeholder-gray-400 transition-colors"
      />

      <p className="text-3xl font-semibold text-gray-100 ">Groups</p>
    </div>
  );
};

export default GroupListHeader;