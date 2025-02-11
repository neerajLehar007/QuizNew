"use client"

import { useState, useEffect } from "react"
import type { LeaderboardEntry } from "../types"

interface LeaderboardProps {
  category?: string
  type?: string
}

export default function Leaderboard({ category, type }: LeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])

  useEffect(() => {
    const storedLeaderboard = localStorage.getItem("quizLeaderboard")
    if (storedLeaderboard) {
      let parsedLeaderboard: LeaderboardEntry[] = JSON.parse(storedLeaderboard)
      if (category) {
        parsedLeaderboard = parsedLeaderboard.filter((entry) => entry.category === category)
      }
      if (type) {
        parsedLeaderboard = parsedLeaderboard.filter((entry) => entry.type === type)
      }
      setLeaderboard(parsedLeaderboard.sort((a, b) => b.score - a.score).slice(0, 10))
    }
  }, [category, type])

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      {leaderboard.length > 0 ? (
        <table className="w-full">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 text-left">Rank</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Score</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Type</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{entry.name}</td>
                <td className="p-2">{entry.score}</td>
                <td className="p-2">{entry.category}</td>
                <td className="p-2">{entry.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No entries yet.</p>
      )}
    </div>
  )
}

