import NavBar from "@/components/NavBar";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="w-full h-screen flex">
      <div className="fixed top-0 left-0 h-screen" >
        <NavBar />
      </div>
      <div className="ml-24">{children}</div>
    </div>
  );
};

export default layout;
