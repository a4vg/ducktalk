import React from "react";

const MainLayout = ({ className, children }) => {
  return (
    <div
      className={`flex bg-gradient-to-r from-yellow-300 to-yellow-500 w-screen h-screen px-3 portrait:py-14 md:p-0 ${className}`}
    >
      <div className="relative bg-white rounded-xl mx-auto md:ml-20 my-auto px-3 py-8 flex flex-col z-10 w-96 h-full md:h-3/5 justify-center">
        <div className="fade-transition">{children}</div>
      </div>
      <div className="absolute inset-0 wavy-pattern -z-20"></div>
    </div>
  );
};

export default MainLayout;
