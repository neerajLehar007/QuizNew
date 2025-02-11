"use client"

import { useState, useCallback, memo } from "react"
import Question from "./Question"
import Results from "./Results"
import type { QuizData, LeaderboardEntry } from "../types"

interface QuizProps {
  quiz: QuizData & { _id: string }
  onComplete: () => void
}

const Quiz = memo(function Quiz({ quiz, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [answered, setAnswered] = useState(false)
  const [answers, setAnswers] = useState<Array<{
    questionIndex: number,
    selectedAnswer: string,
    isCorrect: boolean
  }>>([])

  const handleAnswer = useCallback((selectedAnswer: string) => {
    if (!answered) {
      setAnswered(true)
      const isCorrect = selectedAnswer === quiz.questions[currentQuestion].correctAnswer
      
      if (isCorrect) {
        setScore(prev => prev + 1)
      }

      setAnswers(prev => [...prev, {
        questionIndex: currentQuestion,
        selectedAnswer,
        isCorrect
      }])

      // Use RAF for smoother transitions
      requestAnimationFrame(() => {
        setTimeout(() => {
          if (currentQuestion + 1 < quiz.questions.length) {
            setCurrentQuestion(prev => prev + 1)
            setAnswered(false)
          } else {
            setShowResults(true)
          }
        }, 800)
      })
    }
  }, [answered, currentQuestion, quiz.questions])

  const restartQuiz = useCallback(() => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResults(false)
    setAnswered(false)
    setAnswers([])
  }, [])

  const saveScore = useCallback(async (name: string) => {
    try {
      const response = await fetch('/api/quiz-attempt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quizId: quiz._id,
          userName: name,
          score,
          totalQuestions: quiz.questions.length,
          category: quiz.category,
          type: quiz.type,
          answers
        }),
      });

      const data = await response.json();
      if (data.success) {
        onComplete();
      } else {
        throw new Error(data.error || 'Failed to save score');
      }
    } catch (error) {
      console.error('Error saving score:', error);
      alert('Failed to save score. Please try again.');
    }
  }, [quiz._id, quiz.category, quiz.type, score, answers, onComplete])

  if (!quiz?.questions?.length) {
    return (
      <div className="p-4 text-red-500 bg-red-50 rounded-lg">
        Error: Invalid quiz data
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">{quiz.title}</h2>
        <div className="flex items-center space-x-4 text-sm text-gray-600">
          <span className="px-3 py-1 bg-blue-100 rounded-full">{quiz.category}</span>
          <span className="px-3 py-1 bg-green-100 rounded-full">{quiz.type}</span>
        </div>
      </div>

      {showResults ? (
        <Results
          score={score}
          totalQuestions={quiz.questions.length}
          restartQuiz={restartQuiz}
          onComplete={onComplete}
          saveScore={saveScore}
        />
      ) : (
        <Question
          key={currentQuestion} // Force re-render on question change
          question={quiz.questions[currentQuestion]}
          currentQuestion={currentQuestion}
          totalQuestions={quiz.questions.length}
          handleAnswer={handleAnswer}
          answered={answered}
        />
      )}
    </div>
  )
})

export default Quiz
