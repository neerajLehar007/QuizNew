export interface QuestionData {
  question: string
  options: string[]
  correctAnswer: string
}

export interface QuizData {
  title: string
  category: string
  type: string
  questions: QuestionData[]
}

export interface LeaderboardEntry {
  name: string
  score: number
  category: string
  type: string
}

