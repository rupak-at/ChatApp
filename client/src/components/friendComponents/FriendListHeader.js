import { Plus, Search, SearchIcon, Settings } from "lucide-react";
import React from "react";

const FriendListHeader = ({ setSearchFriend, headerName }) => {
  return (
    <div className="sticky top-0 z-10 flex flex-col gap-2 border-b border-gray-700 bg-gray-900 p-3 font-sans w-96 backdrop-blur-sm">
      <div className="relative">
        <input
          onChange={(e) => setSearchFriend(e.target.value)}
          type="text"
          placeholder="Search Friend..."
          className="w-full border border-gray-600 bg-gray-700 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 p-2 pl-9 rounded-lg text-gray-200 placeholder-gray-400 transition-colors"
        />
        <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-2xl font-semibold text-gray-100">{headerName}</p>
        <div className="flex gap-2">
          <button className="rounded-full p-1.5 text-gray-300 hover:bg-gray-700 hover:text-purple-400 transition-colors">
            <Plus className="h-5 w-5" />
          </button>
          <button className="rounded-full p-1.5 text-gray-300 hover:bg-gray-700 hover:text-purple-400 transition-colors">
            <Settings className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendListHeader;
