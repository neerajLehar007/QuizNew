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
    questions: [],
  });
  const [questionText, setQuestionText] = useState("");
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

  const parseQuestionText = (text: string) => {
    const questions = [];
    const lines = text.trim().split('\n').map(line => line.trim()).filter(line => line);
    let currentQuestion: any = null;

    for (const line of lines) {
      // Start of a new question
      const questionMatch = line.match(/^\d+\.\s*(.+)/);
      if (questionMatch) {
        // If there's a previous question, add it to the list
        if (currentQuestion) {
          if (!currentQuestion.options || currentQuestion.options.length !== 4 || !currentQuestion.correctAnswer) {
            throw new Error(`Invalid question format: ${JSON.stringify(currentQuestion)}`);
          }
          questions.push(currentQuestion);
        }
        
        // Start a new question
        currentQuestion = {
          question: questionMatch[1],
          options: [],
          correctAnswer: ""
        };
        continue;
      }

      // Parsing options (more flexible parsing)
      const optionMatch = line.match(/^([A-D])\)\s*(.+)/i);
      if (optionMatch && currentQuestion) {
        currentQuestion.options.push(optionMatch[2].trim());
        continue;
      }

      // Parsing answer (more flexible parsing)
      const answerMatch = line.match(/^Answer:\s*([A-D])/i);
      if (answerMatch && currentQuestion) {
        const answerIndex = answerMatch[1].toUpperCase().charCodeAt(0) - 65;
        currentQuestion.correctAnswer = currentQuestion.options[answerIndex];
        continue;
      }
    }

    // Add the last question
    if (currentQuestion) {
      if (!currentQuestion.options || currentQuestion.options.length !== 4 || !currentQuestion.correctAnswer) {
        throw new Error(`Invalid question format: ${JSON.stringify(currentQuestion)}`);
      }
      questions.push(currentQuestion);
    }

    return questions;
  };

  const handleParseQuestions = () => {
    try {
      const parsedQuestions = parseQuestionText(questionText);
      setNewQuiz({
        ...newQuiz,
        questions: [...newQuiz.questions, ...parsedQuestions]
      });
      setQuestionText(""); // Clear the input after successful parsing
      setError("");
    } catch (error) {
      console.error('Error parsing questions:', error);
      setError(error instanceof Error ? error.message : "Failed to parse questions. Please check the format.");
    }
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

    // Validate that quiz has a title, category, type, and at least one question
    if (!newQuiz.title || !newQuiz.category || !newQuiz.type || newQuiz.questions.length === 0) {
      setError("Please fill in all fields and add at least one question");
      setIsSubmitting(false);
      return;
    }

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
          questions: [],
        });
        setQuestionText("");
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

  const handleRemoveQuestion = (indexToRemove: number) => {
    setNewQuiz({
      ...newQuiz,
      questions: newQuiz.questions.filter((_, index) => index !== indexToRemove)
    });
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

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
                  {error}
                </div>
              )}

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Add Questions (Format:
                  <pre className="bg-gray-100 p-2 rounded mt-2 text-sm">
{`1. Question text
A) Option1
B) Option2
C) Option3
D) Option4
Answer: B

2. Next question text
A) Option1
B) Option2
C) Option3
D) Option4
Answer: C`}
                  </pre>
                </label>
                <textarea
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  className="w-full p-2 border rounded min-h-[300px]"
                  placeholder="Enter multiple questions in the specified format..."
                />
                <button
                  type="button"
                  onClick={handleParseQuestions}
                  className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Add Questions
                </button>
              </div>

              {newQuiz.questions.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-2">Added Questions:</h3>
                  {newQuiz.questions.map((q, idx) => (
                    <div key={idx} className="mb-2 p-2 border rounded flex justify-between items-start">
                      <div>
                        <p><strong>Q{idx + 1}:</strong> {q.question}</p>
                        <div className="ml-4">
                          {q.options.map((opt, optIdx) => (
                            <p 
                              key={optIdx} 
                              className={q.correctAnswer === opt ? "text-green-600 font-bold" : ""}
                            >
                              {String.fromCharCode(65 + optIdx)}) {opt}
                            </p>
                          ))}
                          <p className="text-blue-600 font-semibold">
                            Answer: {String.fromCharCode(q.options.indexOf(q.correctAnswer) + 65)}
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveQuestion(idx)}
                        className="text-red-500 hover:text-red-700"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Save Quiz'}
              </button>
            </form>
          </div>

          {/* Existing Quizzes */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6">Existing Quizzes</h2>
            {existingQuizzes.length === 0 ? (
              <p className="text-gray-500">No quizzes found</p>
            ) : (
              <div className="space-y-4">
                {existingQuizzes.map((quiz) => (
                  <div key={quiz._id} className="border rounded p-4">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h3 className="font-bold">{quiz.title}</h3>
                        <p className="text-sm text-gray-600">
                          Category: {quiz.category} | Type: {quiz.type}
                        </p>
                        <p className="text-sm text-gray-600">
                          Questions: {quiz.questions.length}
                        </p>
                      </div>
                      <button
                        onClick={() => handleDeleteQuiz(quiz._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
