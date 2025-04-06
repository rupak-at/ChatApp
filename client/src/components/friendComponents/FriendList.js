"use client";
import getFriends from "@/app/api/getFriends";
import {
  addFriendFromSocket,
  changeFriendListOrder,
  removeFriendFromSocket,
  setFriendList,
  updateFriendOnlineStatus,
  updateLastMessage,
} from "@/lib/redux/features/friendListSlice";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

const FriendList = ({ onClickFriend, chattingFriend, searchFriend }) => {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.friendList.friendList);
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    getFriends().then((res) => dispatch(setFriendList(res)));
  }, [dispatch]);

  useEffect(() => {
    const newSocket = io("http://localhost:4000", {
      withCredentials: true,
    });

    if (newSocket) {
      setSocket(newSocket);
    }
    return () => newSocket.disconnect();
  }, []);

  useEffect(() => {
    if (socket && friends) {
      //to update chat list as per msg received
      friends.forEach((f) => {
        socket.emit("join-chat", f?.chatId);
      });
    }
  }, [socket, friends]);
  useEffect(() => {
    if (socket) {
      socket.on("user-online", (userId) => {
        dispatch(updateFriendOnlineStatus({ userId, isOnline: true }));
      });

      socket.on("receive-message", (message) => {
        dispatch(
          updateLastMessage({ chatId: message?.chatId, lastMessage: message })
        );
        dispatch(changeFriendListOrder(message?.chatId));
      });

      socket.on("new-friend", (d) => {
        if (d.senderId === userInfo._id) {
          dispatch(addFriendFromSocket(d));
        }
      });

      socket.on("unfriend", (chatId) => {
        dispatch(removeFriendFromSocket(chatId));
      });
    }

    return () => {
      if (socket) {
        socket.off("user-online");
        socket.off("receive-message");
        socket.off("new-friend");
        socket.off("unfriend");
      }
    };
  }, [socket]);

  const searchedFriends = friends?.filter((f) => {
    if (
      f?.friend?.username.toLowerCase().includes(searchFriend.toLowerCase())
    ) {
      return f;
    }
  });

  if (friends === null) {
    return (
      <div className="bg-gray-900 w-96 h-screen font-sans border-r shadow-lg overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
        <div className="flex flex-col"> </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 w-full sm:w-80 md:w-96 h-screen font-sans border-r border-gray-800 shadow-lg overflow-y-auto">
      <div className="flex flex-col py-2 pb-5 h-screen overflow-auto">
        {searchedFriends.map(({ friend, chatId, lastMessage }) => (
          <div key={friend._id} className="flex flex-col">
            <div
              onClick={() => onClickFriend(friend, chatId)}
              key={friend._id}
              className={`flex items-center gap-2 md:gap-3 mx-[1px] p-2 md:p-3 rounded-lg cursor-pointer transition-all ${
                chattingFriend?._id === friend?._id
                  ? "bg-gray-950 border-b-2 border-purple-500"
                  : "bg-gray-900 hover:bg-gray-800 hover:border-b-2 hover:border-purple-400"
              }`}
            >
              {/* Friend's Image */}
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-800 border-2 border-white flex items-center justify-center overflow-hidden shadow-md">
                  {friend?.avatar ? (
                    <Image
                      src={friend.avatar}
                      height={48}
                      width={48}
                      alt={`${friend.username}'s avatar`}
                      className="rounded-full object-cover h-full w-full"
                    />
                  ) : (
                    <span className="text-lg sm:text-xl text-gray-300">👤</span>
                  )}
                </div>
                {/* Active Status Indicator */}
                <span
                  className={`h-2 w-2 sm:h-3 sm:w-3 rounded-full absolute border border-gray-900 ${
                    friend?.isOnline ? "bg-green-500" : "bg-gray-400"
                  } bottom-0 right-0 sm:right-1 transform translate-x-1`}
                ></span>
              </div>

              {/* Friend's Name */}
              <div className="flex flex-col flex-1 gap-0.5 truncate">
                <div className="text-sm sm:text-base font-medium text-gray-100 truncate">
                  {friend?.username}
                </div>
                <div className="text-xs text-gray-400 truncate max-w-full">
                  {((lastMessage?.senderId ||
                    lastMessage?.sender.toString()) === userInfo._id ? (
                    <span className="font-bold">
                      You:{" "}
                      <span className="text-xs font-normal">
                        {lastMessage?.content || (lastMessage?.file ? "File" : "")}
                      </span>
                    </span>
                  ) : (
                    lastMessage?.content || (lastMessage?.file ? "File" : "")
                  )) || "No messages yet"}
                </div>
              </div>
            </div>
            <div className="h-0 border border-gray-800"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendList;
