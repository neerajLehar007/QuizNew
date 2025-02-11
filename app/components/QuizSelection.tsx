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
      <h2 className="text-xl font-semibold mb-4">Select a Quiz</h2>
      <div className="mb-6 flex gap-4">
        <select
          className="p-2 border rounded flex-1"
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
          className="p-2 border rounded flex-1"
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredQuizzes.map((quiz) => (
          <button
            key={quiz._id}
            onClick={() => quiz._id && onSelect(quiz._id)}
            className="p-4 border rounded-lg hover:bg-blue-50 transition-colors text-left"
          >
            <h3 className="font-bold text-lg mb-2">{quiz.title}</h3>
            <p className="text-gray-600 text-sm mb-1">Category: {quiz.category}</p>
            <p className="text-gray-600 text-sm mb-1">Type: {quiz.type}</p>
            <p className="text-gray-600 text-sm">{quiz.questions.length} Questions</p>
          </button>
        ))}
        {filteredQuizzes.length === 0 && (
          <p className="text-gray-500 col-span-2 text-center py-4">
            No quizzes found for the selected filters.
          </p>
        )}
      </div>
      <div className="mt-4">
        <Link href="/" className="text-blue-500 hover:text-blue-600">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
