import React, { useEffect, useState } from "react";
import user from "../../public/user.png";
import { MdOutlineLightMode } from "react-icons/md";
import { MdOutlineDarkMode } from "react-icons/md";

const Navbar = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div className="flex items-center h-[8vh] border-b dark:border-gray-200 border-gray-400 justify-between px-2 py-2 dark:bg-gray-800">
      <h1 className="font-bold font-serif dark:text-white text-gray-800">
        ChatBot
      </h1>
      <div className="grid grid-cols-2 gap-1">
        <button
          className="text-xl text-gray-500 border border-gray-500 dark:text-gray-100 dark:border-gray-100 flex justify-center items-center rounded-lg "
          onClick={handleTheme}
        >
          {theme === "dark" ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
        </button>
        <img className="rounded-full w-10 h-10" src={user} alt="userImage" />
      </div>
    </div>
  );
};

export default Navbar;
