import RobotProfileImage from '/src/assets/robot.png'
import './ChatbotHeader.css'

export function ChatbotHeader () {
  return (
    <div className="chatbot-header-box">
      <img src={RobotProfileImage} alt="Robot Profile" />
      <div className="chatbot-header-section-1">
        <p> AI Assistant</p>
        <div className="chatbot-header-section-2">
          <div />
          <p>Online</p>
        </div>
      </div>
    </div>
  );
}