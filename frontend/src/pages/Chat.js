import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Chat() {
  const location = useLocation();
  const { speaker1, speaker2, topic } = location.state || {};
  const [currentSpeaker, setCurrentSpeaker] = useState(speaker1.name);
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");
  const [error, setError] = useState(null);
  const [isChatting, setIsChatting] = useState(true);
  const [messages, setMessages] = useState([]); // メッセージ履歴
  const [isMessageReady, setIsMessageReady] = useState(false); // 初回メッセージの準備フラグ

  useEffect(() => {
    const formattedSpeaker1 = `一人目の話者は${speaker1.name}という名前です。このキャラクターの性格や口癖は次のような感じです。${speaker1.personality}`;
    const formattedSpeaker2 = `二人目の話者は${speaker2.name}という名前です。このキャラクターの性格や口癖は次のような感じです。${speaker2.personality}`;
    const formattedTopic = `今回の話題は${topic}です。`;
    setMessage(formattedSpeaker1 + formattedSpeaker2 + formattedTopic);
    setIsMessageReady(true); // メッセージがセットされたらフラグをtrueにする
  }, []);

  useEffect(() => {
    if (isChatting && isMessageReady) {
      const previousMessage = messages.length > 0 ? messages[messages.length - 1].text : ""; // 最新のメッセージ
      handleSubmit(currentSpeaker, previousMessage);
    }
  }, [currentSpeaker, isChatting, isMessageReady]);

  useEffect(() => {
    if (isChatting && reply) {
      const nextSpeaker = currentSpeaker === speaker1.name ? speaker2.name : speaker1.name;
      setCurrentSpeaker(nextSpeaker);

      // 新しいメッセージを履歴に追加
      setMessages((prevMessages) => [
        ...prevMessages,
        { speaker: currentSpeaker, text: reply },
      ]);
    }
  }, [reply, isChatting]);

  const handleSubmit = async (speaker, previousMessage) => {
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/topic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          currentSpeaker: speaker,
          previousMessage, // 前回のメッセージも含める
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setReply(data.reply);
      } else {
        setError(data.error || "Error occurred while fetching the response");
      }
    } catch (error) {
      setError("Failed to connect to the server");
    }
  };

  const handleStopChat = () => {
    setIsChatting(false);
  };

  return (
    <div>
      <h2>Chat with ChatGPT</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <h3>Conversation:</h3>
        {messages.map((msg, index) => (
          <p key={index}><strong>{msg.speaker}:</strong> {msg.text}</p>
        ))}
      </div>
      <button onClick={handleStopChat}>停止</button>
      {!isChatting && <p style={{ color: 'blue' }}>会話が停止しました。</p>} {/* 停止メッセージ */}
    </div>
  );
}

export default Chat;
