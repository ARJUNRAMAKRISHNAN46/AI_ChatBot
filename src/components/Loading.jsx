import React from "react";
import { PiSpinnerBold } from "react-icons/pi";

const Loading = ({ isLoading }) => {
  return (
    <div className="w-[10vw]">
      {isLoading && (
        <div className="flex items-center justify-center">
          <PiSpinnerBold className="spinner text-gray-800 dark:text-gray-400" size={40}  />
        </div>
      )}
    </div>
  );
};

export default Loading;
