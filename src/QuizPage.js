import React, { useState, useEffect } from "react";
import "./QuizPage.css";

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [previousScores, setPreviousScores] = useState([]);

  const quizQuestions = [
    {
      question: "What is the primary purpose of a budget?",
      options: [
        "To track income and expenses",
        "To invest in the stock market",
        "To save for retirement",
        "To pay off debt",
      ],
      correctAnswer: "To track income and expenses",
    },
    {
      question: "What is compound interest?",
      options: [
        "Interest earned only on the principal amount",
        "Interest earned on both the principal and accumulated interest",
        "A type of loan interest",
        "Interest paid monthly",
      ],
      correctAnswer: "Interest earned on both the principal and accumulated interest",
    },
    {
      question: "What is an emergency fund?",
      options: [
        "Money saved for vacations",
        "Money saved for unexpected expenses",
        "Money invested in stocks",
        "Money used for daily expenses",
      ],
      correctAnswer: "Money saved for unexpected expenses",
    },
    // Add more questions here
  ];

  // Shuffle questions and select a subset
  useEffect(() => {
    const shuffledQuestions = quizQuestions.sort(() => Math.random() - 0.5).slice(0, 5); // Select 5 random questions
    setQuestions(shuffledQuestions);
  }, []);

  // Handle answer selection
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  // Handle next question or show result
  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer("");
    } else {
      setShowResult(true);
      // Save the score
      setPreviousScores([...previousScores, score]);
    }
  };

  // Restart the quiz
  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer("");
    setScore(0);
    setShowResult(false);
    // Shuffle questions again
    const shuffledQuestions = quizQuestions.sort(() => Math.random() - 0.5).slice(0, 5);
    setQuestions(shuffledQuestions);
  };

  return (
    <div className="quiz-page">
      <h1>Financial Quiz</h1>
      {showResult ? (
        <div className="result-section">
          <h2>Your Score: {score} / {questions.length}</h2>
          <button onClick={restartQuiz}>Restart Quiz</button>
          <div className="previous-scores">
            <h3>Previous Scores:</h3>
            <ul>
              {previousScores.map((prevScore, index) => (
                <li key={index}>Attempt {index + 1}: {prevScore} / {questions.length}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="question-section">
          <h2>Question {currentQuestion + 1}</h2>
          <p>{questions[currentQuestion]?.question}</p>
          <div className="options">
            {questions[currentQuestion]?.options.map((option, index) => (
              <button
                key={index}
                className={`option ${selectedAnswer === option ? "selected" : ""}`}
                onClick={() => handleAnswerSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <button className="next-button" onClick={handleNextQuestion}>
            {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;