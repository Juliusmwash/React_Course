import { useRef, useEffect } from 'react'
import { ChatMessage } from './ChatMessage'
import './ChatMessages.css'

function useAutoScroll(chatMessages) {
  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages]);
  return (chatMessagesRef);
}

export function ChatMessages({chatMessages, isLoading}) {
    const chatMessagesRef = useAutoScroll(chatMessages);

  return (
    <div
    className="chat-messages-container"
    ref={chatMessagesRef}>
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage
          message={chatMessage.message}
          sender={chatMessage.sender}
          time={chatMessage.time}
          key={chatMessage.id}
          isLoading={isLoading}
          />
        );
      })}
    </div>
  );
}
