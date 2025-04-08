"use client";
import FriendChat from "@/components/friendComponents/FriendChat";
import FriendList from "@/components/friendComponents/FriendList";
import FriendListHeader from "@/components/friendComponents/FriendListHeader";
import { ArrowLeftIcon } from "lucide-react";
import React, { useState } from "react";

const Chat = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [searchFriend, setSearchFriend] = useState("");
  const [chatId, setChatId] = useState("");
  const [openChat, setOpenChat] = useState("");

  const handleFriendSelected = (friend, chatId) => {
    setSelectedFriend(friend);
    setChatId(chatId);
    setOpenChat(chatId);
  };


  return (
    <div className="flex h-screen">
      <div className="flex flex-col h-screen">
        <div className="sticky top-0 ">
          <FriendListHeader
            setSearchFriend={setSearchFriend}
            headerName="Friends"
          />
        </div>
        <div className="overflow-y-auto">
          <FriendList
            onClickFriend={handleFriendSelected}
            chattingFriend={selectedFriend}
            searchFriend={searchFriend}
            openChat={openChat}
          />
        </div>
      </div>
      <div className="md:w-[calc(100vw-464px)] fixed top-0 right-0">
        <FriendChat friend={selectedFriend} chatId={chatId} />
      </div>
      {selectedFriend && (
    <div className="fixed sm:hidden inset-0 z-50 bg-gray-900">
      <button 
        onClick={() => setSelectedFriend(null)} 
        className="absolute top-10  z-50 bg-gray-800 p-2 rounded-full"
      >
        <ArrowLeftIcon className="h-5 w-5 text-white" />
      </button>
      <FriendChat friend={selectedFriend} chatId={chatId} />
    </div>
  )}
    </div>
  );
};

export default Chat;
