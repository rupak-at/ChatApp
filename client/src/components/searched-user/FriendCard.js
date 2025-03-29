import sendFriendRequest from "@/app/api/sendFriendRequest";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const FriendCard = ({ username, avatar, isOnline, _id }) => {

  const [socket , setSocket] = useState(null);
  useEffect(() => {
    const newSocket = io("http://localhost:4000", {
      withCredentials: true,
    });

    if (newSocket) {
      setSocket(newSocket);
    }

    return () => {
      newSocket.disconnect();
    }
  }, [])


  useEffect(()=> {

    if (socket) {

    }
  },[socket])
  const sendRequest =  (id) => {
    console.log(id)
    sendFriendRequest(id).then((res) => {
      toast.success(res);

      if (socket) {
        socket.emit("new-friend-request", id);
      }
    }).catch((e) => {
      toast.error(e);
    })
  };
  return (
    <div className="flex items-center justify-between bg-gray-800 p-4 rounded-xl border border-gray-700 hover:border-purple-500 transition-all duration-200">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={avatar || "/api/placeholder/40/40"}
            alt={username}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 ${
              isOnline ? "bg-green-500" : "bg-gray-500"
            }`}
          ></span>
        </div>
        <div>
          <h3 className="text-white font-medium">{username}</h3>
          <p className="text-gray-400 text-sm">
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      <button
        onClick={() => sendRequest(_id)}
        className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg text-sm transition-colors duration-200"
      >
        Add Friend
      </button>
    </div>
  );
};

export default FriendCard;
