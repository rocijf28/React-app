import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Homepage from './Pages/Homepage';
import Navbar from './Components/Navbar';
import Fieldspage from './Pages/Fieldspage';
import FieldDetailpage from './Pages/FieldDetailpage';
import ChatPage from './Pages/ChatPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/fields" element={<Fieldspage />} />
      <Route path="/field/:fieldId" element={<FieldDetailpage />} />
      <Route path="/chat" element={<ChatPage />} />
    </Routes>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <div className="bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
      <BrowserRouter>
        <Navbar />
        <main className="container mx-auto py-6">
          <AppRoutes />
        </main>
      </BrowserRouter>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();