import { Plus, Search, SearchIcon, Settings } from "lucide-react";
import React from "react";

const FriendListHeader = ({ setSearchFriend, headerName }) => {
  return (
    <div className="sticky top-0 z-10 flex flex-col gap-2 border-b border-gray-700 bg-gray-900 p-2 sm:p-3 font-sans w-full sm:w-80 md:w-96 backdrop-blur-sm border-r">
      <div className="relative">
        <input
          onChange={(e) => setSearchFriend(e.target.value)}
          type="text"
          placeholder="Search Friend..."
          className="w-full border border-gray-600 bg-gray-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 p-1.5 sm:p-2 pl-8 sm:pl-9 rounded-lg text-gray-200 placeholder-gray-400 transition-colors text-sm sm:text-base"
        />
        <SearchIcon className="absolute left-2 sm:left-3 top-2 sm:top-2.5 h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xl sm:text-2xl font-semibold text-gray-100">
          {headerName}
        </p>
      </div>
    </div>
  );
};

export default FriendListHeader;
