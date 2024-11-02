import React from 'react';

const StartScreen = ({ onStart, onSettings }) => {
  return (
    <div className="start-screen">
      <h1>EchoesAI</h1>
      <button onClick={onStart}>スタート</button>
      <button onClick={onSettings}>設定</button>
    </div>
  );
};

export default StartScreen;
