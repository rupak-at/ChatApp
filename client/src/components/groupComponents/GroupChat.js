import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { IoCall } from "react-icons/io5";
import { FaPaperclip, FaVideo } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { updateGroupListOrder } from "@/lib/redux/features/groupListSlice";
import OverlappingAvatars from "./GroupOverLapingImage";
import GroupInfoPopOver from "./GroupInfoPopOver";
import toast from "react-hot-toast";
import { FileText, Loader2 } from "lucide-react";
import Link from "next/link";

const GroupChat = ({ selectGroup, chatId }) => {
  const messageConatinerRef = useRef();
  const [messages, setMessages] = useState([]);
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeout = useRef(null);
  const [file, setFile] = useState([]);
  const [fileUrl, setFileUrl] = useState([]);
  const [sendingMsg, setSendingMsg] = useState(false);

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
    setSendingMsg(true);
    const content = e.target.message.value;
    const data = new FormData();
    
    if (file.length > 0) {
      file.forEach((f) => {
        data.append("file", f);
      });
    }
    data.append("content", content);
    
    if (content.trim() || file.length > 0) {
      try {
        const res = await axios.post(
          `http://localhost:4000/group/sendMessage/${chatId}`,
          data,
          { withCredentials: true }
        );
        if (res) {
          // setMessages((prev) => [...prev, res?.data?.sendMessage]);
          setSendingMsg(false);
          setFileUrl([]);
          setFile([]);
          e.target.message.value = "";
          
        }
      } catch (error) {
        if (error.status) {
          toast.error(error.response.data.message);
          console.log(error.response.data.message);
          setSendingMsg(false);
        }
      }
    }
  };
  useEffect(() => {
    if (messageConatinerRef.current) {
      messageConatinerRef.current.scrollTop =
        messageConatinerRef.current.scrollHeight;
    }
  }, [messages, isTyping, fileUrl]);

  if (!selectGroup) {
    return (
      <div className="h-screen flex justify-center items-center font-sans bg-gray-900">
        Start Chatting With Friends
      </div>
    );
  }

  const handleFile = (e) => {
    console.log("file event was triggered");
    const file = e.target.files[0];
    setFile((prev) => [...prev, file]);
    if (file.type.startsWith("image/")) {
      setFileUrl((prev) => [...prev, URL.createObjectURL(file)]);
    } else {
      setFileUrl((prev) => [...prev, file.name]);
    }
  };
  const handleRemoveFile = (index) => {
    setFile((prev) => prev.filter((_, i) => i !== index));
    setFileUrl((prev) => prev.filter((_, i) => i !== index));
  };

  const renderFileContent = (file) => {
    if (file.url) {
      if (file.resource_type === "raw") {
        return (
          <Link
            key={file.asset_id}
            target="_blank"
            href={file.url}
            className="flex items-center gap-2 p-2 bg-gray-800 rounded-lg border border-gray-600 hover:bg-gray-700 transition-colors mb-2 max-w-xs"
          >
            <FileText size={16} className="text-red-400" />
            <span className="text-sm text-white truncate">
              {file.original_filename}
            </span>
          </Link>
        );
      } else if (
        ["mp3", "wav", "ogg", "aac", "m4a", "flac"].includes(file.format)
      ) {
        return (
          <div className="mb-2 w-full" key={file.asset_id}>
            <audio
              controls
              className="rounded-md"
              style={{ height: "40px" }}
            >
              <source src={file.url} />
            </audio>
          </div>
        );
      } else if (
        file.resource_type === "video" &&
        ["mp4", "webm", "ogg", "mkv", "mov", "avi", "flv", "wmv", "3gp"].includes(
          file.format
        )
      ) {
        return (
          <div
            className="mb-2 rounded-lg overflow-hidden max-w-xs"
            key={file.asset_id}
          >
            <video
              key={file.asset_id}
              src={file.url}
              controls
              className="w-full h-auto rounded-lg"
              preload="metadata"
            />
          </div>
        );
      } else {
        // Image
        return (
          <Link
            key={file.asset_id}
            target="_blank"
            href={file.url}
            className="block mb-2"
          >
            <Image
              src={file.url}
              height={200}
              width={300}
              alt="Shared image"
              className="rounded-lg border border-gray-600 hover:opacity-90 transition-opacity max-w-xs"
              style={{ objectFit: "cover" }}
            />
          </Link>
        );
      }
    }
  };
  return (
    <>
      <div className="flex flex-col h-screen w-full font-sans bg-gray-900 text-white">
        {/* Chat Header */}
        <div className="flex justify-between items-center bg-gray-800/95 backdrop-blur-sm px-6 py-3 shadow-lg border-b border-gray-700 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <div className="relative">
              <OverlappingAvatars avatars={selectGroup?.avatar} />
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
                    {message?.file?.length > 0 && (
                      <div className="mt-2 overflow-hidden">
                        {message.file.map((f) => renderFileContent(f))}
                      </div>
                    )}
                    <p className="break-words">{message?.content}</p>
                    <span
                      className={`text-[11px] flex justify-between opacity-60 w-full mt-1 gap-4 ${
                        message?.senderId !== userInfo._id
                          ? "text-right"
                          : "text-left"
                      }`}
                    >
                      {message?.senderId !== userInfo._id && (
                        <span>{message?.sender}</span>
                      )}
                      <span>
                        {new Date(message?.createdAt).toLocaleTimeString([], {
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
            {fileUrl.length > 0 && (
              <div className="w-full flex flex-wrap gap-2 justify-center">
                {fileUrl.map((f, id) => {
                  if (typeof f === "string" && f.startsWith("blob:")) {
                    return (
                      <span key={id} className="relative">
                        <Image
                          src={f}
                          width={100}
                          height={100}
                          alt="file"
                          style={{ objectFit: "cover" }}
                        />
                        <button
                          onClick={() => handleRemoveFile(id)}
                          className="absolute -top-[8px] -right-1 text-red-500 text-xs"
                        >
                          X
                        </button>
                      </span>
                    );
                  } else {
                    return (
                      <span key={id} className="relative">
                        <div key={id} className="text-gray-500 ">
                          {f}
                        </div>
                        <button
                          onClick={() => handleRemoveFile(id)}
                          className="absolute -top-3 -right-2 text-red-500"
                        >
                          X
                        </button>
                      </span>
                    );
                  }
                })}
              </div>
            )}
          </div>
        </div>

        {/* Chat Input Area */}
        <form action="#" onSubmit={handleMessageSent}>
          <div className="flex items-center gap-3 p-4 bg-gray-800 border-t border-gray-700">
            <label htmlFor="file">
              <input
                type="file"
                id="file"
                className="hidden"
                onChange={(e) => handleFile(e)}
              />
              <FaPaperclip />
            </label>
            <input
              name="message"
              placeholder="Type a message..."
              className="flex-grow h-12 px-4 py-2 rounded-xl text-lg text-gray-100 bg-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none border border-gray-600 resize-none scrollbar-none"
              onChange={(e) => {
                socket.emit("user-typing", { chatId, typer: userInfo._id });
              }}
            ></input>
            {
              !sendingMsg ? (
                <button
              type="submit"
              className="h-12 w-12 flex items-center justify-center rounded-xl bg-purple-600 hover:bg-purple-700 transition"
            >
              <IoSend size={24} className="text-white" />
            </button>
              ) : (
                <Loader2 className="h-5 w-5 animate-spin text-purple-500"/>
              )
            }
          </div>
        </form>
      </div>
    </>
  );
};

export default GroupChat;
