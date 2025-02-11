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
  const [currentUsername, setCurrentUsername] = useState<string>("")
  const [showLatestResult, setShowLatestResult] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>(category || "")
  const [selectedType, setSelectedType] = useState<string>(type || "")
  const [categories, setCategories] = useState<string[]>([])
  const [types, setTypes] = useState<string[]>([])

  useEffect(() => {
    // Get current username from localStorage
    const storedUsername = localStorage.getItem('quizUsername')
    if (storedUsername) {
      setCurrentUsername(storedUsername)
    }

    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/quiz-attempt');
        
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard');
        }
        
        const data = await response.json();
        
        if (data.success) {
          // Sort entries by score (descending) and date (most recent first)
          const sortedEntries = data.attempts.sort((a: LeaderboardEntry, b: LeaderboardEntry) => {
            const scoreA = (a.score / a.totalQuestions) * 100
            const scoreB = (b.score / b.totalQuestions) * 100
            if (scoreB !== scoreA) {
              return scoreB - scoreA
            }
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          })
          setEntries(sortedEntries)

          // Extract unique categories and types
          const uniqueCategories = Array.from(new Set(data.attempts.map((entry: LeaderboardEntry) => entry.category)))
          const uniqueTypes = Array.from(new Set(data.attempts.map((entry: LeaderboardEntry) => entry.type)))
          setCategories(uniqueCategories)
          setTypes(uniqueTypes)
        } else {
          setError('Failed to fetch leaderboard');
        }
      } catch (err) {
        setError('Failed to fetch leaderboard');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard()
  }, [selectedCategory, selectedType])

  // Find the latest result for the current user
  const latestUserResult = entries.find(entry => entry.userName === currentUsername)

  if (loading) {
    return <div className="text-center">Loading leaderboard...</div>
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  return (
    <div className="mt-8 max-w-4xl mx-auto px-4">
      <div className="relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-0 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

       

        <h2 className="text-4xl font-extrabold mb-8 text-center bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
          Leaderboard Champions
        </h2>

        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
          {/* Header Row */}
          <div className="grid grid-cols-5 gap-4 p-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold">
            <div className="col-span-1 text-center">Rank</div>
            <div className="col-span-2">Player</div>
            <div className="text-center">Score</div>
            <div className="text-center">Date</div>
          </div>
          
          {/* Entries */}
          <div className="divide-y divide-gray-200/50">
            {entries.map((entry, index) => {
              const percentage = Math.round((entry.score / entry.totalQuestions) * 100);
              const rank = index + 1;
              const isCurrentUser = entry.userName === currentUsername;
              
              return (
                <div
                  key={index}
                  className={`grid grid-cols-5 gap-4 p-6 items-center transition-all duration-300
                    ${isCurrentUser ? 'bg-blue-50/50 hover:bg-blue-100/50' : 'hover:bg-gray-50/50'}
                    transform hover:scale-[1.01] hover:shadow-md`}
                >
                  {/* Rank */}
                  <div className="col-span-1 text-center">
                    <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl
                      ${rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-yellow-900' : 
                        rank === 2 ? 'bg-gradient-to-r from-gray-300 to-gray-200 text-gray-800' : 
                        rank === 3 ? 'bg-gradient-to-r from-orange-400 to-orange-300 text-orange-900' : 
                        'bg-gradient-to-r from-blue-100 to-blue-50 text-blue-600'} 
                      font-bold text-lg shadow-lg transform hover:scale-110 transition-transform duration-200`}>
                      {rank}
                    </span>
                  </div>
                  
                  {/* Player Info */}
                  <div className="col-span-2">
                    <div className={`font-bold text-lg ${isCurrentUser ? 'text-blue-600' : 'text-gray-800'}`}>
                      {entry.userName}
                      {isCurrentUser && 
                        <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          You
                        </span>
                      }
                    </div>
                    <div className="text-sm text-gray-500 mt-1">
                      {entry.category} - {entry.type}
                    </div>
                  </div>
                  
                  {/* Score */}
                  <div className="text-center">
                    <div className="inline-flex flex-col items-center">
                      <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {percentage}%
                      </div>
                      <div className="text-sm text-gray-500">
                        {entry.score}/{entry.totalQuestions}
                      </div>
                    </div>
                  </div>
                  
                  {/* Date */}
                  <div className="text-center">
                    <div className="inline-flex items-center px-3 py-1 rounded-lg bg-gray-100 text-gray-700 text-sm">
                      {new Date(entry.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {entries.length === 0 && !loading && !error && (
          <div className="text-center py-16 bg-white/80 backdrop-blur-sm rounded-2xl mt-8">
            <div className="text-3xl font-bold text-gray-400 mb-2">No Entries Yet</div>
            <p className="text-gray-500">Be the first to make it to the leaderboard!</p>
          </div>
        )}
      </div>

      {/* Add animation keyframes */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }

        /* Custom styles for dropdown options */
        select option {
          padding: 8px 12px;
          cursor: pointer;
          font-weight: 500;
        }

        select option:checked {
          background-color: #f8fafc;
          color: #334155;
        }

        /* Simple scrollbar */
        select::-webkit-scrollbar {
          width: 6px;
        }

        select::-webkit-scrollbar-track {
          background: #ffffff;
        }

        select::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 3px;
        }
      `}</style>
    </div>
  )
}
