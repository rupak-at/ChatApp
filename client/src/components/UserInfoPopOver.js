import React from 'react'
import { Button } from "@/components/ui/button";
import { BsFillInfoCircleFill } from "react-icons/bs";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
import Image from 'next/image';
import toast from 'react-hot-toast';
import axios from 'axios';
import getFriends from '@/app/api/getFriends';
import { setFriendList } from '@/lib/redux/features/friendListSlice';
import { useDispatch } from 'react-redux';

const UserInfoPopOver = ({friend, chatId}) => {
  const dispatch = useDispatch();

  const handleRemoveFriend = async(chatId) => {
    try {
      const {data} = await axios.delete(`http://localhost:4000/user/remove/${chatId}`,{withCredentials: true});

      if (data) {
        getFriends().then((res) => dispatch(setFriendList(res)));
      }
    } catch (error) {
      if (error.status) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
  };
  return (
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
    <PopoverContent className="w-80 bg-gray-900  border-purple-500">
      <div className="grid gap-4">
        <div className="space-y-2">
          <div className='flex justify-between'>
            <Image
              src={friend.avatar}
              height={50}
              width={50}
              alt="Profile_image"
              className="h-16 w-16 rounded-full border-gray-200"
            />
            <Button onClick={() => handleRemoveFriend(chatId)} className={"bg-red-500 text-slate-100 hover:bg-red-600 transition-colors duration-150"}>Remove</Button>
          </div>
          <div className="w-full border"></div>
          <h4 className="font-medium leading-none text-white ">
            {friend.username}
          </h4>
          <p className="text-sm text-zinc-400">{friend.email}</p>
        </div>
      </div>
    </PopoverContent>
  </Popover>
  )
}

export default UserInfoPopOver