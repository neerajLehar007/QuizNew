import mongoose from 'mongoose';
import { quizzes } from '../app/data/quizzes.ts';

const MONGODB_URI = "mongodb+srv://quizapp:quizapp123@cluster0.elib1.mongodb.net/quiz-app";

// Define Quiz Schema
const QuestionSchema = new mongoose.Schema({
  question: String,
  options: [String],
  correctAnswer: String
});

const QuizSchema = new mongoose.Schema({
  title: String,
  category: String,
  type: String,
  questions: [QuestionSchema]
}, { timestamps: true });

// Create Quiz model
const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', QuizSchema);

async function migrateQuizzes() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Convert quizzes object to array
    const quizzesArray = Object.entries(quizzes).map(([_, quiz]) => quiz);
    console.log(`Found ${quizzesArray.length} quizzes to migrate`);

    // Insert all quizzes
    const result = await Quiz.insertMany(quizzesArray);
    console.log(`Successfully migrated ${result.length} quizzes`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateQuizzes();
