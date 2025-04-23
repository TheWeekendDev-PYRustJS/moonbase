import ChatbotGlass from "../components/ChatbotGlass.jsx";
import "../styles.css"; // Import CSS for styling

const Tour = () => {
  return (
      <div className="tour-container">
          {/* Tour Info Banner */}
          <div className="tour-banner">
              <h1>Moonbase Tour</h1>
              <p>Experience the ultimate lunar adventure! Walk on the Moon, visit research stations, and witness
                  breathtaking views of Earth.</p>
          </div>
          <div className="chatbot-wrapper">
              <ChatbotGlass/>
          </div>

      </div>
  );
};

export default Tour;
