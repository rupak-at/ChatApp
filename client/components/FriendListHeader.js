import React from "react";

const FriendListHeader = ({setSearchFriend}) => {


  return (
    <div className="flex flex-col gap-2 border-b-2 border-b-black border-r border-r-black bg-gray-900 text-gray-300 p-2 font-serif w-96 h-[105px]">
      <input
        onChange={(e) => setSearchFriend(e.target.value)}
        type="text"
        placeholder="Search Friend ..."
        className="border border-gray-700 bg-gray-800 focus:outline-none p-2 rounded-md transition text-gray-300"
      />
      <p className="text-3xl p-1 font-semibold text-gray-200">Friends</p>
    </div>
  );
};

export default FriendListHeader;
