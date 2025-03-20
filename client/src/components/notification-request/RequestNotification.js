import axios from "axios";
import { Check, X } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const RequestNotification = ({
  avatar,
  username,
  isOnline,
  _id,
  requestId,
}) => {
  const [accepted, setAccepted] = useState(false);

  const acceptRequest = async (id) => {
    try {
      const res = await axios.post(
        `http://localhost:4000/request/acceptRequest/${id}`,
        {},
        { withCredentials: true }
      );
      toast.success("Accepted Friend Request");
      setAccepted(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex w-96 items-center justify-between bg-gray-800 p-4 rounded-xl border border-gray-700 hover:border-purple-300 transition-all duration-200">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={avatar || "/api/placeholder/40/40"}
            alt={username || "User"}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span
            className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-800 ${
              isOnline ? "bg-green-500" : "bg-gray-500"
            }`}
          ></span>
        </div>
        <div>
          <h3 className="text-white font-medium">{username || "user1"}</h3>
          <p className="text-gray-400 text-sm">
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>
      <div className="flex gap-1">
        {!accepted && (
          <>
            <button
              onClick={() => acceptRequest(requestId)}
              className="bg-purple-600 hover:bg-purple-600 text-white px-3 py-1 rounded-lg text-sm transition-colors duration-200"
            >
              <Check />
            </button>
            <button
              onClick={() => rejectRequest(requestId)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-sm transition-colors duration-200"
            >
              <X />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RequestNotification;
