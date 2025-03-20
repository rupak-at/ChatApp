'use client'
import RequestNotification from "@/components/notification-request/RequestNotification";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Notification = () => {
    const [friendRequest, setFriendRequest] = useState([])

    useEffect(()=>{
        const getAllRequest = async() => {
            try {
                const res = await axios.get(`http://localhost:4000/request/allrequest`, {withCredentials: true})
                console.log(res.data)
                setFriendRequest(res.data.request)
            } catch (error) {
                console.log(error)
            }
        }
        getAllRequest()
    },[])
  return (
    <div className="h-screen w-screen bg-gray-900 overflow-auto">
        { friendRequest.length !==0 && friendRequest.map(({requestId, sender})=>(
            <RequestNotification key={sender._id} {...sender} requestId={requestId}/>
        ))}
    </div>
  );
};

export default Notification;
