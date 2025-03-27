import {
  setGroupList,
  updateGroupListOrder,
  updateLastMessageGroup,
} from "@/lib/redux/features/groupListSlice";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import OverlappingAvatars from "./GroupOverLapingImage";
import getGroups from "@/app/api/getGroups";

const GroupList = ({ handleGroupSelect, searchGroup, selectGroup }) => {
  const { userInfo } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const { groupList } = useSelector((state) => state.groupList);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:4000", { withCredentials: true });

    if (newSocket) {
      setSocket(newSocket);
    }

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket && groupList) {
      groupList.forEach((g) => {
        socket.emit("join-chat", g?.chatId);
      });
    }
  }, [socket, groupList]);

  useEffect(() => {
    if (socket) {
      socket.on("receive-message", (data) => {
        console.log(data);
        dispatch(
          updateLastMessageGroup({
            chatId: data?.chatId,
            sender: data?.senderId,
            content: data?.content,
          })
        );
        dispatch(updateGroupListOrder(data?.chatId));
      });
    }
  }, [socket]);
  useEffect(() => {
    getGroups().then((res) => dispatch(setGroupList(res)));
  }, [dispatch]);

  const searchedGroup = groupList.filter((g) => {
    if (g?.group?.groupName.toLowerCase().includes(searchGroup.toLowerCase())) {
      return g;
    }
  });
  return (
    <div className="bg-gray-900 w-96 h-screen font-sans shadow-lg border-r border-gray-800 overflow-y-auto scrollbar-none">
      <div className="flex flex-col py-2 pt-4">
        {searchedGroup.map(({ group, chatId, lastMessage }) => (
          <div key={group?._id} className="flex flex-col">
            <div
              onClick={() => handleGroupSelect(group, chatId)}
              key={group?._id}
              className={`flex items-center gap-3 p-3 mx-[2px] rounded-lg cursor-pointer transition-all ${
                selectGroup?._id === group?._id
                  ? "bg-gray-950 border-b-2 border-purple-500"
                  : "bg-gray-900 hover:bg-gray-800 hover:border-b-2 hover:border-purple-400"
              }`}
            >
              {/* Friend's Image */}
              <div className="relative">
              <OverlappingAvatars avatars={group?.avatar} />
                {/* <div className="w-12 h-12 rounded-full bg-gray-800 border-2 border-white flex items-center justify-center overflow-hidden shadow-md">
                  {group.avatar ? (
                    <Image
                      src={group.groupIcon}
                      height={48}
                      width={48}
                      alt="Friend's Image"
                      className="rounded-full object-cover h-16 w-16"
                    />
                  ) : (
                    <span className="text-xl text-gray-300">👤</span>
                  )}
                </div> */}
                {/* Active Status Indicator */}
                <span
                  className={`h-3 w-3 border border-gray-900 rounded-full absolute ${
                    group?.isActive ? "bg-green-500" : "bg-gray-500"
                  } bottom-0 right-1`}
                ></span>
              </div>

              {/* Friend's Name */}
              <div className="flex flex-col gap-0.5 truncate">
                <div className="text-base font-medium text-gray-100 truncate">
                  {group?.groupName}
                </div>
                {/* Optional: Last Message Preview */}
                <div className="text-sm text-gray-400 truncate max-w-full">
                  {(lastMessage?.sender === userInfo._id ? (
                    <span className="font-bold">
                      You:{" "}
                      <span className="text-xs font-normal">
                        {lastMessage?.content}
                      </span>
                    </span>
                  ) : (
                    lastMessage?.content
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

export default GroupList;
