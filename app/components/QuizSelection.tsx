import { useState, useEffect } from "react"
import type { QuizData } from "../types"
import Link from "next/link"

interface QuizSelectionProps {
  quizzes: Record<string, QuizData>
  onSelect: (quizId: string) => void
}

interface QuizResult {
  score: number
  totalQuestions: number
  category: string
  type: string
  userName: string
}

export default function QuizSelection({ quizzes, onSelect }: QuizSelectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedType, setSelectedType] = useState<string>("")
  const [showUsernameModal, setShowUsernameModal] = useState(false)
  const [username, setUsername] = useState("")
  const [selectedQuizId, setSelectedQuizId] = useState<string>("")
  const [error, setError] = useState("")
  const [showResult, setShowResult] = useState(false)
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null)

  useEffect(() => {
    // Check if username exists in localStorage
    const storedUsername = localStorage.getItem('quizUsername')
    if (storedUsername) {
      setUsername(storedUsername)
    }
  }, [])

  const handleQuizSelect = (quizId: string) => {
    if (!username && !localStorage.getItem('quizUsername')) {
      setSelectedQuizId(quizId)
      setShowUsernameModal(true)
    } else {
      onSelect(quizId)
    }
  }

  const handleUsernameSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username.trim().length < 2) {
      setError("Username must be at least 2 characters long")
      return
    }
    localStorage.setItem('quizUsername', username)
    setShowUsernameModal(false)
    if (selectedQuizId) {
      onSelect(selectedQuizId)
    }
  }

  const handleQuizComplete = (result: QuizResult) => {
    setQuizResult(result)
    setShowResult(true)
  }

  // Ensure quizzes is an object
  if (!quizzes || typeof quizzes !== 'object') {
    console.error('Invalid quizzes prop:', quizzes);
    return <div>Error: Invalid quiz data</div>;
  }

  const quizArray = Object.values(quizzes);

  // Get unique categories and types
  const categories = Array.from(new Set(quizArray.map(quiz => quiz.category)));
  const types = Array.from(new Set(quizArray.map(quiz => quiz.type)));

  const filteredQuizzes = quizArray.filter(quiz => {
    if (selectedCategory && quiz.category !== selectedCategory) return false;
    if (selectedType && quiz.type !== selectedType) return false;
    return true;
  });

  return (
    <div className="relative">
      {/* Username Modal */}
      {showUsernameModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <h3 className="text-2xl font-bold mb-4">Enter Your Name</h3>
            <form onSubmit={handleUsernameSubmit}>
              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  setError("")
                }}
                placeholder="Enter your name"
                className="w-full p-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-300 mb-4"
                autoFocus
              />
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setShowUsernameModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Start Quiz
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quiz Result Modal */}
      {showResult && quizResult && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">Quiz Complete!</h3>
              <div className="mb-6">
                <div className="text-6xl font-bold text-blue-600 mb-2">
                  {Math.round((quizResult.score / quizResult.totalQuestions) * 100)}%
                </div>
                <div className="text-xl text-gray-600">
                  {quizResult.score} out of {quizResult.totalQuestions} correct
                </div>
              </div>
              <div className="space-y-2 mb-6 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-semibold">{quizResult.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-semibold">{quizResult.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Player:</span>
                  <span className="font-semibold">{quizResult.userName}</span>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <Link
                  href="/quiz?leaderboard=true"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  View Leaderboard
                </Link>
                <button
                  onClick={() => {
                    setShowResult(false)
                    setQuizResult(null)
                  }}
                  className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6 text-center">Select Your Quiz</h2>
      <div className="mb-8 flex flex-wrap justify-center gap-4">
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="appearance-none w-64 px-4 py-2.5 bg-white text-gray-700 rounded-lg
              border border-gray-200 font-medium shadow-sm"
          >
            <option value="" className="bg-white text-gray-600">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-white text-gray-700">
                {cat}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="relative">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="appearance-none w-64 px-4 py-2.5 bg-white text-gray-700 rounded-lg
              border border-gray-200 font-medium shadow-sm"
          >
            <option value="" className="bg-white text-gray-600">All Types</option>
            {types.map((t) => (
              <option key={t} value={t} className="bg-white text-gray-700">
                {t}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Custom styles for dropdown options */}
      <style jsx>{`
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuizzes.map((quiz) => (
          <div 
            key={quiz._id} 
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
          >
            <button 
              onClick={() => quiz._id && handleQuizSelect(quiz._id)}
              className="w-full p-6 text-left focus:outline-none"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-xl text-blue-800">{quiz.title}</h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full">
                  {quiz.type}
                </span>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  Category: {quiz.category}
                </p>
                <p className="text-gray-600 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                    <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                  {quiz.questions.length} Questions
                </p>
              </div>
            </button>
          </div>
        ))}
      </div>

      {filteredQuizzes.length === 0 && (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-gray-500 text-lg">
            No quizzes found for the selected filters.
          </p>
          <p className="text-gray-400 mt-2">
            Try adjusting your category or type selection.
          </p>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link 
          href="/" 
          className="text-blue-600 hover:text-blue-800 transition-colors flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  )
}
