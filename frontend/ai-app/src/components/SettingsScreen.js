import React, { useState } from 'react';

const SettingsScreen = ({ onSave, onCancel }) => {
  const [speaker1, setSpeaker1] = useState({ name: '', personality: '' });
  const [speaker2, setSpeaker2] = useState({ name: '', personality: '' });
  const [topic, setTopic] = useState('');

  const handleSave = () => {
    onSave({ speaker1, speaker2, topic });
  };

  return (
    <div className="settings-screen">
      <h2>設定画面</h2>
      <div>
        <h3>話者1</h3>
        <input
          type="text"
          placeholder="名前"
          value={speaker1.name}
          onChange={(e) => setSpeaker1({ ...speaker1, name: e.target.value })}
        />
        <textarea
          placeholder="キャラクターの性格や口癖"
          value={speaker1.personality}
          onChange={(e) => setSpeaker1({ ...speaker1, personality: e.target.value })}
        />
      </div>
      <div>
        <h3>話者2</h3>
        <input
          type="text"
          placeholder="名前"
          value={speaker2.name}
          onChange={(e) => setSpeaker2({ ...speaker2, name: e.target.value })}
        />
        <textarea
          placeholder="キャラクターの性格や口癖"
          value={speaker2.personality}
          onChange={(e) => setSpeaker2({ ...speaker2, personality: e.target.value })}
        />
      </div>
      <div>
        <h3>話題設定</h3>
        <textarea
          placeholder="話題を入力"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
      </div>
      <button onClick={handleSave}>保存</button>
      <button onClick={onCancel}>キャンセル</button>
    </div>
  );
};

export default SettingsScreen;
