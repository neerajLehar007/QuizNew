import type { QuizData } from "../types"

export const quizzes: Record<string, QuizData> = {
  generalKnowledge1: {
    title: "Computer Science",
    category: "computer",
    type: "Basics",
    questions: [
      {
        question: "Which of the following is an input device?",
        options: ["A) Speaker", "B) Monitor", "C) Printer", "D) Keyboard"],
        correctAnswer: "D) Keyboard",
      },
      {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Jupiter", "Saturn"],
        correctAnswer: "Mars",
      },
      {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
        correctAnswer: "Leonardo da Vinci",
      },
      {
        question: "What is the largest mammal in the world?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correctAnswer: "Blue Whale",
      },
      {
        question: "In which year did World War II end?",
        options: ["1943", "1944", "1945", "1946"],
        correctAnswer: "1945",
      },
    ],
  },
  generalKnowledge2: {
    title: "General Knowledge: Trivia",
    category: "General",
    type: "Trivia",
    questions: [
      {
        question: "What is the smallest country in the world?",
        options: ["Monaco", "San Marino", "Vatican City", "Liechtenstein"],
        correctAnswer: "Vatican City",
      },
      {
        question: "Which element has the chemical symbol 'O'?",
        options: ["Gold", "Silver", "Oxygen", "Iron"],
        correctAnswer: "Oxygen",
      },
      {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "Mark Twain", "John Steinbeck", "F. Scott Fitzgerald"],
        correctAnswer: "Harper Lee",
      },
      {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: "Pacific Ocean",
      },
      {
        question: "In what year did the Titanic sink?",
        options: ["1910", "1912", "1915", "1920"],
        correctAnswer: "1912",
      },
    ],
  },

