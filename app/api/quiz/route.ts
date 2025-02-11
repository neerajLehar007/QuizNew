import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Quiz from '@/models/Quiz';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    const quiz = await Quiz.create(data);
    return NextResponse.json({ success: true, quiz });
  } catch (error) {
    console.error('Error saving quiz:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save quiz' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const quizzes = await Quiz.find({}).lean().exec();
    
    if (!quizzes) {
      return NextResponse.json(
        { success: false, error: 'No quizzes found' },
        { status: 404 }
      );
    }

    // Transform _id to string and ensure it's included in each quiz
    const transformedQuizzes = quizzes.map(quiz => ({
      ...quiz,
      _id: quiz._id.toString()
    }));

    return NextResponse.json({ 
      success: true, 
      quizzes: transformedQuizzes 
    });
  } catch (error) {
    console.error('Error fetching quizzes:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch quizzes' },
      { status: 500 }
    );
  }
}
