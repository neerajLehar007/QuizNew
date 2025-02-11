export interface QuestionData {
  question: string
  options: string[]
  correctAnswer: string
}

export interface QuizData {
  _id?: string
  title: string
  category: string
  type: string
  questions: QuestionData[]
}

export interface LeaderboardEntry {
  userName: string
  score: number
  totalQuestions: number
  category: string
  type: string
  createdAt: string
}
