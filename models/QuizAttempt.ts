import mongoose from 'mongoose';

const QuizAttemptSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  answers: [{
    questionIndex: Number,
    selectedAnswer: String,
    isCorrect: Boolean
  }]
}, {
  timestamps: true
});

export default mongoose.models.QuizAttempt || mongoose.model('QuizAttempt', QuizAttemptSchema);
