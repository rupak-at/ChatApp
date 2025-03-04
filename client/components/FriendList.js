"use client";
import Image from "next/image";
import React from "react";

const FriendList = ({ onClickFriend , chattingFriend}) => {
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

  return (
    <div className="bg-gray-800 w-96 h-screen border-r-2 border-black font-serif shadow-lg overflow-y-scroll overscroll-y-contain scrollbar-none scroll-smooth">
      <div className="flex flex-col">
        {friendList.map((friend) => (
          <div
            onClick={() => onClickFriend(friend)}
            key={friend.id}
            className={`flex  items-center gap-3 p-3 cursor-pointer transition-all shadow-sm border-b border-gray-700 ${chattingFriend?.id === friend?.id ? 'bg-zinc-800': 'bg-gray-900 hover:bg-gray-700'}`}
          >
            <div className="relative">
              <Image
                src={friend.image}
                height={80}
                width={80}
                alt="Friend's Image"
                className="rounded-full border-2 border-white shadow-sm"
              />
              <span
                className={`h-3 w-3 rounded-full absolute ${
                  friend.isActive ? "bg-green-500" : "bg-gray-600"
                } bottom-1 right-2`}
              ></span>
            </div>

            <div className="flex flex-col gap-2">
              <div className="text-2xl text-gray-300">{friend.userName}</div>
              <div className="text-sm text-gray-500 font-thin overflow-hidden">
                {friend.message}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendList;
