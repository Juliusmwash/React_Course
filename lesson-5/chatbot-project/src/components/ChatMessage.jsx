import UserProfileImage from '/src/assets/user.png'
import LoadingImage from '/src/assets/loading-spinner.gif'
import RobotProfileImage from '/src/assets/robot.png'

export function ChatMessage({message, sender, isLoading, time}) {
    return (
        <div className={`chat-message-box ${sender}`}>
        {sender === 'robot' && (
            <img src={RobotProfileImage} width="50" alt="Robot Profile" />
        )}
        {isLoading && message === "loading..." ? (
            <img
            src={LoadingImage}
            alt="Loading..."
            />
        ) : (
            <div className="chat-message-time-box">
                <p className="chat-message-text">{message}</p>
                <time className="chat-message-time">{time}</time>
            </div>

        )}
        {sender === 'user' && (
            <img src={UserProfileImage} width="50" alt="User Profile" />
        )}
        </div>
    );
}