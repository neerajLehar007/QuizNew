import { useState } from "react"
import type { QuizData } from "../types"
import Link from "next/link"

interface QuizSelectionProps {
  quizzes: Record<string, QuizData>
  onSelect: (quizId: string) => void
}

export default function QuizSelection({ quizzes, onSelect }: QuizSelectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedType, setSelectedType] = useState<string>("")

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
    <div>
      <h2 className="text-2xl font-bold mb-6 text-center">Select Your Quiz</h2>
      <div className="mb-8 flex justify-center gap-4">
        <select
          className="p-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-300 transition-all duration-300 text-gray-700"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          className="p-3 border-2 border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-300 transition-all duration-300 text-gray-700"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="">All Types</option>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuizzes.map((quiz) => (
          <div 
            key={quiz._id} 
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
          >
            <button 
              onClick={() => quiz._id && onSelect(quiz._id)}
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
