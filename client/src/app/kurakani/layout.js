'use client';
import NavBar from "@/components/NavBar";
import socket from "@/lib/socket";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const layout = ({ children }) => {

  const router = useRouter();
  const user = useSelector((state) => state.userInfo.userInfo); 

  useEffect(() => {
    if (user && user._id) {
        socket.emit("login", user._id);
            } else {
      router.push("/login");
    }

    // Handle socket reconnection
    socket.on("connect", () => {
      if (user && user._id) {
        socket.emit("login", user._id);
      }
    });

    // Cleanup when component unmounts
    return () => {
      socket.off("connect");
    };
  }, [user, router]);
  return (
    <div className="w-full h-screen flex">
      <div className="fixed top-0 left-0 h-screen" >
        <NavBar />
      </div>
      <div className="ml-20">{children}</div>
    </div>
  );
};

export default layout;
