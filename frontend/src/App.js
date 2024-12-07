import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Chat from './pages/Chat';
import { Settings } from './pages/Settings';
import { Start } from './pages/Start';

export const App = () => {
  return (
    <Router>
      <div
        className="size-full bg-cover bg-center flex flex-col items-center justify-center"
        style={{ backgroundImage: "url('/path/to/your/image.png')" }}
      >
        <Routes>
          {/* デフォルトルートを設定 */}
          <Route path="/" element={<Navigate to="/Start" replace />} />
          <Route path="/Start" element={<Start />} />
          <Route path="/Chat" element={<Chat />} />
          <Route path="/Settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
};
