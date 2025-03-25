import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
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
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { updateGroupListOrder } from "@/lib/redux/features/groupListSlice";

const GroupChat = ({ selectGroup, chatId }) => {
  const messageConatinerRef = useRef();
  const [messages, setMessages] = useState([]);
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeout = useRef(null);
  console.log(chatId);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/group/myMessages/${chatId}`,
          { withCredentials: true }
        );
        setMessages(data?.messages);
      } catch (error) {
        if (error.status) {
          console.log(error.response.data.message);
          setMessages([]);
        }
      }
    };
    if (chatId) {
      getMessages();
    }
  }, [chatId]);
  //socket initialization
  useEffect(() => {
    const newSocket = io("http://localhost:4000", { withCredentials: true });

    if (newSocket) {
      setSocket(newSocket);
    }

    return () => {
      newSocket.disconnect();
      if (typingTimeout.current) clearTimeout(typingTimeout.current);
    };
  }, []);
  //join chat room
  useEffect(() => {
    if (socket && chatId) {
      socket.emit("join-chat", chatId);
    }
  }, [socket, chatId]);

  //receive msg
  useEffect(() => {
    if (socket) {
      socket.on("receive-message", (data) => {
        setMessages((prev) => [...prev, data]);
        dispatch(updateGroupListOrder(data?.chatId));
      });

      socket.on("started-typing", (data) => {
        if (data.chatId === chatId && data.typer !== userInfo._id) {
          setIsTyping(true);
          if (typingTimeout.current) clearTimeout(typingTimeout.current);
          typingTimeout.current = setTimeout(() => {
            setIsTyping(false);
          }, 2000);
        }
      });
    }
    return () => {
      if (socket) {
        socket.off("receive-message");
        socket.off("started-typing");
      }
    };
  }, [socket, isTyping, selectGroup]);
  const handleMessageSent = async (e) => {
    e.preventDefault();
    try {
      const content = e.target.message.value;
      const { data } = await axios.post(
        `http://localhost:4000/group/sendMessage/${chatId}`,
        { content },
        { withCredentials: true }
      );

      setMessages([...messages, data?.sendMessage]);
      e.target.message.value = "";
    } catch (error) {
      if (error.status) {
        console.log(error.response.data.message);
      }
    }
  };
  useEffect(() => {
    if (messageConatinerRef.current) {
      messageConatinerRef.current.scrollTop =
        messageConatinerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

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
        <div className="flex justify-between items-center bg-gray-800/95 backdrop-blur-sm px-6 py-3 shadow-lg border-b border-gray-700 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gray-700 border-2 border-gray-600 flex items-center justify-center overflow-hidden">
                {selectGroup?.groupIcon && selectGroup.groupIcon !== "" ? (
                  <Image
                    src={selectGroup.groupIcon}
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
                  selectGroup?.isActive ? "bg-green-500" : "bg-gray-500"
                } absolute bottom-0 right-0`}
              ></span>
            </div>
            <div className="flex flex-col">
              <div className="text-lg font-semibold text-gray-100">
                {selectGroup?.groupName || "Unknown User"}
              </div>
              <div className="text-xs text-gray-400">
                {selectGroup.isOnline ? "Online" : "Offline"}
              </div>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <button className="p-2 rounded-full hover:bg-primary/90 transition flex justify-center items-center">
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

        <div
          ref={messageConatinerRef}
          className="flex-grow overflow-y-auto bg-gray-900 p-2 md:p-6 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-800"
        >
          <div className="flex flex-col gap-4 max-w-4xl mx-auto">
            {messages.length > 0 ? (
              messages?.map((message, id) => (
                <div
                  key={id}
                  className={`flex ${
                    message?.senderId === userInfo._id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%]  px-2 py-1 rounded-lg rounded-${
                      message?.senderId === userInfo._id ? "br" : "bl"
                    }-none text-gray-100 ${
                      message?.senderId === userInfo._id
                        ? "bg-purple-600 text-white"
                        : "bg-gray-700 border border-gray-600"
                    }`}
                  >
                    <p className="break-words">{message?.content}</p>
                    <span
                      className={`text-[11px] flex justify-between opacity-60 w-full mt-1 ${
                        message.senderId !== userInfo._id
                          ? "text-right"
                          : "text-left"
                      }`}
                    >
                      {message?.senderId !== userInfo._id && (
                        <span>{message.sender}</span>
                      )}
                      <span>
                        {new Date(message.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}{" "}
                      </span>
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-white">
                Start Your Converstion
              </div>
            )}

            {isTyping && (
              <div className="text-gray-500 italic text-sm">Typing...</div>
            )}
          </div>
        </div>

        {/* Chat Input Area */}
        <form action="#" onSubmit={handleMessageSent}>
          <div className="flex items-center gap-3 p-4 bg-gray-800 border-t border-gray-700">
            <input
              name="message"
              placeholder="Type a message..."
              className="flex-grow h-12 px-4 py-2 rounded-xl text-lg text-gray-100 bg-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none border border-gray-600 resize-none scrollbar-none"
              onChange={(e) => {
                socket.emit("user-typing", { chatId, typer: userInfo._id });
              }}
            ></input>
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
