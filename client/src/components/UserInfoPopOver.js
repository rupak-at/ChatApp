import React from 'react'
import { Button } from "@/components/ui/button";
import { BsFillInfoCircleFill } from "react-icons/bs";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
import Image from 'next/image';

const UserInfoPopOver = ({friend}) => {
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
          <Image
            src={friend.avatar}
            height={50}
            width={50}
            alt="Profile_image"
            className="h-16 w-16 rounded-full border-gray-200"
          />
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