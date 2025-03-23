"use client";
import {
  changeFriendListOrder,
  setFriendList,
  updateFriendOnlineStatus,
} from "@/lib/redux/features/friendListSlice";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

const FriendList = ({ onClickFriend, chattingFriend, searchFriend }) => {
  const dispatch = useDispatch();
  const friends = useSelector((state) => state.friendList.friendList);
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get("http://localhost:4000/friend", {
          withCredentials: true,
        });
        dispatch(setFriendList(res.data.Friends));
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, []);

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
    if (socket) {
      socket.on("user-online", (userId) => {
        dispatch(updateFriendOnlineStatus({ userId, isOnline: true }));
      });

      // socket.on("receive-message", (message) => {
      //   console.log("indside list receive message: ", message);
      //   // dispatch(changeFriendListOrder(message?.senderId));
      // });
    }

    return () => {
      if (socket) {
        socket.off("user-online");
        socket.off("receive-message");
      }
    };
  }, [socket]);

  const searchedFriends = friends?.filter((f) => {
    if (f?.friend.username.toLowerCase().includes(searchFriend.toLowerCase())) {
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
    <div className="bg-gray-900 w-96 h-screen font-sans border-r border-gray-800 shadow-lg overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
      <div className="sticky top-0 bg-gray-900 p-3 border-b border-gray-800">
        <h2 className="text-xl font-semibold text-gray-100 px-2">
          Conversations
        </h2>
      </div>

      <div className="flex flex-col py-2">
        {searchedFriends.map(({ friend, chatId }) => (
          <div
            onClick={() => onClickFriend(friend, chatId)}
            key={friend._id}
            className={`flex items-center gap-3 mx-2 p-3 rounded-lg cursor-pointer transition-all ${
              chattingFriend?._id === friend?._id
                ? "bg-gray-950 border-b-2 border-purple-500"
                : "bg-gray-900 hover:bg-gray-800 hover:border-b-2 hover:border-purple-400"
            }`}
          >
            {/* Friend's Image */}
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gray-800 border-2 border-white flex items-center justify-center overflow-hidden shadow-md">
                {friend.avatar ? (
                  <Image
                    src={friend.avatar}
                    height={48}
                    width={48}
                    alt={`${friend.username}'s avatar`}
                    className="rounded-full object-cover h-16 w-16"
                  />
                ) : (
                  <span className="text-xl text-gray-300">👤</span>
                )}
              </div>
              {/* Active Status Indicator */}
              <span
                className={`h-3 w-3 rounded-full absolute border border-gray-900 ${
                  friend.isOnline ? "bg-green-500" : "bg-gray-400"
                } bottom-0 right-1 transform translate-x-1`}
              ></span>
            </div>

            {/* Friend's Name */}
            <div className="flex flex-col flex-1 gap-0.5 truncate">
              <div className="text-base font-medium text-gray-100 truncate">
                {friend.username}
              </div>
              <div className="text-xs text-gray-400 truncate max-w-full">
                {/* {friend.lastMessage || "Start a conversation"} */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendList;
