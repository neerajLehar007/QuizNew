import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import QuizAttempt from '@/models/QuizAttempt';

export async function POST(request: Request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    const attempt = await QuizAttempt.create(data);
    return NextResponse.json({ success: true, attempt });
  } catch (error) {
    console.error('Error saving quiz attempt:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save quiz attempt' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const type = searchParams.get('type');
    
    const query: any = {};
    if (category) query.category = category;
    if (type) query.type = type;
    
    const attempts = await QuizAttempt.find(query)
      .sort({ score: -1, createdAt: -1 })
      .limit(10);
      
    return NextResponse.json({ success: true, attempts });
  } catch (error) {
    console.error('Error fetching quiz attempts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch quiz attempts' },
      { status: 500 }
    );
  }
}
