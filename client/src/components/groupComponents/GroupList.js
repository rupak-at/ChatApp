import {
  addGroupList,
  groupRemoveAfterDeletion,
  setGroupList,
  updateGroupListOrder,
  updateLastMessageGroup,
} from "@/lib/redux/features/groupListSlice";
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
    const newSocket = io(`${process.env.NEXT_PUBLIC_URL}`, {
      withCredentials: true,
    });

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
        dispatch(
          updateLastMessageGroup({
            chatId: data?.chatId,
            sender: data?.senderId,
            content: data?.content,
          })
        );
        dispatch(updateGroupListOrder(data?.chatId));
      });

      socket.on("new-group-creation", (data) => {
        //showing to participants only
        if (data.group.participants.map((f) => f._id).includes(userInfo._id)) {
          dispatch(addGroupList(data));
        }
      });

      socket.on("group-deleted", (data) => {
        dispatch(groupRemoveAfterDeletion(data));
      });

      socket.on("member-added", (d) => {
        console.log("New member added:", d);
        if (d?.group?.participants?.some((f) => f._id === userInfo._id)) {
          const chatExists = groupList.some((g) => g?.chatId === d?.chatId);
          if (!chatExists) {
            dispatch(addGroupList(d));
            console.log("Group added to the list");
          } else {
            console.log("Group already exists in the list");
          }
        } else {
          console.log("User is not a participant of the added group");
        }
      });

      socket.on("member-removed", (d) => {
        console.log(d);
        if (userInfo._id === d?.memberID) {
          dispatch(groupRemoveAfterDeletion(d?.groupID));
        }
      });
    }

    return () => {
      if (socket) {
        socket.off("receive-message");
        socket.off("new-group-creation");
        socket.off("group-deleted");
        socket.off("member-added");
        socket.off("member-removed");
      }
    };
  }, [socket, dispatch]);
  useEffect(() => {
    getGroups().then((res) => dispatch(setGroupList(res)));
  }, [dispatch]);

  const searchedGroup = groupList.filter((g) => {
    if (g?.group?.groupName.toLowerCase().includes(searchGroup.toLowerCase())) {
      return g;
    }
  });
  return (
    <div className="bg-gray-900 w-96 h-screen font-sans shadow-lg border-r border-gray-800 flex flex-col">
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 py-2 pb-24">
        {searchedGroup.map(({ group, chatId, lastMessage }) => {
          return (
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
                {/* Group Avatar */}
                <div className="relative">
                  <OverlappingAvatars avatars={group?.avatar} />
                  <span
                    className={`h-3 w-3 border border-gray-900 rounded-full absolute ${
                      group?.participants?.some((f) => f._id === userInfo._id) ? "bg-green-500" : "bg-gray-500"
                    } bottom-0 right-1`}
                  ></span>
                </div>

                {/* Group Name and Last Message */}
                <div className="flex flex-col gap-0.5 flex-1 truncate">
                  <div className="text-base font-medium text-gray-100 truncate">
                    {group?.groupName}
                  </div>
                  {/* Last Message Preview */}
                  <div className="text-sm text-gray-400 truncate max-w-full">
                    {(lastMessage?.sender === userInfo._id ? (
                      <span className="font-bold">
                        You:{" "}
                        <span className="text-xs font-normal">
                          {lastMessage?.content || (lastMessage?.file ? 'File' : "")}
                        </span>
                      </span>
                    ) : (
                      lastMessage?.content || (lastMessage?.file ? 'File' : "")
                    )) || "No messages yet"}
                  </div>
                </div>
              </div>
              <div className="h-0 border border-gray-800"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GroupList;
