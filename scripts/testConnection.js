const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://quizapp:quizapp123@cluster0.elib1.mongodb.net/quiz-app";

async function run() {
  try {
    const client = new MongoClient(uri);
    console.log('Connecting to MongoDB...');
    await client.connect();
    console.log('Connected successfully!');
    
    const db = client.db('quiz-app');
    const collection = db.collection('quizzes');
    const count = await collection.countDocuments();
    console.log(`Number of documents in quizzes collection: ${count}`);
    
    await client.close();
  } catch (error) {
    console.error('Error:', error);
  }
}

run();
