import type { QuizData } from "../types"

export const quizzes: Record<string, QuizData> = {
  generalKnowledge1: {
    title: "General Knowledge: Basics",
    category: "General",
    type: "Basics",
    questions: [
      {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: "Paris",
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
  scienceTechnology1: {
    title: "Science: Physics",
    category: "Science",
    type: "Physics",
    questions: [
      {
        question: "What is the SI unit of force?",
        options: ["Watt", "Joule", "Newton", "Pascal"],
        correctAnswer: "Newton",
      },
      {
        question: "Who developed the theory of relativity?",
        options: ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Niels Bohr"],
        correctAnswer: "Albert Einstein",
      },
      {
        question: "What is the speed of light in vacuum?",
        options: ["299,792 km/s", "300,000 km/s", "299,792,458 m/s", "3,000,000 m/s"],
        correctAnswer: "299,792,458 m/s",
      },
      {
        question: "What is the smallest particle of an element?",
        options: ["Atom", "Electron", "Proton", "Neutron"],
        correctAnswer: "Atom",
      },
      {
        question: "What is the unit of electrical resistance?",
        options: ["Ohm", "Volt", "Ampere", "Watt"],
        correctAnswer: "Ohm",
      },
    ],
  },
  scienceTechnology2: {
    title: "Technology: Computer Science",
    category: "Science",
    type: "Computer Science",
    questions: [
      {
        question: "What does CPU stand for?",
        options: [
          "Central Processing Unit",
          "Computer Personal Unit",
          "Central Processor Unit",
          "Central Peripheral Unit",
        ],
        correctAnswer: "Central Processing Unit",
      },
      {
        question: "Which programming language is known as the 'mother of all languages'?",
        options: ["C", "Java", "Python", "Assembly"],
        correctAnswer: "C",
      },
      {
        question: "What is the smallest unit of digital information?",
        options: ["Byte", "Bit", "Nibble", "Word"],
        correctAnswer: "Bit",
      },
      {
        question: "Who is credited with inventing the World Wide Web?",
        options: ["Tim Berners-Lee", "Bill Gates", "Steve Jobs", "Mark Zuckerberg"],
        correctAnswer: "Tim Berners-Lee",
      },
      {
        question: "What does HTML stand for?",
        options: [
          "Hyper Text Markup Language",
          "High Tech Multi Language",
          "Hyper Transfer Markup Language",
          "Home Tool Markup Language",
        ],
        correctAnswer: "Hyper Text Markup Language",
      },
    ],
  },
  historyQuiz1: {
    title: "History: Ancient Civilizations",
    category: "History",
    type: "Ancient Civilizations",
    questions: [
      {
        question: "Which ancient civilization built the pyramids?",
        options: ["Mayans", "Incas", "Egyptians", "Greeks"],
        correctAnswer: "Egyptians",
      },
      {
        question: "Who was the first Emperor of Rome?",
        options: ["Julius Caesar", "Augustus", "Nero", "Constantine"],
        correctAnswer: "Augustus",
      },
      {
        question: "Which ancient wonder was located in Alexandria, Egypt?",
        options: ["Hanging Gardens", "Colossus of Rhodes", "Lighthouse of Alexandria", "Temple of Artemis"],
        correctAnswer: "Lighthouse of Alexandria",
      },
      {
        question: "What was the main language of the Roman Empire?",
        options: ["Greek", "Latin", "Hebrew", "Aramaic"],
        correctAnswer: "Latin",
      },
      {
        question: "Who was the famous queen of ancient Egypt known for her relationship with Mark Antony?",
        options: ["Nefertiti", "Hatshepsut", "Cleopatra", "Isis"],
        correctAnswer: "Cleopatra",
      },
    ],
  },
  historyQuiz2: {
    title: "History: World Wars",
    category: "History",
    type: "World Wars",
    questions: [
      {
        question: "In which year did World War I begin?",
        options: ["1914", "1915", "1916", "1917"],
        correctAnswer: "1914",
      },
      {
        question: "Who was the leader of Nazi Germany during World War II?",
        options: ["Joseph Stalin", "Winston Churchill", "Adolf Hitler", "Benito Mussolini"],
        correctAnswer: "Adolf Hitler",
      },
      {
        question: "What event directly led to the United States entering World War II?",
        options: [
          "The invasion of Poland",
          "The Battle of Britain",
          "The attack on Pearl Harbor",
          "The fall of France",
        ],
        correctAnswer: "The attack on Pearl Harbor",
      },
      {
        question: "Which country dropped atomic bombs on Hiroshima and Nagasaki?",
        options: ["Soviet Union", "United Kingdom", "United States", "China"],
        correctAnswer: "United States",
      },
      {
        question: "What was the code name for the Allied invasion of Normandy in 1944?",
        options: ["Operation Barbarossa", "Operation Overlord", "Operation Market Garden", "Operation Torch"],
        correctAnswer: "Operation Overlord",
      },
    ],
  },
  literatureQuiz1: {
    title: "Literature: Classic Novels",
    category: "Literature",
    type: "Classic Novels",
    questions: [
      {
        question: "Who wrote 'Pride and Prejudice'?",
        options: ["Jane Austen", "Charlotte Brontë", "Emily Brontë", "Virginia Woolf"],
        correctAnswer: "Jane Austen",
      },
      {
        question: "Which novel begins with the line 'It was the best of times, it was the worst of times'?",
        options: ["Great Expectations", "A Tale of Two Cities", "Oliver Twist", "David Copperfield"],
        correctAnswer: "A Tale of Two Cities",
      },
      {
        question: "Who is the author of 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "John Steinbeck", "F. Scott Fitzgerald", "Ernest Hemingway"],
        correctAnswer: "Harper Lee",
      },
      {
        question: "What is the name of the protagonist in 'The Catcher in the Rye'?",
        options: ["Holden Caulfield", "Jay Gatsby", "Atticus Finch", "Scout Finch"],
        correctAnswer: "Holden Caulfield",
      },
      {
        question: "Who wrote '1984'?",
        options: ["Aldous Huxley", "Ray Bradbury", "George Orwell", "Kurt Vonnegut"],
        correctAnswer: "George Orwell",
      },
    ],
  },
  literatureQuiz2: {
    title: "Literature: Shakespeare",
    category: "Literature",
    type: "Shakespeare",
    questions: [
      {
        question: "Which Shakespeare play features the character Othello?",
        options: ["Macbeth", "Hamlet", "Othello", "King Lear"],
        correctAnswer: "Othello",
      },
      {
        question: "In which city is 'Romeo and Juliet' set?",
        options: ["Venice", "Rome", "Verona", "Florence"],
        correctAnswer: "Verona",
      },
      {
        question: "Who speaks the famous 'To be, or not to be' soliloquy?",
        options: ["Macbeth", "Hamlet", "King Lear", "Othello"],
        correctAnswer: "Hamlet",
      },
      {
        question: "Which of these is not one of Shakespeare's comedies?",
        options: ["Twelfth Night", "As You Like It", "Macbeth", "A Midsummer Night's Dream"],
        correctAnswer: "Macbeth",
      },
      {
        question: "What is the name of the king in 'King Lear'?",
        options: ["Lear", "Duncan", "Claudius", "Richard"],
        correctAnswer: "Lear",
      },
    ],
  },
}

