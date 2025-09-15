import React from "react";

function Loading({ message = "Loading..." }) {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-black">
      <div className="flex items-center gap-3">
        <p className="text-white text-2xl font-semibold">{message}</p>
        <div className="loading-spinner"></div>
      </div>
    </div>
  );
}

export default Loading;
