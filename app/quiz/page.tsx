"use client"

import { useState } from "react"
import QuizSelection from "../components/QuizSelection"
import Quiz from "../components/Quiz"
import Leaderboard from "../components/Leaderboard"
import { quizzes } from "../data/quizzes"
import Link from "next/link"

export default function QuizApp() {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [leaderboardCategory, setLeaderboardCategory] = useState<string | undefined>(undefined)
  const [leaderboardType, setLeaderboardType] = useState<string | undefined>(undefined)

  const handleQuizSelect = (quizId: string) => {
    setSelectedQuiz(quizId)
    setShowLeaderboard(false)
  }

  const handleQuizComplete = () => {
    setSelectedQuiz(null)
    setShowLeaderboard(true)
  }

  const categories = Array.from(new Set(Object.values(quizzes).map((quiz) => quiz.category)))
  const types = Array.from(new Set(Object.values(quizzes).map((quiz) => quiz.type)))

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">QuizMaster</h1>
          <Link href="/" className="text-blue-500 hover:text-blue-600">
            Home
          </Link>
        </div>
        {selectedQuiz ? (
          <Quiz quiz={quizzes[selectedQuiz]} onComplete={handleQuizComplete} />
        ) : showLeaderboard ? (
          <>
            <div className="mb-4">
              <select
                className="mr-2 p-2 border rounded"
                value={leaderboardCategory || ""}
                onChange={(e) => setLeaderboardCategory(e.target.value || undefined)}
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <select
                className="p-2 border rounded"
                value={leaderboardType || ""}
                onChange={(e) => setLeaderboardType(e.target.value || undefined)}
              >
                <option value="">All Types</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <Leaderboard category={leaderboardCategory} type={leaderboardType} />
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setShowLeaderboard(false)}
            >
              Back to Quiz Selection
            </button>
          </>
        ) : (
          <>
            <QuizSelection quizzes={quizzes} onSelectQuiz={handleQuizSelect} />
            <button
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              onClick={() => setShowLeaderboard(true)}
            >
              View Leaderboard
            </button>
          </>
        )}
      </div>
    </div>
  )
}

