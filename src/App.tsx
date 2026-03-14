/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  RotateCcw, 
  Trophy, 
  Star,
  Coins,
  Gamepad2,
  ArrowRight,
  Heart
} from 'lucide-react';
import { QUESTION_BANK, Difficulty } from './data';

// --- Components ---

const MarioHeader = ({ score, lives, current, total }: { score: number; lives: number; current: number; total: number }) => (
  <div className="flex flex-wrap justify-between items-start gap-6 mb-12 font-pixel text-[10px] md:text-sm tracking-tighter">
    <div className="flex flex-col gap-2">
      <div className="text-white">MARIO</div>
      <div className="text-white">{score.toString().padStart(6, '0')}</div>
    </div>
    
    <div className="flex flex-col gap-2 items-center">
      <div className="flex items-center gap-2 text-white">
        <Coins size={16} className="text-yellow-400" />
        <span>x{score.toString().padStart(2, '0')}</span>
      </div>
    </div>

    <div className="flex flex-col gap-2 items-center">
      <div className="text-white">WORLD</div>
      <div className="text-white">1-{current}</div>
    </div>

    <div className="flex flex-col gap-2 items-end">
      <div className="text-white">TIME</div>
      <div className="text-white">300</div>
    </div>
  </div>
);

const MarioProgressBar = ({ current, total }: { current: number; total: number }) => (
  <div className="relative w-full h-8 bg-black/30 border-4 border-black mb-12 flex items-center px-1">
    <motion.div 
      className="bg-[#74D010] h-4"
      initial={{ width: 0 }}
      animate={{ width: `${(current / total) * 100}%` }}
      transition={{ duration: 0.5 }}
      style={{ boxShadow: 'inset -2px -2px 0px #4A8400, inset 2px 2px 0px #A8FF4D' }}
    />
    <div className="absolute -right-2 -top-4">
      <Star className="text-yellow-400 fill-yellow-400" size={24} />
    </div>
  </div>
);

const MarioExplanation = ({ blank, selectedAnswer, onNext }: { 
  blank: any; 
  selectedAnswer: string;
  onNext: () => void;
}) => {
  const isCorrect = selectedAnswer === blank.correctAnswer;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mt-8 bg-[#F8D870] border-8 border-black p-6 text-black font-pixel text-[10px] leading-loose shadow-[8px_8px_0px_rgba(0,0,0,0.2)]"
    >
      <div className="flex items-center gap-4 mb-4 border-b-4 border-black pb-4">
        {isCorrect ? (
          <div className="w-8 h-8 bg-green-500 border-4 border-black flex items-center justify-center text-white">!</div>
        ) : (
          <div className="w-8 h-8 bg-red-500 border-4 border-black flex items-center justify-center text-white">X</div>
        )}
        <h3 className="font-bold text-sm">
          {isCorrect ? 'YOU GOT IT!' : 'OH NO!'}
        </h3>
      </div>
      
      <div className="space-y-6">
        <p>{blank.explanation.rule}</p>
        
        <div className="bg-white/50 p-4 border-4 border-black/20">
          <p className="italic">"{blank.explanation.example}"</p>
        </div>

        <button 
          onClick={onNext}
          className="w-full py-4 mario-btn mario-btn-blue text-white text-xs flex items-center justify-center gap-2"
        >
          NEXT LEVEL <ArrowRight size={16} />
        </button>
      </div>
    </motion.div>
  );
};

