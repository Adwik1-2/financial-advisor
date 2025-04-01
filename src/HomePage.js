import React from "react";
import { Link } from "react-router-dom"; // Import Link
import "./HomePage.css"; // Import the CSS file for styling

const HomePage = () => {
  return (
    <div className="app-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <span className="logo">Port</span>
          <ul className="nav-links">
            <li><Link to="/QuizPage">Quiz</Link></li>
            <li><Link to="/SavingsTracker">Savings Tracker</Link></li> {/* Updated Link */}
            <li><Link to="/investmentcomparison">Investment Comparison</Link></li>
            <li><Link to="/whatif">What-If</Link></li>
            <li><Link to="/glossary">Glossary</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        <h1>GenAI powered Financial Assistant</h1>
        <p>
          This tool allows you to make better investing decisions.
        </p>
      </div>

      {/* What We Offer Section */}
      <div className="what-we-offer-section">
        <h2>What We Offer</h2>
        <div className="offer-list">
          <div className="offer-item">
            <h3>Variable rates based on utilization</h3>
            <p>Our rates adjust dynamically based on market conditions.</p>
          </div>
          <div className="offer-item">
            <h3>Cross Collateral Support</h3>
            <p>Use multiple assets as collateral for your loans.</p>
          </div>
          <div className="offer-item">
            <h3>Flash Loans</h3>
            <p>Instant loans with no collateral required.</p>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="about-us-section">
        <h2>About Us</h2>
        <p>
          Port Finance is a lending protocol that aims to provide an entire suite of fixed income products.
        </p>
        <p>
          Our services include variable rate lending, fixed rate lending, and interest rate swaps.
        </p>
        <p>
          Our core contributors are a team of close-knit engineers with backgrounds from Google, Facebook, and Microsoft.
        </p>
        <button className="learn-more-button">Learn More...</button>
      </div>
    </div>
  );
};

export default HomePage;