import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Homepage from './Pages/Homepage';
import Navbar from './Components/Navbar';
import Fieldspage from './Pages/Fieldspage';
import FieldDetailpage from './Pages/FieldDetailpage';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path='/fields' element={<Fieldspage/>} />
      <Route path='/field/:fieldId' element={<FieldDetailpage/>} />
    </Routes>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Navbar/>
          <main>
            <AppRoutes />
          
          </main>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
