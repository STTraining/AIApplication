import React, { useState } from 'react';
import StartScreen from './components/StartScreen';
import ChatScreen from './components/ChatScreen';
import SettingsScreen from './components/SettingsScreen';

function App() {
  const [screen, setScreen] = useState('start');
  const [settings, setSettings] = useState({ speaker1: {}, speaker2: {}, topic: '' });

  const goToChat = (newSettings) => {
    setSettings(newSettings);
    setScreen('chat');
  };

  const goToSettings = () => {
    setScreen('settings');
  };

  const goToStart = () => {
    setScreen('start');
  };

  return (
    <div className="App">
      {screen === 'start' && <StartScreen onStart={() => setScreen('chat')} onSettings={goToSettings} />}
      {screen === 'chat' && <ChatScreen settings={settings} onBack={goToStart} />}
      {screen === 'settings' && <SettingsScreen onSave={goToChat} onCancel={goToStart} />}
    </div>
  );
}

export default App;
