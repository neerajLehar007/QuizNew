"use client"

import { useState } from "react"
import Question from "./Question"
import Results from "./Results"
import type { QuizData, LeaderboardEntry } from "../types"

interface QuizProps {
  quiz: QuizData
  onComplete: () => void
}

export default function Quiz({ quiz, onComplete }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [answered, setAnswered] = useState(false)

  const handleAnswer = (selectedAnswer: string) => {
    if (!answered) {
      setAnswered(true)
      if (selectedAnswer === quiz.questions[currentQuestion].correctAnswer) {
        setScore(score + 1)
      }

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
  }

  const saveScore = (name: string) => {
    const entry: LeaderboardEntry = {
      name,
      score,
      category: quiz.category,
      type: quiz.type,
    }
    const storedLeaderboard = localStorage.getItem("quizLeaderboard")
    const leaderboard: LeaderboardEntry[] = storedLeaderboard ? JSON.parse(storedLeaderboard) : []
    leaderboard.push(entry)
    localStorage.setItem("quizLeaderboard", JSON.stringify(leaderboard))
    onComplete()
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

