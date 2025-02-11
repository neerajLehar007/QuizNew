import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-5xl font-bold mb-6">Welcome to QuizMaster</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Challenge yourself with our diverse range of quizzes across multiple categories. Test your knowledge, learn new
        facts, and compete for the top spot on our leaderboard!
      </p>
      <div className="flex flex-col items-center space-y-4">
        <Link
          href="/quiz"
          className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-100 transition-colors"
        >
          Start Quizzing
        </Link>
        <Link
          href="/quiz?leaderboard=true"
          className="bg-green-500 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors"
        >
          View Leaderboard
        </Link>
      </div>
    </div>
  )
}
