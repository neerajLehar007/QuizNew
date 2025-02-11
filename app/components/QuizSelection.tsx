import type { QuizData } from "../types"
import Link from "next/link"

interface QuizSelectionProps {
  quizzes: Record<string, QuizData>
  onSelectQuiz: (quizId: string) => void
}

export default function QuizSelection({ quizzes, onSelectQuiz }: QuizSelectionProps) {
  const categories = Array.from(new Set(Object.values(quizzes).map((quiz) => quiz.category)))

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Select a Quiz</h2>
      {categories.map((category) => (
        <div key={category} className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{category}</h3>
          {Array.from(
            new Set(
              Object.values(quizzes)
                .filter((quiz) => quiz.category === category)
                .map((quiz) => quiz.type),
            ),
          ).map((type) => (
            <div key={`${category}-${type}`} className="mb-4">
              <h4 className="text-md font-medium mb-2">{type}</h4>
              <div className="space-y-2">
                {Object.entries(quizzes)
                  .filter(([_, quiz]) => quiz.category === category && quiz.type === type)
                  .map(([id, quiz]) => (
                    <button
                      key={id}
                      className="w-full p-3 text-left rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                      onClick={() => onSelectQuiz(id)}
                    >
                      {quiz.title}
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      ))}
      <div className="mt-4">
        <Link href="/" className="text-blue-500 hover:text-blue-600">
          Back to Home
        </Link>
      </div>
    </div>
  )
}