const MarioResult = ({ score, total, onRestart }: { score: number; total: number; onRestart: () => void }) => {
  const percentage = (score / total) * 100;
  const isWin = percentage >= 60;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto text-center py-12 px-8 bg-[#5C94FC] border-8 border-white font-pixel"
    >
      <h2 className="text-2xl mb-8 text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
        {isWin ? 'COURSE CLEAR!' : 'GAME OVER'}
      </h2>
      
      <div className="flex justify-center mb-12">
        <div className="relative">
          <div className="w-32 h-32 bg-yellow-400 border-8 border-black flex items-center justify-center text-4xl text-black">
            ?
          </div>
          <motion.div 
            animate={{ y: [-20, 0, -20] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="absolute -top-12 left-1/2 -translate-x-1/2"
          >
            <Star className="text-white fill-white" size={48} />
          </motion.div>
        </div>
      </div>

      <div className="mb-12 text-white text-sm space-y-4">
        <div>SCORE: {score.toString().padStart(6, '0')}</div>
        <div>ACCURACY: {Math.round(percentage)}%</div>
      </div>

      <button 
        onClick={onRestart}
        className="w-full py-6 mario-btn text-white text-sm flex items-center justify-center gap-4"
      >
        <RotateCcw size={20} /> TRY AGAIN
      </button>
    </motion.div>
  );
};

export default function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = QUESTION_BANK[currentIndex];

  const handleOptionSelect = (blankId: string, option: string) => {
    if (isSubmitted) return;
    setSelectedAnswers(prev => ({ ...prev, [blankId]: option }));
  };

  const handleSubmit = () => {
    if (Object.keys(selectedAnswers).length < currentQuestion.blanks.length) return;
    
    const isCorrect = currentQuestion.blanks.every(
      blank => selectedAnswers[blank.id] === blank.correctAnswer
    );
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    setIsSubmitted(true);
  };

  const handleNext = () => {
    if (currentIndex < QUESTION_BANK.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswers({});
      setIsSubmitted(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setIsSubmitted(false);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <MarioResult score={score * 100} total={QUESTION_BANK.length} onRestart={handleRestart} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#5C94FC] flex flex-col overflow-x-hidden">
      {/* Clouds Background Decor */}
      <div className="absolute top-20 left-10 opacity-50 pointer-events-none">
        <div className="w-24 h-8 bg-white rounded-full relative">
          <div className="absolute -top-4 left-4 w-12 h-12 bg-white rounded-full"></div>
          <div className="absolute -top-2 left-12 w-10 h-10 bg-white rounded-full"></div>
        </div>
      </div>
      <div className="absolute top-40 right-20 opacity-30 pointer-events-none scale-150">
        <div className="w-24 h-8 bg-white rounded-full relative">
          <div className="absolute -top-4 left-4 w-12 h-12 bg-white rounded-full"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full px-4 py-8 flex-grow">
        <MarioHeader score={score * 10} lives={3} current={currentIndex + 1} total={QUESTION_BANK.length} />
        
        <MarioProgressBar current={currentIndex + 1} total={QUESTION_BANK.length} />

        {/* Level Container */}
        <motion.div 
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          {/* Question Area */}
          <div className="bg-white border-8 border-black p-8 md:p-12 mb-8 shadow-[12px_12px_0px_rgba(0,0,0,0.3)]">
            <div className="flex items-center gap-4 mb-8">
              <div className="px-3 py-1 bg-black text-white text-[8px] uppercase">
                {currentQuestion.category}
              </div>
              <div className="px-3 py-1 bg-yellow-400 border-2 border-black text-black text-[8px] uppercase">
                {currentQuestion.difficulty}
              </div>
            </div>

            <div className="text-black text-sm md:text-xl leading-loose mb-12 font-pixel tracking-tighter">
              {currentQuestion.sentenceParts.map((part, idx) => (
                <React.Fragment key={idx}>
                  {part}
                  {idx < currentQuestion.blanks.length && (
                    <span 
                      className={`inline-block min-w-[100px] border-b-8 mx-2 px-2 text-center transition-all
                        ${isSubmitted 
                          ? selectedAnswers[currentQuestion.blanks[idx].id] === currentQuestion.blanks[idx].correctAnswer
                            ? 'border-green-500 text-green-600'
                            : 'border-red-500 text-red-600'
                          : selectedAnswers[currentQuestion.blanks[idx].id]
                            ? 'border-black text-black'
                            : 'border-dashed border-black/20 text-transparent'
                        }`}
                    >
                      {selectedAnswers[currentQuestion.blanks[idx].id] || '????'}
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>

            {!isSubmitted ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentQuestion.blanks[0].options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(currentQuestion.blanks[0].id, option)}
                    className={`mario-btn text-white text-[10px] py-4 flex items-center justify-between
                      ${selectedAnswers[currentQuestion.blanks[0].id] === option
                        ? 'mario-btn-blue scale-105 z-10'
                        : 'mario-btn-green'
                      }`}
                  >
                    <span>{option}</span>
                    <Gamepad2 size={16} className={selectedAnswers[currentQuestion.blanks[0].id] === option ? 'animate-bounce' : 'opacity-50'} />
                  </button>
                ))}
                
                <div className="md:col-span-2 mt-4">
                  <button
                    onClick={handleSubmit}
                    disabled={Object.keys(selectedAnswers).length < currentQuestion.blanks.length}
                    className={`w-full py-6 mario-btn text-white text-xs
                      ${Object.keys(selectedAnswers).length < currentQuestion.blanks.length
                        ? 'opacity-50 grayscale cursor-not-allowed'
                        : ''
                      }`}
                  >
                    SUBMIT ANSWER
                  </button>
                </div>
              </div>
            ) : (
              <MarioExplanation 
                blank={currentQuestion.blanks[0]} 
                selectedAnswer={selectedAnswers[currentQuestion.blanks[0].id]}
                onNext={handleNext}
              />
            )}
          </div>
        </motion.div>
      </div>

      {/* Ground Decor */}
      <div className="h-24 w-full mario-ground border-t-8 border-black relative">
        <div className="absolute -top-16 left-1/4 w-12 h-16 bg-[#74D010] border-x-8 border-t-8 border-black">
          <div className="absolute -top-4 -left-4 w-20 h-4 bg-[#74D010] border-8 border-black"></div>
        </div>
        <div className="absolute -top-12 right-1/4 w-12 h-12 bg-[#74D010] border-x-8 border-t-8 border-black">
          <div className="absolute -top-4 -left-4 w-20 h-4 bg-[#74D010] border-8 border-black"></div>
        </div>
      </div>
    </div>
  );
}
