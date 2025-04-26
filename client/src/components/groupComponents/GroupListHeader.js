import { SearchIcon } from "lucide-react";
import React from "react";
import GroupCreationPopOver from "./GroupCreationPopOver";

const GroupListHeader = ({ setSearchGroup }) => {
  return (
    <div className="sticky top-0 z-10 flex flex-col gap-2 border-b border-r border-gray-700 bg-gray-900 p-3 font-sans w-96 backdrop-blur-sm">
      <div className="relative">
        <input
          onChange={(e) => setSearchGroup(e.target.value)}
          type="text"
          placeholder="Search Friend..."
          className="w-full border border-gray-600 bg-gray-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 p-2 pl-9 rounded-lg text-gray-200 placeholder-gray-400 transition-colors"
        />
        <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold text-gray-100">Groups</p>
        <GroupCreationPopOver />
      </div>
    </div>
  );
};

export default GroupListHeader;
