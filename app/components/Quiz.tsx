"use client"

import { useState } from "react"
import Question from "./Question"
import Results from "./Results"
import type { QuizData, LeaderboardEntry } from "../types"

interface QuizProps {
  quiz: QuizData & { _id: string }
  onComplete: () => void
}

export default function Quiz({ quiz, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [answered, setAnswered] = useState(false)
  const [answers, setAnswers] = useState<Array<{
    questionIndex: number,
    selectedAnswer: string,
    isCorrect: boolean
  }>>([])

  const handleAnswer = (selectedAnswer: string) => {
    if (!answered) {
      setAnswered(true)
      const isCorrect = selectedAnswer === quiz.questions[currentQuestion].correctAnswer
      
      if (isCorrect) {
        setScore(score + 1)
      }

      setAnswers([...answers, {
        questionIndex: currentQuestion,
        selectedAnswer,
        isCorrect
      }])

      setTimeout(() => {
        if (currentQuestion + 1 < quiz.questions.length) {
          setCurrentQuestion(currentQuestion + 1)
          setAnswered(false)
        } else {
          setShowResults(true)
        }
      }, 1000)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResults(false)
    setAnswered(false)
    setAnswers([])
  }

  const saveScore = async (name: string) => {
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
  }

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return <div>Error: Invalid quiz data</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">{quiz.title}</h2>
      <p className="text-sm text-gray-600 mb-4">
        Category: {quiz.category} | Type: {quiz.type}
      </p>
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
          question={quiz.questions[currentQuestion]}
          currentQuestion={currentQuestion}
          totalQuestions={quiz.questions.length}
          handleAnswer={handleAnswer}
          answered={answered}
        />
      )}
    </div>
  )
}
