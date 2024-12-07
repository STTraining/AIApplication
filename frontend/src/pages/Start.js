import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Start = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center size-full space-y-6">
      <div className="text-5xl font-bold text-white drop-shadow-lg">ECHOSSAI</div>
      <div className="flex flex-col space-y-4">
        <button
          className="bg-white text-black font-bold py-2 px-8 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300"
          onClick={() => navigate('/Chat')}
        >
          スタート
        </button>
        <button
          className="bg-white text-black font-bold py-2 px-8 rounded-lg shadow-lg hover:bg-gray-200 transition duration-300"
          onClick={() => navigate('/Settings')}
        >
          設定
        </button>
      </div>
    </div>
  );
};
