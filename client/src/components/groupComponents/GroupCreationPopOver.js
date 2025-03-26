"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import { Check, CircleMinus, Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const GroupCreationPopOver = () => {
  const { friendList } = useSelector((state) => state.friendList);

  const { register, handleSubmit } = useForm();
  const [selectedFriends, setSelectedFriends] = useState([]);

  const addFriend = (friend) => {
    if (!selectedFriends.some((f) => f._id === friend._id)) {
      setSelectedFriends((prev) => [...prev, friend._id]);
    }
  };

  const onSubmit = async (data) => {
    const name = data.groupName;
    const members = selectedFriends;

    try {
      const { data } = await axios.post(
        "http://localhost:4000/group/makeGroup",
        { name, members },
        { withCredentials: true }
      );
      toast.success("Group Created Successfully");
    } catch (error) {
      if (error.status) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={
            "bg-gray-900 text-white border-none hover:bg-gray-900 hover:text-purple-500 transition-all duration-200"
          }
        >
          <Plus size={30} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 bg-gray-900 border-white text-white">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none text-lg">Create Group</h4>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full">
            <Input
              {...register("groupName", {
                required: true,
                minLength: {
                  value: 3,
                  message: "Group Name must be at least 3 characters long",
                },
              })}
              type="text"
              className="h-8 outline-none focus:outline-none w-full"
              placeholder="Group Name"
            />
            <div className="flex justify-between items-center w-full mt-3">
              <p className="text-lg">Add Member</p>
            </div>
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
                        {selectedFriends.includes(friend._id) ? (
                          <>
                            <Check size={20} className="text-purple-500" />
                            <CircleMinus
                              size={20}
                              className="text-red-500"
                              onClick={() =>
                                setSelectedFriends((prev) =>
                                  prev.filter((f) => f !== friend._id)
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
              Create Group
            </Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default GroupCreationPopOver;
