import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Settings = () => {
  const navigate = useNavigate();
  const [speaker1, setSpeaker1] = useState({ name: "", personality: "" });
  const [speaker2, setSpeaker2] = useState({ name: "", personality: "" });
  const [topic, setTopic] = useState("");

  const handleSave = () => {
    // チャット画面に設定を渡して遷移
    navigate("/chat", { state: { speaker1, speaker2, topic } });
  };

  return (
    <div
      className="size-full p-100 bg-cover bg-center"
      style={{ backgroundImage: `url('/assets/img/echossai.png')` }}>
      <div className="flex flex-col justify-center items-center h-full w-full min-w-[800px] p-10 bg-neutral-400/50">
        <div className="flex flex-row grow gap-10 w-full">
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col h-[60px] w-full">
              <label className="text-lg font-semibold">話者1</label>
              <input
                type="text"
                placeholder="名前"
                className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={speaker1.name}
                onChange={(e) => setSpeaker1({ ...speaker1, name: e.target.value })}
              />
            </div>
            <div className="flex flex-col w-full grow">
              <label className="text-lg font-semibold">キャラクターの性格や口癖</label>
              <textarea
                placeholder="キャラクターの性格や口癖"
                className="w-full p-2 h-full border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={speaker1.personality}
                onChange={(e) => setSpeaker1({ ...speaker1, personality: e.target.value })}
              />
            </div>
          </div>
          <div className="flex flex-col gap-5 w-full">
            <div className="flex flex-col h-[60px] w-full">
              <label className="text-lg font-semibold">話者2</label>
              <input
                type="text"
                placeholder="名前"
                className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={speaker2.name}
                onChange={(e) => setSpeaker2({ ...speaker2, name: e.target.value })}
              />
            </div>
            <div className="flex flex-col w-full grow">
              <label className="text-lg font-semibold">キャラクターの性格や口癖</label>
              <textarea
                placeholder="キャラクターの性格や口癖"
                className="w-full p-2 h-full border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={speaker2.personality}
                onChange={(e) => setSpeaker2({ ...speaker2, personality: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div className="h-[120px] w-full mb-6">
          <label className="text-lg font-semibold mb-2 block">話題設定</label>
          <textarea
            placeholder="話題設定"
            className="w-full p-2 h-20 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          ></textarea>
        </div>

        <button
          onClick={handleSave}
          className="px-4 py-2 text-lg font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          保存
        </button>
      </div>
    </div>
  );
};

export default Settings;
