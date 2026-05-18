import { useState, useEffect, useRef} from 'react'
import { Chatbot } from 'supersimpledev'
import dayjs from 'dayjs'
import SendImage from '/src/assets/send.jpg'
import './ChatInput.css'

export function ChatInput({chatMessages, setChatMessages, isLoading, setIsLoading}) {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [chatMessages]);

  const [inputText, setInputText] = useState('');
  // const [isLoading, setIsLoading] = useState(false);

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  async function sendMessage() {

    // Prevent empty messages
    if (inputText.trim() === '') {
      return;
    }

    // Prevent sending while waiting
    if (isLoading) {
      return;
    }

    setIsLoading(true);

    const currentInput = inputText;

    const userMessage = {
      message: currentInput,
      sender: 'user',
      id: crypto.randomUUID(),
      time: dayjs().format('h:mm a')
    };

    const loadingId = crypto.randomUUID();

    const loadingMessage = {
      message: "loading...",
      sender: 'robot',
      id: loadingId,
      time: dayjs().format('h:mm a')
    };

    // Clear input immediately
    setInputText('');

    // Add user + loading messages
    setChatMessages((prev) => [
      ...prev,
      userMessage,
      loadingMessage
    ]);

    try {

      const response = await Chatbot.getResponseAsync(currentInput);

      // Remove loading and add actual response
      setChatMessages((prev) => [
        ...prev.filter((msg) => msg.id !== loadingId),
        {
          message: response,
          sender: 'robot',
          id: crypto.randomUUID(),
          time: dayjs().format('h:mm a')
        }
      ]);

    } catch (error) {

      // Remove loading and show error
      setChatMessages((prev) => [
        ...prev.filter((msg) => msg.id !== loadingId),
        {
          message: `Something went wrong. ${error.message}`,
          sender: 'robot',
          id: crypto.randomUUID(),
          time: dayjs().format('h:mm a')
        }
      ]);

    } finally {

      setIsLoading(false);

    }
  }

  return (
    <div className="chat-input-container">
      <div className="chat-input-button-box">
        <input
          placeholder="Send a message to Chatbot"
          size="30"
          onChange={saveInputText}
          ref={inputRef}
          onKeyDown={(event) => {

            if (
              event.key === "Enter" &&
              !isLoading
            ) {
              sendMessage();
            }

            if (event.key === "Escape") {
              setInputText("");
            }

          }}
          value={inputText}
          disabled={isLoading}
        />

        <button
          onClick={sendMessage}
          disabled={isLoading || inputText.trim() === ''}
        >
          <img
            src={SendImage}
            width="50px"
            height="50px"
          />
        </button>
        <button className="clear-button"
          onClick={() => {
            setInputText('');
            setChatMessages([]);
          }}
          disabled={isLoading}
        >
          Clear Chat
        </button>
      </div>

    </div>
  );
}