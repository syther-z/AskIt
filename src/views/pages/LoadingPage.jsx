import React from "react";
import { Portal } from "../../main"; // same portal wrapper
import { useSelector } from "react-redux";

const LoadingPage = () => {

    const show = useSelector((state) => state.loadingSlice.show);

  return (
    <Portal>
      <div className={`absolute inset-0 w-screen h-screen bg-black/60 flex items-center justify-center z-50`}
      
      style={{
        display: show ? "flex" : "none"
      }}
      
      >
        <div className="bg-white p-6 rounded-xl shadow-lg text-center">
          <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-3"></div>
          <p className="font-semibold">Loading...</p>
        </div>
      </div>
    </Portal>
  );
};

export default LoadingPage;
