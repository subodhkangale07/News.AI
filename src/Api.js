import { useState } from "react";
import axios from "axios";

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post("https://www.chatbase.co/api/v1/chat", {
        messages: [...messages, userMessage],
        chatbotId: "Empty text",
        apiKey: "wttj7gp1eon2d51yc4zd0e07dvzn7ycf",
      });

      const botMessage = { role: "bot", content: response.data.message };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error("Error:", error);
    }

    setInput("");
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <p key={index} className={msg.role === "user" ? "user" : "bot"}>
            {msg.content}
          </p>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatBot;