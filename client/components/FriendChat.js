import Image from "next/image";
import React from "react";
import { IoCall } from "react-icons/io5";
import { FaVideo } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";

const FriendChat = ({ friend }) => {
  if (!friend) {
    return (
      <div className="h-screen flex justify-center items-center font-serif bg-gray-900">
        Start Chatting With Friends
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-col h-screen w-full font-serif bg-gray-900 text-white">
        {/* Chat Header */}
        <div className="flex justify-between items-center bg-gray-800 px-4 py-3 border-b-2 border-purple-900 shadow-md h-24">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Image
                src={friend?.image && friend.image !== "" ? friend.image : null}
                width={70}
                height={70}
                alt="Friend Image"
                className="rounded-full border-2 border-white shadow-sm"
              />
              <span
                className={`h-3 w-3 rounded-full ${
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

        {/* Chat Messages Area */}
        <div className="flex-grow overflow-y-auto bg-gray-800 p-4 rounded-sm scrollbar-none overscroll-contain">
          <p className="text-gray-400">Chat messages will appear here...</p>
        </div>

        {/* Message Input */}
        <div className="flex items-center gap-3 p-2 bg-gray-800 border-t border-purple-900  font-sans">
          <textarea
            placeholder="Type a message..."
            className="flex-grow border rounded-xl pl-2 pt-1 text-lg text-slate-200 bg-gray-700 placeholder-gray-400 focus:ring-1 focus:ring-purple-500 outline-none border-purple-500 resize-none overflow-y-auto scrollbar-none scroll-smooth"
          ></textarea>
          <button
            className=" rounded-2xl transition flex items-center justify-center" 
          >
            <IoSend size={50}  className=" text-purple-600 hover:text-purple-800"/>
          </button>
        </div>
      </div>
    </>
  );
};

export default FriendChat;
