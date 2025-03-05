import Image from "next/image";
import React from "react";
import { IoCall } from "react-icons/io5";
import { FaVideo } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";

const FriendChat = ({ friend }) => {
  if (!friend) {
    return (
      <div className="h-screen flex justify-center items-center font-sans bg-gray-900">
        Start Chatting With Friends
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col h-screen w-full font-sans bg-gray-900 text-white">
        {/* Chat Header */}
        <div className="flex justify-between items-center bg-gray-800 px-4 py-3  shadow-md h-[105px] border-b border-b-black">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Image
                src={friend?.image && friend.image !== "" ? friend.image : null}
                width={75}
                height={75}
                alt="Friend Image"
                className="rounded-full border-2 border-white shadow-sm"
              />
              <span
                className={`h-4 w-4 border rounded-full ${
                  friend.isActive ? "bg-green-500" : "bg-gray-500"
                } absolute bottom-1 right-1`}
              ></span>
            </div>
            <div className="text-2xl ">{friend?.userName || ""}</div>
          </div>
          <div className="flex">
            <button className=" px-3 py-1 rounded-lg  transition">
              <IoCall
                size={30}
                className="w-10 text-purple-500 hover:scale-105 hover:text-purple-600"
              />
            </button>
            <button className=" px-3 py-1 rounded-lg  transition">
              <FaVideo
                size={30}
                className="w-10 text-purple-500 hover:scale-105 hover:text-purple-600"
              />
            </button>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto bg-gray-400 p-4 rounded-sm scrollbar-none overscroll-contain text-black">
          <p>Chat messages will appear here...</p>
        </div>

        <div className="flex items-center gap-3 p-2 bg-gray-800 border-t border-purple-900 font-sans">
          <textarea
            placeholder="Type a message..."
            className="flex-grow h-10 border rounded-xl pl-2 pt-1 text-lg text-slate-200 bg-gray-700 placeholder-gray-400 focus:ring-1 focus:ring-purple-500 outline-none border-purple-500 resize-none overflow-y-auto scrollbar-none scroll-smooth"
          ></textarea>
          <button className="h-10 w-10 flex items-center justify-center rounded-2xl transition">
            <IoSend
              size={24}
              className="text-purple-600 hover:text-purple-800"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default FriendChat;
