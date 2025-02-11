"use client";

import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 flex flex-col items-center justify-center text-white p-4 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-pink-300 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 text-center max-w-4xl px-6">
        <h1 className="text-6xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 animate-gradient-x">
          QuizMaster
        </h1>
        
        <p className="text-xl mb-10 text-gray-100 leading-relaxed max-w-2xl mx-auto">
          Embark on an intellectual journey with our diverse quiz challenges. 
          Test your knowledge across multiple domains, learn fascinating facts, 
          and climb the ranks of our competitive leaderboard!
        </p>

        <div className="flex flex-col items-center space-y-6">
          <Link
            href="/quiz"
            className="group relative w-64 px-8 py-4 rounded-full 
            bg-white text-blue-600 font-bold text-lg 
            transform transition-all duration-300 
            hover:-translate-y-1 hover:shadow-2xl 
            flex items-center justify-center space-x-3
            hover:bg-blue-50"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-blue-600 group-hover:rotate-12 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.071 0l-.172.171a3 3 0 01-.636.539l-.472.264a3 3 0 00-1.847 2.537V19h-8v-.5a3 3 0 00-1.847-2.537l-.472-.264a3 3 0 01-.636-.539l-.172-.171z" 
              />
            </svg>
            <span>Start Quizzing</span>
          </Link>
          
          <Link
            href="/quiz?leaderboard=true"
            className="group relative w-64 px-8 py-4 rounded-full 
            bg-green-500 text-white font-bold text-lg 
            transform transition-all duration-300 
            hover:-translate-y-1 hover:shadow-2xl 
            flex items-center justify-center space-x-3
            hover:bg-green-600"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-white group-hover:scale-110 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" 
              />
            </svg>
            <span>View Leaderboard</span>
          </Link>
        </div>
      </div>

      {/* Animated Background Elements */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }

        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-blob {
          animation: blob 10s infinite;
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 10s ease infinite;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}
