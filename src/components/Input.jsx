import React, { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { FiSend } from "react-icons/fi";
import Loading from "../components/Loading";
import ChatHistory from "../components/ChatHistory";

const Input = () => {
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const sendMessage = async () => {
    try {
      setIsLoading(true);
      if (userInput.trim() === "") {
        return;
      }

      const result = await model.generateContent(userInput);
      const response = result.response;
      console.log(response.text());
      setChatHistory([
        ...chatHistory,
        { type: "user", message: userInput },
        { type: "bot", message: response.text() },
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setUserInput("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="bg-white text-gray-800 dark:bg-gray-800 dark:text-white">
      {chatHistory?.length === 0 && (
        <div className=" h-[80vh] flex justify-center items-center">
          <h1>No Chat Histery Yet...</h1>
        </div>
      )}
      {chatHistory.length !== 0 && <ChatHistory chatHistory={chatHistory} />}
      <div className="h-[6vh] mx-2 flex justify-between items-center">
        <input
          className="outline-none border rounded-lg py-2 px-4 w-[90vw] border-gray-400 dark:border-gray-200 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-800"
          type="text"
          value={userInput}
          onKeyDown={handleKeyDown}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask anything with your chatbot"
        />
        {isLoading ? (
          <Loading isLoading={isLoading} />
        ) : (
          <button
            className="w-[10vw] flex justify-center items-center"
            onClick={sendMessage}
          >
            <FiSend className="text-xl text-gray-800 dark:text-gray-200" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
