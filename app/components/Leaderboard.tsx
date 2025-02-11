"use client"

import { useState, useEffect } from "react"

interface LeaderboardProps {
  category?: string
  type?: string
}

interface LeaderboardEntry {
  userName: string
  score: number
  totalQuestions: number
  category: string
  type: string
  createdAt: string
}

export default function Leaderboard({ category, type }: LeaderboardProps) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const params = new URLSearchParams()
        if (category) params.append('category', category)
        if (type) params.append('type', type)

        const response = await fetch(`/api/quiz-attempt?${params}`)
        const data = await response.json()

        if (data.success) {
          setEntries(data.attempts)
        } else {
          setError('Failed to fetch leaderboard')
        }
      } catch (error) {
        setError('Error loading leaderboard')
      } finally {
        setLoading(false)
      }
    }

    fetchLeaderboard()
  }, [category, type])

  if (loading) {
    return <div className="text-center">Loading leaderboard...</div>
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  if (entries.length === 0) {
    return <div className="text-center">No scores yet!</div>
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <div className="space-y-2">
        {entries.map((entry, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-3 bg-gray-100 rounded"
          >
            <div>
              <span className="font-bold">{entry.userName}</span>
              <span className="text-sm text-gray-600 ml-2">
                ({entry.category} - {entry.type})
              </span>
            </div>
            <div className="text-right">
              <div className="font-bold">
                {entry.score} / {entry.totalQuestions}
              </div>
              <div className="text-sm text-gray-600">
                {new Date(entry.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
