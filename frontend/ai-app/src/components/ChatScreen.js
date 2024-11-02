import React, { useState } from 'react';
import axios from 'axios';

const ChatScreen = ({ settings, onBack }) => {
  const [dialogues, setDialogues] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNextDialogue = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/chat', settings);
      console.log(response.data)
      setDialogues([...dialogues, {speaker:"speaker1", message:response.data[0]}]);
    } catch (error) {
      console.error('Error fetching dialogue:', error);
    }
    setLoading(false);
  };

  return (
    <div className="chat-screen">
      <button onClick={onBack}>戻る</button>
      <div className="dialogues">
        {dialogues.map((dialogue, index) => (
          <p key={index}>
            <strong>{dialogue.speaker}:</strong> {dialogue.message}
          </p>
        ))}
      </div>
      <button onClick={fetchNextDialogue} disabled={loading}>
        次の会話
      </button>
    </div>
  );
};

export default ChatScreen;
