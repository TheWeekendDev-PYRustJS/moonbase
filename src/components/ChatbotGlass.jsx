import { useState } from "react";
import "../chatbotglass.css"; // Make sure this CSS contains your glassmorphism code

const ChatbotGlass = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Welcome to Moonbase Alpha! How can I assist you?" },
  ]);
  const [userInput, setUserInput] = useState("");

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const userMsg = { sender: "user", text: userInput };
    setMessages((prev) => [...prev, userMsg]);

    try {
      const res = await fetch("http://127.0.0.1:5000/Tour", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await res.json();
      const botMsg = { sender: "bot", text: data.reply };
      setMessages((prev) => [...prev, botMsg]);
    } catch  {
      const errorMsg = { sender: "bot", text: "⚠️ Error connecting to server." };
      setMessages((prev) => [...prev, errorMsg]);
    }

    setUserInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="glass-chat">
      {/* Header */}
      <div className="glass-header">
        <div className="glass-avatar">🤖</div>
        <div className="glass-title">
          <p className="glass-name">Moonbot</p>
          <p className="glass-status">Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="glass-messages">
        {messages.map((msg, idx) => (
          <div key={idx} className={`glass-message ${msg.sender}`}>
            <p className="glass-message-text">{msg.text}</p>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="glass-input-box">
        <input
          className="glass-input"
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
        />
        <button className="glass-send" onClick={handleSend}>
          ➤
        </button>
      </div>
    </div>
  );
};

export default ChatbotGlass;
