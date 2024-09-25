import React from "react";
import Markdown from "react-markdown";

const ChatHistory = ({ chatHistory }) => {
  return (
    <div>
      {chatHistory?.map((message, index) => (
        <div key={index}>
          {message.type === "user" && <span>You: </span>}
          <div>
            <Markdown>{message.message}</Markdown>
          </div>
        </div>
      ))}
    </div>
  );
};

export default React.memo(ChatHistory);
