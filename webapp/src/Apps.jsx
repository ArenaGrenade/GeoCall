import './App.css';
import { useState, useEffect } from 'react';
import { joinRoom, sendMessage, getMessages } from "./sockets"
import { getMicrophone, stopMicrophone } from './media'

const App = () => {
  const [messages, setMessages] = useState([]);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    getMessages((err, newMessage) => {
      if(err) return;
      setMessages((messages) => [newMessage, ...messages]);
    });
  }, []);

  return (
    <div>
      <ul>
        {messages.map((message) => (
          <li>{ message }</li>
        ))}
      </ul>
      <button onClick={() => sendMessage(1, 'Hello There!')}>
        Send Message
      </button>
      <button onClick={() => joinRoom(1, Math.floor(Math.random() * 10))}>
        Join Room
      </button>
      <div>
        <h3>Audio Call</h3>
        <button onClick={async () => {
          if (audio) setAudio(stopMicrophone(audio)); 
          else { 
            var audio_int = await getMicrophone();
            setAudio(audio_int);
            const audioElement = document.getElementsByTagName('audio')[0];
            audioElement.srcObject = audio_int;
          } }}>
          { audio ? 'Stop microphone' : 'Get microphone input' }
        </button>
        <audio autoPlay controls></audio>
      </div>
    </div>
  );
};

export default App;
