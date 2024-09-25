import React, { useEffect, useRef } from "react";
import Markdown from "react-markdown";

const ChatHistory = ({ chatHistory }) => {
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatHistory]);

  return (
    <div className="bg-white px-4 text-gray-800 dark:bg-gray-800 dark:text-white overflow-scroll h-[75vh] scrollbar-hidden">
      {chatHistory?.map((message, index) => (
        <div key={index}>
          {message.type === "user" && <span className="font-bold ">You: </span>}
          <div className="mb-6">
            <Markdown>{message.message}</Markdown>
          </div>
        </div>
      ))}
      <div ref={chatEndRef} />
    </div>
  );
};

export default React.memo(ChatHistory);
