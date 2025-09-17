"use client";
import FriendCard from "@/components/searched-user/FriendCard";
import axios from "axios";
import { SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const searchedUser = users.filter((user) => {
    if (user.username.toLowerCase().includes(search.toLowerCase())) {
      return user;  
    }
  });

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get(
          process.env.NEXT_PUBLIC_URL + "/allusers",
          { withCredentials: true }
        );
  
        // console.log(res.data.user);
        setUsers(res.data.user);
      } catch (error) {
        toast("An error occur");
      }
    }

    getAllUsers();
  }, [])
  return (
    <div className="h-screen flex flex-col items-center gap-4 w-screen bg-gray-900 font-sans overflow-auto">
      <div className="relative w-96 top-4">
        <input
          type="text"
          value={search}
          placeholder="Search..."
          className="w-full h-12 border focus:outline-none focus:border-purple-500 transition-all duration-100 border-purple-500 rounded-2xl pr-10 p-2 text-white text-lg"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="absolute flex items-center right-2 top-2">
            <SearchIcon size={34} className="text-purple-500" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4 mt-4 w-[85%] h-28">
        {searchedUser.length > 0 ?
          searchedUser.map((friend) => <FriendCard key={friend._id} {...friend} />)
          :
          (<div className="text-4xl text-gray-400 w-full text-center">No Users Found</div>)
        }
      </div>
    </div>
  );
};

export default Search;
