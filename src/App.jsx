import React, { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatHistory from "./components/ChatHistory";
import Loading from "./components/Loading";

const App = () => {
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const [theme, setTheme] = useState("light");

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleTheme = () => {
    console.log(theme, "=-------------------------");
    
    setTheme(theme === "dark" ? "light" : "dark");
  };

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

  return (
    <div className="w-screen h-screen bg-white text-gray-800 dark:text-white dark:bg-gray-800">
      {chatHistory.length !== 0 && <ChatHistory chatHistory={chatHistory} />}
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Ask anything with your chatbot"
      />
      {isLoading ? (
        <Loading isLoading={isLoading} />
      ) : (
        <button onClick={sendMessage}>Send</button>
      )}
      <button onClick={handleTheme}>change</button>
    </div>
  );
};

export default App;
