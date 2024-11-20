/* eslint-disable react/prop-types */
import { useState } from "react";
import "./ChatBotApp.css";

const ChatBotApp = ({ onGoBack, chats, setChats }) => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState(chats[0]?.messages || []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const sendMessage = () => {
    if (inputValue.trim() === "") return;

    const newMessage = {
      type: "prompt",
      text: inputValue,
      timestamp: new Date().toLocaleTimeString(),
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInputValue("");

    const updatedChats = chats.map((chat, index) => {
      if (index === 0) {
        return { ...chat, messages: updatedMessages };
      }
      return chat;
    });
    setChats(updatedChats);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="chat-app">
      <div className="chat-list">
        <div className="chat-list-header">
          <h2>Chat List</h2>
          <i className="bx bx-edit-alt new-chat"></i>
        </div>
        {chats.map((chat, index) => (
          <div
            key={index}
            className={`chat-list-item ${index === 0 && "active"}`}
          >
            <h4>{chat.id}</h4>
            <i className="bx bx-x-circle"></i>
          </div>
        ))}
      </div>
      <div className="chat-window">
        <div className="chat-title">
          <h3>Chat with AI</h3>
          <i className="bx bx-arrow-back arrow" onClick={onGoBack}></i>
        </div>
        <div className="chat">
          {messages.map((message, index) => (
            <div
              key={index}
              className={message.type === "prompt" ? "prompt" : "response"}
            >
              {message.text}
              <span>{message.timestamp}</span>
            </div>
          ))}

          <div className="typing">Typing...</div>
        </div>
        <form className="msg-form" onSubmit={(e) => e.preventDefault()}>
          <i className="fas fa-face-smile emoji"></i>
          <input
            type="text"
            className="input-msg"
            placeholder="Type a message..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <i className="fas fa-paper-plane" onClick={sendMessage}></i>
        </form>
      </div>
    </div>
  );
};

export default ChatBotApp;
