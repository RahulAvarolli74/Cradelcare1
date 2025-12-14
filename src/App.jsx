import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Features from './pages/Features';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import './App.css';

// Ensure you install: npm install react-router-dom

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />\
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <footer style={{textAlign: 'center', padding: '20px', background: '#0f2f2e', color: '#bbb'}}>
          © 2025 CradleCare. All Rights Reserved.
        </footer>
      </div>
    </Router>
  );
}

export default App;