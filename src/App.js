import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './component/Login';
import FormPage from './component/FormPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/form" element={<FormPage />} />
    </Routes>
  );
}

export default App;
