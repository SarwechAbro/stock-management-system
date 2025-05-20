import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/pages/Dashboard';
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
    <Toaster position="bottom-right" reverseOrder={false} />
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
       
      </Routes>
    </Router>
    </>
  );
}

export default App;

