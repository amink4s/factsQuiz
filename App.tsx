import React, { useState, useEffect } from 'react';
import { Play, RotateCcw, Award, CheckCircle2, XCircle, BrainCircuit } from 'lucide-react';
import { fetchTriviaQuestions } from './services/geminiService';
import { GameState, TriviaQuestion } from './types';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { ProgressBar } from './components/ProgressBar';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    status: 'idle',
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    answers: [],
  });

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const startGame = async () => {
    setGameState(prev => ({ ...prev, status: 'loading', score: 0, currentQuestionIndex: 0, answers: [] }));
    const questions = await fetchTriviaQuestions();
    setGameState(prev => ({
      ...prev,
      status: 'playing',
      questions,
      score: 0,
      currentQuestionIndex: 0,
      answers: [],
    }));
  };

  const handleOptionClick = (index: number) => {
    if (showFeedback) return;
    setSelectedOption(index);
    setShowFeedback(true);
    
    const currentQ = gameState.questions[gameState.currentQuestionIndex];
    const isCorrect = index === currentQ.correctAnswerIndex;

    // Wait a bit then move to next or finish
    setTimeout(() => {
      if (gameState.currentQuestionIndex < gameState.questions.length - 1) {
        setGameState(prev => ({
          ...prev,
          score: isCorrect ? prev.score + 1 : prev.score,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
          answers: [...prev.answers, index]
        }));
        setSelectedOption(null);
        setShowFeedback(false);
      } else {
        setGameState(prev => ({
          ...prev,
          status: 'finished',
          score: isCorrect ? prev.score + 1 : prev.score,
          answers: [...prev.answers, index]
        }));
        setSelectedOption(null);
        setShowFeedback(false);
      }
    }, 2000); // 2 seconds to read the fun fact
  };

  const renderStartScreen = () => (
    <Card className="text-center py-12">
      <div className="mb-8 flex justify-center">
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-200 rounded-full blur-xl opacity-50 animate-pulse"></div>
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-3xl relative shadow-xl transform -rotate-6">
             <BrainCircuit size={64} />
          </div>
        </div>
      </div>
      <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-4 tracking-tight">
        WerFacts
      </h1>
      <p className="text-gray-500 mb-8 text-lg">
        Ready for a dose of cute & quirky knowledge?
      </p>
      <Button onClick={startGame} className="text-lg px-12">
        <span className="flex items-center gap-2">
          Start Quiz <Play size={20} fill="currentColor" />
        </span>
      </Button>
    </Card>
  );

  const renderLoadingScreen = () => (
    <Card className="text-center py-20">
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-indigo-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-indigo-900">Loading Fun...</h2>
          <p className="text-indigo-400 text-sm">Getting the facts ready!</p>
        </div>
      </div>
    </Card>
  );

  const renderGameScreen = () => {
    const currentQ = gameState.questions[gameState.currentQuestionIndex];
    
    if (!currentQ) return null;

    return (
      <div className="w-full max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-6 px-4">
           <span className="text-sm font-bold text-indigo-400 bg-indigo-50 px-3 py-1 rounded-full">
            Question {gameState.currentQuestionIndex + 1}/{gameState.questions.length}
           </span>
           <span className="text-sm font-bold text-indigo-400 bg-indigo-50 px-3 py-1 rounded-full">
            Score: {gameState.score}
           </span>
        </div>
        
        <ProgressBar current={gameState.currentQuestionIndex} total={gameState.questions.length} />

        <Card className="mb-6 relative overflow-hidden">
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 leading-snug mb-2">
            {currentQ.question}
          </h2>
          
           {showFeedback && (
            <div className={`mt-4 p-4 rounded-xl text-sm transform transition-all duration-500 ease-out ${
              selectedOption === currentQ.correctAnswerIndex 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              <div className="flex items-start gap-2">
                 {selectedOption === currentQ.correctAnswerIndex ? (
                   <CheckCircle2 className="shrink-0 mt-0.5" size={18} />
                 ) : (
                    <XCircle className="shrink-0 mt-0.5" size={18} />
                 )}
                 <div>
                   <span className="font-bold block mb-1">
                     {selectedOption === currentQ.correctAnswerIndex ? "That's Correct!" : "Oopsie!"}
                   </span>
                   {currentQ.funFact}
                 </div>
              </div>
            </div>
          )}
        </Card>

        <div className="grid grid-cols-1 gap-3">
          {currentQ.options.map((option, idx) => {
            let variant: 'option' | 'correct' | 'incorrect' = 'option';
            
            if (showFeedback) {
              if (idx === currentQ.correctAnswerIndex) {
                variant = 'correct';
              } else if (idx === selectedOption) {
                variant = 'incorrect';
              }
            }

            return (
              <Button
                key={idx}
                variant={variant}
                onClick={() => handleOptionClick(idx)}
                fullWidth
                disabled={showFeedback}
                className="text-left"
              >
                {option}
              </Button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderResultScreen = () => {
    const percentage = (gameState.score / gameState.questions.length) * 100;
    let message = "Good effort!";
    if (percentage === 100) message = "You are a Genius!";
    else if (percentage >= 80) message = "Amazing Job!";
    else if (percentage >= 50) message = "Not bad at all!";

    return (
      <Card className="text-center py-10">
        <div className="mb-6 inline-block p-4 bg-yellow-100 rounded-full text-yellow-600 shadow-inner">
          <Award size={48} />
        </div>
        <h2 className="text-3xl font-bold text-indigo-900 mb-2">{message}</h2>
        <p className="text-gray-500 mb-8">
          You got <span className="text-indigo-600 font-bold text-xl">{gameState.score}</span> out of {gameState.questions.length} correct!
        </p>
        
        <div className="bg-indigo-50 rounded-2xl p-6 mb-8">
          <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
            <span>Accuracy</span>
            <span className="font-bold">{Math.round(percentage)}%</span>
          </div>
          <div className="h-4 bg-white rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-pink-400 to-indigo-500 rounded-full"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>

        <Button onClick={startGame} variant="primary" className="px-10">
          <span className="flex items-center gap-2">
            Play Again <RotateCcw size={18} />
          </span>
        </Button>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 relative overflow-hidden flex items-center justify-center p-4">
      {/* Decorative background blobs */}
      <div className="blob-shape bg-pink-300 w-64 h-64 rounded-full top-10 left-10 mix-blend-multiply"></div>
      <div className="blob-shape bg-purple-300 w-72 h-72 rounded-full bottom-20 right-10 mix-blend-multiply animation-delay-2000"></div>
      <div className="blob-shape bg-yellow-200 w-48 h-48 rounded-full top-1/2 left-1/3 mix-blend-multiply animation-delay-4000"></div>

      <div className="w-full relative z-10">
        {gameState.status === 'idle' && renderStartScreen()}
        {gameState.status === 'loading' && renderLoadingScreen()}
        {gameState.status === 'playing' && renderGameScreen()}
        {gameState.status === 'finished' && renderResultScreen()}
      </div>
      
      <div className="absolute bottom-4 left-0 right-0 text-center text-indigo-300 text-xs font-semibold">
        <span className="flex items-center justify-center gap-1">
          Made with ❤️ for fun
        </span>
      </div>
    </div>
  );
};

export default App;