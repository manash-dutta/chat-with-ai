import { useState } from "react";
import ChatBotStart from "./Components/ChatBotStart";
import ChatBotApp from "./Components/ChatBotApp";

const App = () => {
  const [isChatting, setIsChatting] = useState(false);
  const [chats, setChats] = useState([]);

  const handleIsChatting = () => {
    setIsChatting(true);

    if (chats.length === 0) {
      const newChat = {
        id: `Chat ${new Date().toLocaleDateString(
          "en-GB"
        )} ${new Date().toLocaleTimeString()}`,
        messages: [],
      };
      setChats([newChat]);
    }
  };

  const handleGoBack = () => {
    setIsChatting(false);
  };

  return (
    <div className="container">
      {isChatting ? (
        <ChatBotApp onGoBack={handleGoBack} chats={chats} setChats={setChats} />
      ) : (
        <ChatBotStart onStartChat={handleIsChatting} />
      )}
    </div>
  );
};

export default App;
