"use client";
import RequestNotification from "@/components/notification-request/RequestNotification";
import { setNotificationNumber } from "@/lib/redux/features/notificationSlice";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Notification = () => {
  const [friendRequest, setFriendRequest] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllRequest = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/request/allrequest`,
          { withCredentials: true }
        );
        setFriendRequest(res.data.request);
        dispatch(setNotificationNumber(res.data.request.length));
      } catch (error) {
        console.log(error);
      }
    };
    getAllRequest();
  }, []);
  return (
    <div className="h-screen w-screen bg-gray-900 overflow-auto">
      {friendRequest.length !== 0 &&
        friendRequest.map(({ requestId, sender }) => (
          <RequestNotification
            key={sender._id}
            {...sender}
            requestId={requestId}
          />
        ))}
    </div>
  );
};

export default Notification;
