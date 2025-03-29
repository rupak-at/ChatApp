"use client";
import addGroupMember from "@/app/api/addGroupMember";
import getGroups from "@/app/api/getGroups";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { setGroupList } from "@/lib/redux/features/groupListSlice";
import { Check, CircleMinus, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

const AddMembers = ({ chatId }) => {
  const { friendList } = useSelector((state) => state.friendList);
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);

  const { handleSubmit } = useForm();
  const [selectedFriends, setSelectedFriends] = useState([]);

  const addFriend = (friend) => {
    if (!selectedFriends.some((f) => f._id === friend._id)) {
      setSelectedFriends((prev) => [...prev, friend]);
    }
  };

  // useEffect(() => {
  //   const newSocket = io("http://localhost:4000", { withCredentials: true });
  //   if (newSocket) {
  //     setSocket(newSocket);
  //   }
  // }, [])

  // useEffect(() => {
  //   if (socket) {
  //     socket.on("new-member", (data) => {
  //       dispatch(setGroupList(data));
  //     });
  //   }
  // }, [socket]);

  const onSubmit = async (data) => {
    const groupID = chatId;
    const memberID = selectedFriends?.map((f) => f?._id);
    const members = selectedFriends

    addGroupMember(groupID, memberID)
      .then((res) => {
        toast.success(res)

        // if (socket) {
        //   socket.emit("addMember", { groupID, members });
        // }
      })
      .catch((err) => toast.error(err));
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={
            "text-white bg-zinc-700 border-none hover:bg-zinc-600 transition-all duration-300"
          }
        >
          <Plus size={30} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 bg-gray-900 border-white text-white">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none text-2xl">Friends</h4>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <div className="w-full max-h-64 overflow-y-auto">
              {friendList.length > 0
                ? friendList.map(({ friend }) => (
                    <div
                      key={friend._id}
                      className="flex items-center justify-between border-b p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div>
                          <Image
                            src={friend.avatar}
                            height={50}
                            width={50}
                            alt="Profile_image"
                            className="rounded-full h-12 w-12"
                          />
                        </div>
                        <div>{friend.username}</div>
                      </div>
                      <div className="flex gap-2">
                        {selectedFriends.map((f) => f._id).includes(friend._id) ? (
                          <>
                            <Check size={20} className="text-purple-500" />
                            <CircleMinus
                              size={20}
                              className="text-red-500"
                              onClick={() =>
                                setSelectedFriends((prev) =>
                                  prev.filter((f) => f._id !== friend._id)
                                )
                              }
                            />
                          </>
                        ) : (
                          <button
                            type="button"
                            onClick={() => addFriend(friend)}
                          >
                            <Plus size={20} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                : "No Friends Found"}
            </div>
            <Button
              type="submit"
              className="mt-4 bg-purple-500 hover:bg-purple-600 transition-all duration-200"
            >
              Add Member
            </Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AddMembers;
