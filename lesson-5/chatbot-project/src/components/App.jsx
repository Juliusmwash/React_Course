import { useEffect, useState } from 'react'
import { Chatbot } from 'supersimpledev'
import dayjs from 'dayjs'

import { ChatInput } from './ChatInput'
import { ChatMessages } from './ChatMessages'
import { ChatbotHeader } from './ChatbotHeader'
import './App.css'

function App() {

  const [isLoading, setIsLoading] = useState(false);

  // Load chat messages from localStorage on first render.
  // If storage is empty or invalid, fall back to the default welcome message.
  const [chatMessages, setChatMessages] = useState(() => {
    const defaultMessages = [{
      message: 'Hello! How can I help you?',
      sender: 'robot',
      id: 'id2',
      time: dayjs().format('h:mm a')
    }];

    try {
      const stored = localStorage.getItem('chatMessages');
      const parsed = stored ? JSON.parse(stored) : null;
      return parsed && parsed.length > 0 ? parsed : defaultMessages;
    } catch (e) {
      return ({
        ...defaultMessages,
        error: e.message
      });
    }
  });

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
    // console.log('Chat messages updated and saved to localStorage:', chatMessages);
  }, [chatMessages]);

  useEffect(() => {
    Chatbot.addResponses({
      'what is your name': 'My name is Supersimpledev Chatbot! I am a chatbot built by the team at Supersimpledev. I am here to help you with any questions you may have about our courses or anything else you may need help with!',
      'what courses do you offer': 'We offer a variety of courses on web development, including React, JavaScript, HTML, CSS, and more! You can check out all of our courses on our website at https://supersimpledev.com/courses',
      'what is react': 'React is a popular JavaScript library for building user interfaces. It was developed by Facebook and is used by many companies around the world to build their web applications. React allows developers to create reusable UI components and manage the state of their applications efficiently.',
      'what is javascript': 'JavaScript is a programming language that is commonly used to create interactive effects within web browsers. It is a versatile language that can be used for both front-end and back-end development. JavaScript allows developers to create dynamic web pages and applications, making it an essential part of modern web development.',
      'what is html': 'HTML stands for HyperText Markup Language. It is the standard markup language used to create web pages. HTML provides the structure and content of a web page, allowing developers to define elements such as headings, paragraphs, images, links, and more. It is the backbone of any website and works in conjunction with CSS and JavaScript to create a complete web experience.',
      'what is css': 'CSS stands for Cascading Style Sheets. It is a stylesheet language used to describe the presentation of a document written in HTML or XML. CSS allows developers to control the layout, colors, fonts, and overall appearance of a web page.'
    })
  }, []);

  return (
    <>
      <ChatbotHeader />
      <ChatMessages
        chatMessages={chatMessages}
        isLoading={isLoading}
      />
      <ChatInput
        chatMessages={chatMessages}
        setChatMessages={setChatMessages}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
    </>
  );
}
export default App
