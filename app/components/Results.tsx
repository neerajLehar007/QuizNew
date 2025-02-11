"use client"

import { useState } from "react"
import Link from "next/link"

interface ResultsProps {
  score: number
  totalQuestions: number
  restartQuiz: () => void
  onComplete: () => void
  saveScore: (name: string) => void
}

export default function Results({ score, totalQuestions, restartQuiz, onComplete, saveScore }: ResultsProps) {
  const [name, setName] = useState("")
  const [saved, setSaved] = useState(false)

  const handleSaveScore = () => {
    if (name) {
      saveScore(name)
      setSaved(true)
    }
  }

  const handleChooseAnotherQuiz = () => {
    window.location.reload()
  }

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
      <p className="text-xl mb-4">
        You scored {score} out of {totalQuestions}
      </p>
      {!saved && (
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 mr-2"
          />
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={handleSaveScore}>
            Save Score
          </button>
        </div>
      )}
      <div className="space-x-4 mb-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={restartQuiz}>
          Restart Quiz
        </button>
        <button 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" 
          onClick={handleChooseAnotherQuiz}
        >
          Choose Another Quiz
        </button>
      </div>
      <Link href="/" className="text-blue-500 hover:text-blue-600">
        Back to Home
      </Link>
    </div>
  )
}
