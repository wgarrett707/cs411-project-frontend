import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import PhoneFinder from './components/PhoneFinder';
import PriceCalculator from './components/PriceCalculator';
import UsedPhones from './components/UsedPhones';
import Features from './components/Features';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/phone-finder" element={<PhoneFinder />} />
            <Route path="/price-calculator" element={<PriceCalculator />} />
            <Route path="/used-phones" element={<UsedPhones />} />
            <Route path="/features" element={<Features />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App; 