"use client"

import { useState, useEffect } from "react"
import QuizSelection from "../components/QuizSelection"
import Quiz from "../components/Quiz"
import Leaderboard from "../components/Leaderboard"
import Link from "next/link"
import type { QuizData } from "../types"

export default function QuizApp() {
  const [selectedQuiz, setSelectedQuiz] = useState<string | null>(null)
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [leaderboardCategory, setLeaderboardCategory] = useState<string | undefined>(undefined)
  const [leaderboardType, setLeaderboardType] = useState<string | undefined>(undefined)
  const [quizzes, setQuizzes] = useState<QuizData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentQuiz, setCurrentQuiz] = useState<QuizData | null>(null)

  // Fetch all quizzes
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/quiz');
        const data = await response.json();
        
        if (data.success && Array.isArray(data.quizzes)) {
          // Ensure each quiz has an _id
          const validQuizzes = data.quizzes.filter((quiz: any) => quiz && quiz._id);
          setQuizzes(validQuizzes);
        } else {
          console.error('Invalid quiz data:', data);
          setError('Failed to fetch quizzes');
        }
      } catch (error) {
        console.error('Error loading quizzes:', error);
        setError('Error loading quizzes');
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  // Fetch specific quiz when selected
  useEffect(() => {
    const fetchQuiz = async () => {
      if (selectedQuiz) {
        try {
          const response = await fetch(`/api/quiz/${selectedQuiz}`);
          const data = await response.json();
          
          if (data.success && data.quiz && data.quiz._id) {
            setCurrentQuiz(data.quiz);
          } else {
            console.error('Invalid quiz data:', data);
            setError('Failed to fetch quiz');
          }
        } catch (error) {
          console.error('Error loading quiz:', error);
          setError('Error loading quiz');
        }
      } else {
        setCurrentQuiz(null);
      }
    };

    fetchQuiz();
  }, [selectedQuiz]);

  const handleQuizSelect = (quizId: string) => {
    setSelectedQuiz(quizId)
    setShowLeaderboard(false)
  }

  const handleQuizComplete = () => {
    setSelectedQuiz(null)
    setShowLeaderboard(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading quizzes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  if (!Array.isArray(quizzes)) {
    console.error('Quizzes is not an array:', quizzes);
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl text-red-500">Error: Invalid quiz data</div>
      </div>
    );
  }

  // Get unique categories and types
  const categories = Array.from(new Set(quizzes.map(quiz => quiz.category)));
  const types = Array.from(new Set(quizzes.map(quiz => quiz.type)));

  // Convert array to record for QuizSelection
  const quizzesRecord = quizzes.reduce<Record<string, QuizData>>((acc, quiz) => {
    if (quiz._id) {
      acc[quiz._id] = quiz;
    }
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">QuizMaster</h1>
          <Link href="/" className="text-blue-500 hover:text-blue-600">
            Home
          </Link>
        </div>
        {selectedQuiz && currentQuiz ? (
          <Quiz quiz={currentQuiz} onComplete={handleQuizComplete} />
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
          </>
        ) : (
          <QuizSelection quizzes={quizzesRecord} onSelect={handleQuizSelect} />
        )}
      </div>
    </div>
  )
}
