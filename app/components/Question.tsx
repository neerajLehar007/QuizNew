import { useState } from "react"
import type { QuestionData } from "../types"

interface QuestionProps {
  question: QuestionData
  currentQuestion: number
  totalQuestions: number
  handleAnswer: (answer: string) => void
  answered: boolean
}

export default function Question({ question, currentQuestion, totalQuestions, handleAnswer, answered }: QuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const handleOptionClick = (option: string) => {
    if (!answered) {
      setSelectedAnswer(option)
      handleAnswer(option)
    }
  }

  if (!question || !question.options || !Array.isArray(question.options)) {
    return <div>Error: Invalid question data</div>;
  }

  return (
    <div>
      <p className="mb-4 text-sm text-gray-600">
        Question {currentQuestion + 1} of {totalQuestions}
      </p>
      <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
      <div className="space-y-2">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`w-full p-3 text-left rounded ${
              selectedAnswer === option
                ? option === question.correctAnswer
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            } ${answered && option === question.correctAnswer ? "bg-green-500 text-white" : ""}`}
            onClick={() => handleOptionClick(option)}
            disabled={answered}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
}
