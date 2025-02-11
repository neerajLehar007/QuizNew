const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

async function checkQuizzes() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected successfully!');

    const Quiz = mongoose.models.Quiz || mongoose.model('Quiz', new mongoose.Schema({}, { strict: false }));
    
    const quizzes = await Quiz.find({});
    console.log('Found quizzes:', JSON.stringify(quizzes, null, 2));
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

checkQuizzes();
