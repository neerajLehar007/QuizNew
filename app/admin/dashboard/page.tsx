"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { QuizData } from "../../types";

export default function AdminDashboard() {
  const router = useRouter();
  const [newQuiz, setNewQuiz] = useState<QuizData>({
    title: "",
    category: "",
    type: "",
    questions: [
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      },
    ],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [existingQuizzes, setExistingQuizzes] = useState<(QuizData & { _id: string })[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAdmin = document.cookie.includes('adminAuth=true');
    if (!isAdmin) {
      router.push("/admin");
      return;
    }
    fetchQuizzes();
  }, [router]);

  const fetchQuizzes = async () => {
    try {
      const response = await fetch('/api/quiz');
      const data = await response.json();
      if (data.success) {
        setExistingQuizzes(data.quizzes);
      } else {
        setError('Failed to fetch quizzes');
      }
    } catch (error) {
      setError('Error loading quizzes');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    document.cookie = "adminAuth=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    router.push("/admin");
  };

  const handleAddQuestion = () => {
    setNewQuiz({
      ...newQuiz,
      questions: [
        ...newQuiz.questions,
        {
          question: "",
          options: ["", "", "", ""],
          correctAnswer: "",
        },
      ],
    });
  };

  const handleQuestionChange = (index: number, field: string, value: string) => {
    const updatedQuestions = [...newQuiz.questions];
    if (field === "question") {
      updatedQuestions[index].question = value;
    } else if (field === "correctAnswer") {
      updatedQuestions[index].correctAnswer = value;
    }
    setNewQuiz({ ...newQuiz, questions: updatedQuestions });
  };

  const handleOptionChange = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const updatedQuestions = [...newQuiz.questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setNewQuiz({ ...newQuiz, questions: updatedQuestions });
  };

  const handleDeleteQuiz = async (quizId: string) => {
    if (!confirm('Are you sure you want to delete this quiz?')) return;
    
    try {
      const response = await fetch(`/api/quiz/${quizId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        fetchQuizzes(); // Refresh the list
        alert('Quiz deleted successfully!');
      } else {
        alert('Failed to delete quiz');
      }
    } catch (error) {
      console.error('Error deleting quiz:', error);
      alert('Error deleting quiz');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch('/api/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newQuiz),
      });

      const data = await response.json();

      if (data.success) {
        alert('Quiz added successfully!');
        // Reset form
        setNewQuiz({
          title: "",
          category: "",
          type: "",
          questions: [
            {
              question: "",
              options: ["", "", "", ""],
              correctAnswer: "",
            },
          ],
        });
        // Refresh quiz list
        fetchQuizzes();
      } else {
        setError(data.error || 'Failed to save quiz');
      }
    } catch (error) {
      setError('Failed to save quiz. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add New Quiz Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Add New Quiz</h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Quiz Title
                  </label>
                  <input
                    type="text"
                    value={newQuiz.title}
                    onChange={(e) =>
                      setNewQuiz({ ...newQuiz, title: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    value={newQuiz.category}
                    onChange={(e) =>
                      setNewQuiz({ ...newQuiz, category: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Type
                  </label>
                  <input
                    type="text"
                    value={newQuiz.type}
                    onChange={(e) =>
                      setNewQuiz({ ...newQuiz, type: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>

              <div className="space-y-6">
                {newQuiz.questions.map((question, qIndex) => (
                  <div key={qIndex} className="border p-4 rounded">
                    <h3 className="font-bold mb-4">Question {qIndex + 1}</h3>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Question Text
                      </label>
                      <input
                        type="text"
                        value={question.question}
                        onChange={(e) =>
                          handleQuestionChange(qIndex, "question", e.target.value)
                        }
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      {question.options.map((option, oIndex) => (
                        <div key={oIndex}>
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Option {oIndex + 1}
                          </label>
                          <input
                            type="text"
                            value={option}
                            onChange={(e) =>
                              handleOptionChange(qIndex, oIndex, e.target.value)
                            }
                            className="w-full p-2 border rounded"
                            required
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Correct Answer
                      </label>
                      <input
                        type="text"
                        value={question.correctAnswer}
                        onChange={(e) =>
                          handleQuestionChange(qIndex, "correctAnswer", e.target.value)
                        }
                        className="w-full p-2 border rounded"
                        required
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-4">
                {error && (
                  <div className="text-red-500 mb-4">{error}</div>
                )}
                <button
                  type="button"
                  onClick={handleAddQuestion}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Add Question
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Saving...' : 'Save Quiz'}
                </button>
              </div>
            </form>
          </div>

          {/* Existing Quizzes List */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Existing Quizzes</h2>
            <div className="space-y-4">
              {existingQuizzes.map((quiz) => (
                <div key={quiz._id} className="border p-4 rounded">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">{quiz.title}</h3>
                      <p className="text-sm text-gray-600">Category: {quiz.category}</p>
                      <p className="text-sm text-gray-600">Type: {quiz.type}</p>
                      <p className="text-sm text-gray-600">
                        Questions: {quiz.questions.length}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteQuiz(quiz._id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              {existingQuizzes.length === 0 && (
                <p className="text-gray-500">No quizzes found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
