import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'; // Import the CSS file for styling
import HomePage from './HomePage'; // Import the HomePage component
import SavingsTracker from './SavingsTracker';
import QuizPage from './QuizPage';
import InvestmentCalculator from './InvestmentCalculator';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Route for the main page */}
          <Route
            path="/"
            element={
              <>
                <h1>Forecast with Confidence</h1>
                <p>Be prepared to grow faster</p>
                <Link to="/home">
                  <button className="beta-button">Home</button>
                </Link>
              </>
            }
          />
          {/* Route for the home page */}
          <Route path="/home" element={<HomePage />} />
          <Route path="/SavingsTracker" element={<SavingsTracker />} />
          <Route path="/QuizPage" element={<QuizPage />} />
          <Route path="/InvestmentCalculator" element={<InvestmentCalculator />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;