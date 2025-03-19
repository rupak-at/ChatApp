import Image from "next/image";
import React from "react";
import { IoCall } from "react-icons/io5";
import { FaVideo } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const GroupChat = ({ selectGroup }) => {
  const handleMessageSent = (e) => {
    e.preventDefault();
    console.log(e.target.message.value);
  };

  if (!selectGroup) {
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
        <div className="flex justify-between items-center bg-gray-800 px-6 py-4 shadow-lg border-b border-gray-700">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gray-700 border-2 border-gray-600 flex items-center justify-center overflow-hidden">
                {selectGroup?.groupIcon && selectGroup.groupIcon !== "" ? (
                  <Image
                    src={selectGroup.groupIcon}
                    width={64}
                    height={64}
                    alt="Friend Image"
                    className="rounded-full object-cover"
                  />
                ) : (
                  <span className="text-2xl text-gray-300">👤</span>
                )}
              </div>
              <span
                className={`h-3 w-3 border-2 border-gray-800 rounded-full ${
                  selectGroup?.isActive ? "bg-green-500" : "bg-gray-500"
                } absolute bottom-1 right-1`}
              ></span>
            </div>
            <div className="text-2xl font-semibold text-gray-100">
              {selectGroup?.groupName || "Unknown User"}
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <button className="px-3 py-2 rounded-md hover:bg-primary/90 transition flex justify-center items-center">
              <IoCall
                size={22}
                className="text-zinc-200  transition-all duration-200"
              />
            </button>
            <button className="px-3 py-2 rounded-md hover:bg-primary/90 transition flex justify-center items-center">
              <FaVideo
                size={22}
                className="text-zinc-200  transition-all duration-200"
              />
            </button>

            <Popover>
              <PopoverTrigger asChild>
                <Button className="bg-gray-800 border-none">
                  {" "}
                  <BsFillInfoCircleFill
                    size={23}
                    className="text-zinc-200  transition-all duration-200"
                  />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-zinc-700  border-zinc-900">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Image
                      src={selectGroup.groupIcon}
                      height={50}
                      width={50}
                      alt="Profile_image"
                      className="h-16 w-16 rounded-full border-gray-200"
                    />
                    <div className="w-full border"></div>
                    <h4 className="font-medium leading-none text-white ">
                      {selectGroup.groupName}
                    </h4>
                    <Button className="text-sm text-slate-200 bg-red-500 hover:bg-red-600 transition-all duration-300">
                      Leave
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto bg-gray-800 p-6 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-700">
          <div className="flex flex-col gap-4">
            {/* Example Chat Message */}
            <div className="flex justify-start">
              <div className="max-w-[70%] bg-gray-700 p-3 rounded-lg rounded-bl-none text-gray-100">
                <p>Hello! How are you?</p>
                <span className="text-xs text-gray-400 block mt-1">
                  10:15 AM
                </span>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="max-w-[70%] bg-purple-600 p-3 rounded-lg rounded-br-none text-gray-100">
                <p>I'm good, thanks! How about you?</p>
                <span className="text-xs text-gray-300 block mt-1">
                  10:16 AM
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Input Area */}
        <form action="#" onSubmit={handleMessageSent}>
          <div className="flex items-center gap-3 p-4 bg-gray-800 border-t border-gray-700">
            <textarea
              name="message"
              placeholder="Type a message..."
              className="flex-grow h-12 px-4 py-2 rounded-xl text-lg text-gray-100 bg-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none border border-gray-600 resize-none scrollbar-none"
            ></textarea>
            <button
              type="submit"
              className="h-12 w-12 flex items-center justify-center rounded-xl bg-purple-600 hover:bg-purple-700 transition"
            >
              <IoSend size={24} className="text-white" />
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default GroupChat;
