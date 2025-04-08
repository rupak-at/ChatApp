import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { IoCall } from "react-icons/io5";
import { FaPaperclip, FaVideo } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import UserInfoPopOver from "../UserInfoPopOver";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import {
  changeFriendListOrder,
  updateFriendOnlineStatus,
} from "@/lib/redux/features/friendListSlice";
import { Howl } from "howler";
import { FileText, Loader2 } from "lucide-react";
import Link from "next/link";

const FriendChat = ({ friend, chatId}) => {
  const friends = useSelector((state) => state.friendList.friendList);
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const messageConatinerRef = useRef();
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeout = useRef(null);
  const [file, setFile] = useState([]);
  const [fileUrl, setFileUrl] = useState([]);
  const [sendingMsg, setSendingMsg] = useState(false);

  const selectedFriend = friends.find((f) => f?.friend?._id === friend?._id);
  const isOnline = selectedFriend?.friend?.isOnline;

  const sound = new Howl({
    src: ["/msg.mp3"],
    volume: 0.5,
  });

  //make io connection
  useEffect(() => {
    const newSocket = io("http://localhost:4000", {
      withCredentials: true,
    });

    setSocket(newSocket);

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

  //listen for incoming messages
  useEffect(() => {
    if (socket) {
      socket.on("receive-message", (message) => {
        if (chatId === message.chatId ) {
          setMessages((prev) => [...prev, message]);
        }
        dispatch(changeFriendListOrder(message?.chatId));
        // if (message.sender !== userInfo._id) {
        //   sound.play();
        // }
      });

      socket.on("user-online", (userId) => {
        if (friend?._id === userId) {
          dispatch(updateFriendOnlineStatus({ userId, isOnline: true }));
        }
      });

      socket.on("user-offline", (userId) => {
        if (friend?._id === userId) {
          dispatch(updateFriendOnlineStatus({ userId, isOnline: false }));
        }
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
        socket.off("user-online");
        socket.off("user-offline");
        socket.off("started-typing");
      }
    };
  }, [socket, friend, isTyping]);

  const handleMessageSent = async (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    const data = new FormData();
    if (file.length > 0) {
      file.forEach((f) => {
        data.append("file", f);
      });
    }
    data.append("content", message);
    if (message.trim() || file.length > 0) {
      try {
        setSendingMsg(true);
        const res = await axios.post(
          `http://localhost:4000/user/message/${chatId}`,
          data,
          { withCredentials: true }
        );
        if (res) {
          e.target.message.value = "";
          setFileUrl([]);
          setFile([]);
          setSendingMsg(false);
          // setMessages((prev) => [...prev, res.data.message]);
        }
      } catch (error) {
        toast.error(error.response.data.message);
        setSendingMsg(false);
      }
    }
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/user/myMessages/${chatId}`,
          { withCredentials: true }
        );
        setMessages(res.data.messages);
      } catch (error) {
        setMessages([]);
        // console.log(error.response.data.message);
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
  }, [messages, isTyping, fileUrl]);

  if (!friend) {
    return (
      <div className="h-screen flex w-full justify-center items-center font-sans bg-gray-900">
        Start Chatting With Friends
      </div>
    );
  }

  const handleFile = (e) => {
    console.log("file event was triggered");
    const file = e.target.files[0];
    setFile((prev) => [...prev, file]);
    if (file?.type?.startsWith("image/")) {
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
    } else if (["mp3", "wav", "ogg", "aac", "m4a", "flac"].includes(file.format)) {
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
    } else if (file.resource_type === "video" && ["mp4", "webm", "ogg", "mkv", "mov", "avi", "flv", "wmv", "3gp"].includes(file.format)) {
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
  };

  return (
    <>
      <div className="flex flex-col h-screen w-full font-sans bg-gray-900 text-white">
        {/* Chat Header */}
        <div className="flex justify-between items-center bg-gray-800/95 backdrop-blur-sm px-3 sm:px-6 py-2 sm:py-3 shadow-lg border-b border-gray-700 sticky top-0 z-10">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-700 border-2 border-gray-600 flex items-center justify-center overflow-hidden">
                {friend?.avatar && friend.avatar !== "" ? (
                  <Image
                    src={friend.avatar}
                    width={48}
                    height={48}
                    alt="Friend Image"
                    className="rounded-full object-cover"
                  />
                ) : (
                  <span className="text-xl sm:text-2xl text-gray-300">👤</span>
                )}
              </div>
              <span
                className={`h-2 w-2 sm:h-3 sm:w-3 border-2 border-gray-800 rounded-full ${
                  isOnline ? "bg-green-500" : "bg-gray-500"
                } absolute bottom-0 right-0`}
              ></span>
            </div>
            <div className="flex flex-col">
              <div className="text-base sm:text-lg font-semibold text-gray-100">
                {friend?.username || "Unknown User"}
              </div>
              <div className="text-xs text-gray-400">
                {isOnline ? "Online" : "Offline"}
              </div>
            </div>
          </div>
          <div className="flex gap-1 sm:gap-2 items-center">
            <button className="p-1 sm:p-2 rounded-full hover:bg-gray-700 transition-all duration-200 flex justify-center items-center">
              <IoCall
                size={18}
                className="group-hover:text-purple-400 transition-all duration-200"
              />
            </button>
            <button className="p-1 sm:p-2 rounded-full hover:bg-gray-700 transition-all duration-200 flex justify-center items-center group">
              <FaVideo
                size={18}
                className="text-zinc-200 transition-all duration-200"
              />
            </button>
            <div className="h-6 border-l border-gray-600 mx-1 flex items-center">
              <UserInfoPopOver friend={friend} chatId={chatId} />
            </div>
          </div>
        </div>

        <div
          ref={messageConatinerRef}
          className="flex-grow overflow-y-auto bg-gray-900 p-2 sm:p-4 md:p-6"
        >
          <div className="flex flex-col gap-3 sm:gap-4 max-w-4xl mx-auto">
            {messages.length > 0 ? (
              messages?.map((message, id) => (
                <div
                  key={id}
                  className={`flex justify-${
                    message?.senderId === userInfo?._id ? "end" : "start"
                  }`}
                >
                  {message.senderId !== userInfo._id && (
                    <div className="self-end mt-4 mr-1 sm:mt-5 sm:mr-2">
                      <img
                        src={message.avatar}
                        alt="image"
                        className="h-6 w-6 sm:h-8 sm:w-8 rounded-full"
                      />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] sm:max-w-[70%] px-2 py-1 rounded-lg rounded-${
                      message.senderId === userInfo._id ? "br" : "bl"
                    }-none text-gray-100 ${
                      message.senderId === userInfo._id
                        ? "bg-purple-600 text-white"
                        : "bg-gray-700 border border-gray-600"
                    }`}
                  >
                    {message?.file?.length > 0 && (
                      <div className="mt-2 overflow-hidden">
                        {message.file.map((f) => renderFileContent(f))}
                      </div>
                    )}
                    <p className="break-words text-sm sm:text-base ">
                      {message.content}
                    </p>
                    <span
                      className={`text-[10px] sm:text-[11px] opacity-60 block mt-1 ${
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
              <div className="text-center text-white text-sm sm:text-base">
                Start Your Conversation
              </div>
            )}

            {isTyping && (
              <div className="text-gray-500 italic text-xs sm:text-sm">
                Typing...
              </div>
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
                          className="absolute -top-[8px] -right-1 text-red-500"
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
          <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-4 bg-gray-800 border-t border-gray-700">
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
              className="flex-grow h-10 sm:h-12  px-3 sm:px-4 py-1 sm:py-2 rounded-xl text-base sm:text-lg text-gray-100 bg-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none border border-gray-600 resize-none scrollbar-none relative"
              onChange={(e) => {
                socket.emit("user-typing", {
                  chatId,
                  typer: userInfo._id,
                });
              }}
            />
            {!sendingMsg ? (
              <button
                type="submit"
                className="h-10 w-10 sm:h-12 sm:w-12 flex items-center justify-center rounded-xl bg-purple-600 hover:bg-purple-700 transition"
              >
                <IoSend size={20} className="text-white" />
              </button>
            ) : (
              <Loader2 className="animate-spin h-10 w-10 text-purple-500" />
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default FriendChat;
