"use client";
import FriendCard from "@/components/searched-user/FriendCard";
import axios from "axios";
import { SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    if (!search) {
      toast("Type something!", {
        icon: "🚫",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        position: "bottom-center",
      });
      return;
    }

    if (search.length < 3) {
      toast("Must Be More Than 3 Characters!", {
        icon: "❌",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
        duration: 1000,
      });
      return;
    }
  };

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/allusers`,
          { withCredentials: true }
        );
  
        // console.log(res.data.user);
        setUsers(res.data.user);
      } catch (error) {
        toast(error.response.data.message, {
          icon: "❌",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
          duration: 1000,
        });
  
        console.error(error);
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
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <div className="absolute flex items-center right-2 top-2">
          <button onClick={handleSearch}>
            <SearchIcon size={34} className="text-purple-500" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-4 w-96 h-28">
        {users.length > 0 &&
          users.map((friend) => <FriendCard key={friend._id} {...friend} />)}
      </div>
    </div>
  );
};

export default Search;
