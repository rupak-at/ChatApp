"use client";
import Image from "next/image";
import React from "react";

const FriendList = ({ onClickFriend , chattingFriend, searchFriend}) => {
  const friendList = [
    {
      id: 1,
      userName: "john_doe",
      isActive: true,
      email: "john_doe@example.com",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      message: "Hey, how's it going?",
    },
    {
      id: 2,
      userName: "jane_smith",
      isActive: false,
      email: "jane_smith@example.com",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      message: "Just finished a great book!",
    },
    {
      id: 3,
      userName: "michael_brown",
      isActive: true,
      email: "michael_brown@example.com",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      message: "Anyone up for a weekend trip?",
    },
    {
      id: 4,
      userName: "emily_jones",
      isActive: false,
      email: "emily_jones@example.com",
      image: "https://randomuser.me/api/portraits/women/4.jpg",
      message: "Cooking a new recipe tonight!",
    },
    {
      id: 5,
      userName: "william_johnson",
      isActive: true,
      email: "william_johnson@example.com",
      image: "https://randomuser.me/api/portraits/men/5.jpg",
      message: "Just wrapped up a workout session.",
    },
    {
      id: 6,
      userName: "olivia_williams",
      isActive: true,
      email: "olivia_williams@example.com",
      image: "https://randomuser.me/api/portraits/women/6.jpg",
      message: "Loving the new music playlist!",
    },
    {
      id: 7,
      userName: "james_taylor",
      isActive: false,
      email: "james_taylor@example.com",
      image: "https://randomuser.me/api/portraits/men/7.jpg",
      message: "What’s the best movie to watch this weekend?",
    },
    {
      id: 8,
      userName: "sophia_martin",
      isActive: true,
      email: "sophia_martin@example.com",
      image: "https://randomuser.me/api/portraits/women/8.jpg",
      message: "Excited for the upcoming holiday!",
    },
    {
      id: 9,
      userName: "liam_clark",
      isActive: false,
      email: "liam_clark@example.com",
      image: "https://randomuser.me/api/portraits/men/9.jpg",
      message: "Finally got some time to relax.",
    },
    {
      id: 10,
      userName: "mia_lewis",
      isActive: true,
      email: "mia_lewis@example.com",
      image: "https://randomuser.me/api/portraits/women/10.jpg",
      message: "Looking forward to catching up!",
    },
  ];

  
    const searchedFriends = friendList.filter((friend)=>{
      if (friend.userName.toLowerCase().includes(searchFriend.toLowerCase())){
        return friend
      }
    })

  
  return (

<div className="bg-gray-900 w-96 h-screen font-sans border-r shadow-lg overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
  <div className="flex flex-col">
    {searchedFriends.map((friend) => (
      <div
        onClick={() => onClickFriend(friend)}
        key={friend.id}
        className={`flex items-center gap-4 p-4 cursor-pointer transition-all ${
          chattingFriend?.id === friend?.id
            ? "bg-gray-800 border-l-4 border-purple-500"
            : "bg-gray-900 hover:bg-gray-800"
        }`}
      >
        {/* Friend's Image */}
        <div className="relative">
          <div className="w-14 h-14 rounded-full bg-gray-700 border-2 border-gray-600 flex items-center justify-center overflow-hidden">
            {friend.image ? (
              <Image
                src={friend.image}
                height={56}
                width={56}
                alt="Friend's Image"
                className="rounded-full object-cover"
              />
            ) : (
              <span className="text-xl text-gray-300">👤</span>
            )}
          </div>
          {/* Active Status Indicator */}
          <span
            className={`h-3 w-3 border-2 border-gray-900 rounded-full absolute ${
              friend.isActive ? "bg-green-500" : "bg-gray-500"
            } bottom-1 right-1`}
          ></span>
        </div>

        {/* Friend's Name */}
        <div className="flex flex-col gap-1">
          <div className="text-lg font-medium text-gray-100">
            {friend.userName}
          </div>
          {/* Optional: Last Message Preview */}
          <div className="text-sm text-gray-400 truncate max-w-[200px]">
            {friend.lastMessage || "No messages yet"}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
  );
};

export default FriendList;
