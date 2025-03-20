import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { IoCall } from "react-icons/io5";
import { FaVideo } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import UserInfoPopOver from "../UserInfoPopOver";
import toast from "react-hot-toast";

const FriendChat = ({ friend, chatId }) => {
  const messageConatinerRef = useRef();
  const [messages, setMessages] = useState([]);
  const handleMessageSent = async (e) => {
    e.preventDefault();
    const message = e.target.value;
    try {
      const res = await axios.post(
        `http://localhost:4000/user/message/${chatId}`,
        { content: message },
        { withCredentials: true }
      );
      e.target.value = "";
      setMessages([...messages, res.data.sendMessage]);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    console.log(message);
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/user/myMessages/${chatId}`,
          { withCredentials: true }
        );
        console.log(res.data.messages);
        setMessages(res.data.messages);
      } catch (error) {
        setMessages([]);
        console.log(error.response.data.message);
      }
    };
    getMessages();
  }, [chatId]);

  // scroll to bottom to new message
  useEffect(() => {
    if (messageConatinerRef.current) {
      messageConatinerRef.current.scrollTop =
        messageConatinerRef.current.scrollHeight;
    }
  }, [messages]);

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
        <div className="flex justify-between items-center bg-gray-800 px-6 py-4 shadow-lg border-b border-gray-700">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gray-700 border-2 border-gray-600 flex items-center justify-center overflow-hidden">
                {friend?.avatar && friend.avatar !== "" ? (
                  <Image
                    src={friend.avatar}
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
                  friend?.isOnline ? "bg-green-500" : "bg-gray-500"
                } absolute bottom-1 right-1`}
              ></span>
            </div>
            <div className="text-2xl font-semibold text-gray-100">
              {friend?.username || "Unknown User"}
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

            <UserInfoPopOver friend={friend} />
          </div>
        </div>

        <div
          ref={messageConatinerRef}
          className="flex-grow overflow-y-auto bg-gray-800 p-6 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-700"
        >
          <div className="flex flex-col gap-4">
            {messages.length > 0 ? (
              messages?.map((message, id) => (
                <div
                  key={id}
                  className={`flex justify-${
                    message.sender === "You" ? "end" : "start"
                  }`}
                >
                  {message.sender !== "You" && (
                    <div className="flex mt-5 mr-1">
                      <img
                        src={message.avatar}
                        alt="image"
                        className=" h-8 w-8 rounded-full"
                      />
                    </div>
                  )}
                  <div
                    className={`max-w-[70%]  px-2 py-1 rounded-lg rounded-${
                      message.sender === "You" ? "br" : "bl"
                    }-none text-gray-100 ${
                      message.sender === "You" ? "bg-gray-700" : "bg-purple-600"
                    }`}
                  >
                    <p>{message.content}</p>
                    <span className="text-xs text-gray-400 block mt-1">
                      {new Date(message.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-white">
                Start Your Converstion
              </div>
            )}
          </div>
        </div>

        {/* Chat Input Area */}
        <form action="#" onSubmit={handleMessageSent}>
          <div className="flex items-center gap-3 p-4 bg-gray-800 border-t border-gray-700">
            <textarea
              name="message"
              placeholder="Type a message..."
              className="flex-grow h-12 px-4 py-2 rounded-xl text-lg text-gray-100 bg-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none border border-gray-600 resize-none scrollbar-none"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleMessageSent(e);
                }
              }}
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

export default FriendChat;
