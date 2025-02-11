import { useState, useCallback, memo } from "react"
import type { QuestionData } from "../types"

interface QuestionProps {
  question: QuestionData
  currentQuestion: number
  totalQuestions: number
  handleAnswer: (answer: string) => void
  answered: boolean
}

const Question = memo(function Question({ 
  question, 
  currentQuestion, 
  totalQuestions, 
  handleAnswer, 
  answered 
}: QuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const handleOptionClick = useCallback((option: string) => {
    if (!answered) {
      setSelectedAnswer(option)
      handleAnswer(option)
    }
  }, [answered, handleAnswer])

  if (!question?.options?.length) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-lg">
        Error: Invalid question data
      </div>
    );
  }

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm font-medium text-gray-600">
          Question {currentQuestion + 1} of {totalQuestions}
        </p>
        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      <h2 className="text-xl font-bold mb-6 leading-relaxed">
        {question.question}
      </h2>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === question.correctAnswer;
          const showCorrect = answered && isCorrect;
          const showIncorrect = answered && isSelected && !isCorrect;

          return (
            <button
              key={index}
              className={`
                w-full p-4 text-left rounded-lg transition-all duration-300
                ${!answered && 'hover:transform hover:-translate-y-1 hover:shadow-md'}
                ${showCorrect && 'bg-green-500 text-white transform scale-105'}
                ${showIncorrect && 'bg-red-500 text-white'}
                ${!answered && !isSelected ? 'bg-white border-2 border-gray-200' : ''}
                ${isSelected && !answered ? 'bg-blue-100 border-2 border-blue-500' : ''}
                disabled:cursor-not-allowed
              `}
              onClick={() => handleOptionClick(option)}
              disabled={answered}
            >
              <div className="flex items-center">
                <span className="w-8 h-8 flex items-center justify-center rounded-full border-2 border-current mr-3">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </div>
            </button>
          )
        })}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  )
})

export default Question
