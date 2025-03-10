"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { HiMiniChatBubbleBottomCenter } from "react-icons/hi2";
import { FaUserGroup } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const NavBar = () => {
  const navItems = [
    { path: "/message/chat", icon: <HiMiniChatBubbleBottomCenter size={32} /> },
    { path: "/message/group", icon: <FaUserGroup size={32} /> },
  ];
  const pathName = usePathname();

  const handleLogout = ()=>{
    console.log('Logout Request')
  }


  return (
    <div className="h-screen w-20 bg-gray-800 text-white flex flex-col justify-between items-center py-4 border-r-2 border-gray-700">
      <div className="flex flex-col gap-2">
        {navItems.map((nav, id) => (
          <Link
            key={id}
            href={nav.path}
            className={`p-3 rounded-md flex justify-center items-center transition-all ${
              pathName === nav.path
                ? "bg-gray-700 text-purple-500"
                : "text-gray-300 hover:bg-gray-700 hover:text-slate-300"
            }`}
          >
            {nav.icon}
          </Link>
        ))}
      </div>

      <div className="mb-4 flex flex-col gap-2 items-center">
        <Popover className=''>
          <PopoverTrigger asChild>
              <Image
                src={"https://randomuser.me/api/portraits/men/25.jpg"}
                height={30}
                width={30}
                alt="Profile_Image"
                className="h-16 w-16 rounded-full border-2 border-purple-300"
              />
          </PopoverTrigger>
          <PopoverContent className="w-80 bg-zinc-700  border-zinc-900">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none text-slate-200">@rujeshrohan</h4>
                <p className="text-sm text-zinc-400">
                  rojexh@gmail.com
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Button onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export default NavBar;
