import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { IoCall } from "react-icons/io5";
import { FaVideo } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { updateGroupListOrder } from "@/lib/redux/features/groupListSlice";
import OverlappingAvatars from "./GroupOverLapingImage";
import GroupInfoPopOver from "./GroupInfoPopOver";
import toast from "react-hot-toast";

const GroupChat = ({ selectGroup, chatId }) => {
  const messageConatinerRef = useRef();
  const [messages, setMessages] = useState([]);
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeout = useRef(null);

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
        toast.error(error.response.data.message);
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
              <OverlappingAvatars avatars={selectGroup?.avatar}/>
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
                {selectGroup?.participants.length} Members
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

            <GroupInfoPopOver selectGroup={selectGroup} chatId={chatId} />
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
                      className={`text-[11px] flex justify-between opacity-60 w-full mt-1 gap-4 ${
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
