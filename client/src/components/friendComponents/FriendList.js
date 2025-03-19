"use client";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const FriendList = ({ onClickFriend, chattingFriend, searchFriend }) => {

  const [friendLists, setFriendLists] = useState(null);
  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get("http://localhost:4000/friend", {
          withCredentials: true,
        });
        setFriendLists(res.data.Friends);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, []);

  const searchedFriends = friendLists?.filter(({ friend }) => {
    if (friend.username.toLowerCase().includes(searchFriend.toLowerCase())) {
      return friend;
    }
  });

  if (friendLists === null) {
    return (
      <div className="bg-gray-900 w-96 h-screen font-sans border-r shadow-lg overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        <div className="flex flex-col"> </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 w-96 h-screen font-sans border-r shadow-lg overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
      <div className="flex flex-col">
        {searchedFriends.map(({ friend, chatId }) => (
          <div
            onClick={() => onClickFriend(friend, chatId)}
            key={friend._id}
            className={`flex items-center gap-4 p-4 cursor-pointer transition-all ${
              chattingFriend?._id === friend?._id
                ? "bg-gray-800 border-l-4 border-purple-500"
                : "bg-gray-900 hover:bg-gray-800"
            }`}
          >
            {/* Friend's Image */}
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gray-700 border-2 border-gray-600 flex items-center justify-center overflow-hidden">
                {friend.avatar ? (
                  <Image
                    src={friend.avatar}
                    height={56}
                    width={56}
                    alt="Friend's Image"
                    className="rounded-full object-cover h-16 w-16"
                  />
                ) : (
                  <span className="text-xl text-gray-300">👤</span>
                )}
              </div>
              {/* Active Status Indicator */}
              <span
                className={`h-3 w-3 border-2 border-gray-900 rounded-full absolute ${
                  friend.isOnline ? "bg-green-500" : "bg-gray-500"
                } bottom-1 right-1`}
              ></span>
            </div>

            {/* Friend's Name */}
            <div className="flex flex-col gap-1">
              <div className="text-lg font-medium text-gray-100">
                {friend.username}
              </div>
              {/* <div className="text-sm text-gray-400 truncate max-w-[200px]">
                {friend.lastMessage || "No messages yet"}
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendList;
