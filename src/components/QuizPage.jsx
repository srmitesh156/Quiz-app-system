import React, { useState } from 'react';
import PropTypes from 'prop-types'; 

const QuizPage = ({ 
  quiz, 
  currentQuestion, 
  setCurrentQuestion,
  handleAnswer, 
  timeLeft, 
  useHint, 
  hintUsed, 
  goToSummaryPage
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null); 
  const [submitted, setSubmitted] = useState(false); 
  const question = quiz.questions[currentQuestion];

  if (!question) {
    return <div>Loading...</div>;
  }

  const onAnswerClick = (option) => {
    setSelectedAnswer(option);
    setSubmitted(false); 
  };

  const onSubmit = () => {
    setSubmitted(true);
    handleAnswer(selectedAnswer); 
  };

  const onNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1); 
      setSelectedAnswer(null); 
      setSubmitted(false); 
    } else {
      goToSummaryPage(); 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-indigo-200 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-indigo-700 mb-6 text-center">{quiz.title}</h1>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold">
              Question {currentQuestion + 1} of {quiz.questions.length}
            </h2>
            <p className="text-red-500 font-bold">Time left: {timeLeft} seconds</p>
          </div>

        
          <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
            <div
              className="bg-indigo-500 h-4 rounded-full"
              style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
            />
          </div>

          <p className="text-lg mb-4">{question.question}</p>
        </div>

       
        <div className="space-y-4 mb-6">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => onAnswerClick(option)}
              className={`w-full bg-gray-100 hover:bg-indigo-100 text-left px-4 py-3 rounded-lg shadow-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg ${
                selectedAnswer === option ? 'bg-indigo-300' : ''
              }`}
            >
              {option}
            </button>
          ))}
        </div>

       
        {selectedAnswer && !submitted && (
          <div className="text-center">
            <button
              onClick={onSubmit}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Submit Answer
            </button>
          </div>
        )}

        
        {submitted && (
          <div className="mt-6 text-center">
            <button
              onClick={onNextQuestion}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              {currentQuestion < quiz.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
            </button>
          </div>
        )}

       
        <div className="text-center mt-4">
          <button
            onClick={useHint}
            disabled={hintUsed}
            className={`bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 ${
              hintUsed ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {hintUsed ? 'Hint Used' : 'Use 50/50 Hint'}
          </button>
        </div>
      </div>
    </div>
  );
};

QuizPage.propTypes = {
  quiz: PropTypes.shape({
    title: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        question: PropTypes.string.isRequired,
        options: PropTypes.arrayOf(PropTypes.string).isRequired,
        correctAnswer: PropTypes.string.isRequired,
        explanation: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
  currentQuestion: PropTypes.number.isRequired,
  setCurrentQuestion: PropTypes.func.isRequired, 
  handleAnswer: PropTypes.func.isRequired,
  timeLeft: PropTypes.number.isRequired,
  useHint: PropTypes.func.isRequired,
  hintUsed: PropTypes.bool.isRequired,
  goToSummaryPage: PropTypes.func.isRequired,
};

export default QuizPage;
