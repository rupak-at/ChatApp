import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { IoCall } from "react-icons/io5";
import { FaVideo } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import UserInfoPopOver from "../UserInfoPopOver";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const FriendChat = ({ friend, chatId }) => {
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const messageConatinerRef = useRef();
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  //make io connection
  useEffect(() => {
    const newSocket = io("http://localhost:4000", {
      withCredentials: true,
    });

    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, []);
  //join chat room
  useEffect(() => {
    if (socket && chatId) {
      socket.emit("join-chat", chatId);
    }
  }, [socket, chatId]);

  //listen for incoming messages
  useEffect(() => {
    if (socket) {
      socket.on("receive-message", (message) => {
        setMessages((prev) => [...prev, message]);
      });
    }

    return () => {
      if (socket) {
        socket.off("receive-message");
      }
    };
  }, [socket]);

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
        <div className="flex justify-between items-center bg-gray-800/95 backdrop-blur-sm px-6 py-3 shadow-lg border-b border-gray-700 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gray-700 border-2 border-gray-600 flex items-center justify-center overflow-hidden">
                {friend?.avatar && friend.avatar !== "" ? (
                  <Image
                    src={friend.avatar}
                    width={48}
                    height={48}
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
                } absolute bottom-0 right-0`}
              ></span>
            </div>
            <div className="flex flex-col">
              <div className="text-lg font-semibold text-gray-100">
                {friend?.username || "Unknown User"}
              </div>
              <div className="text-xs text-gray-400">
                {friend?.isOnline ? "Online" : "Offline"}
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <button className="p-2 rounded-full hover:bg-gray-700 transition-all duration-200 flex justify-center items-center">
              <IoCall
                size={20}
                className="group-hover:text-purple-400 transition-all duration-200"
              />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-700 transition-all duration-200 flex justify-center items-center group">
              <FaVideo
                size={20}
                className="text-zinc-200  transition-all duration-200"
              />
            </button>
            <div className="h-6 border-l border-gray-600 mx-1 flex items-center">
              <UserInfoPopOver friend={friend} />
            </div>
          </div>
        </div>

        <div
          ref={messageConatinerRef}
          className="flex-grow overflow-y-auto bg-gray-900 p-2 md:p-6 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-800"
        >
          <div className="flex flex-col gap-4 max-w-4xl mx-auto">
            {messages.length > 0 ? (
              messages?.map((message, id) => (
                <div
                  key={id}
                  className={`flex justify-${
                    message?.senderId === userInfo?._id ? "end" : "start"
                  }`}
                >
                  {message.senderId !== userInfo._id && (
                    <div className="self-end mt-5 mr-2">
                      <img
                        src={message.avatar}
                        alt="image"
                        className=" h-8 w-8 rounded-full"
                      />
                    </div>
                  )}
                  <div
                    className={`max-w-[70%]  px-2 py-1 rounded-lg rounded-${
                      message.senderId === userInfo._id ? "br" : "bl"
                    }-none text-gray-100 ${
                      message.senderId === userInfo._id
                        ? "bg-purple-600 text-white"
                        : "bg-gray-700 border border-gray-600"
                    }`}
                  >
                    <p className="break-words">{message.content}</p>
                    <span
                      className={`text-[11px] opacity-60 block mt-1 ${
                        message.senderId !== userInfo._id
                          ? "text-right"
                          : "text-left"
                      }`}
                    >
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
