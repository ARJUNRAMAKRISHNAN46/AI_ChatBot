import React from "react";
import Navbar from "../components/Navbar";
import Input from "../components/Input";

const Home = () => {
  return (
    <div className="w-screen h-screen bg-white text-gray-800 dark:text-white dark:bg-gray-800 lg:px-36">
      <Navbar />
      <Input />
    </div>
  );
};

export default Home;
