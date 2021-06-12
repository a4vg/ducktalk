import React from "react";

const MainLayout = ({ className, children }) => {
  return (
    <div
      className={`bg-gradient-to-r from-yellow-300 to-yellow-500 w-screen h-screen px-3 portrait:py-14 py-1 md:p-0 ${className}`}
    >
      {children}
      <div className="absolute inset-0 wavy-pattern -z-20"></div>
    </div>
  );
};

export default MainLayout;
