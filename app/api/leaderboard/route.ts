import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import QuizAttempt from '@/models/QuizAttempt'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const quizId = searchParams.get('quizId')

    if (!quizId) {
      return NextResponse.json({ success: false, error: 'Quiz ID is required' })
    }

    await dbConnect()

    const attempts = await QuizAttempt.find({ quizId })
      .sort({ score: -1, timestamp: -1 })
      .limit(10)
      .select('userName score totalQuestions timestamp')
      .lean()

    return NextResponse.json({
      success: true,
      leaderboard: attempts
    })
  } catch (error) {
    console.error('Leaderboard error:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch leaderboard' })
  }
}