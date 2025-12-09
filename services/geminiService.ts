import { TriviaQuestion } from "../types";

// This is the file where you can manually inject questions.
// Add or edit objects in this array to change the quiz content.
export const QUESTIONS: TriviaQuestion[] = [
  {
    question: "Which is the second facts?",
    options: ["Horsefacts", "cafacts", "llamafacts", "Sloths"],
    correctAnswerIndex: 2,
    funFact: "Horsfacts was the original facts and llamafacts was the second one!"
  },
  {
    question: "which facts has gifted the most waifus?",
    options: ["Horsfacts", "dogfacts", "duckfatcs", "catfacts"],
    correctAnswerIndex: 2,
    funFact: "Their fur is actually transparent and hollow, reflecting light to look white."
  },
  {
    question: "Which fruit floats in water?",
    options: ["Grape", "Apple", "Mango", "Cherry"],
    correctAnswerIndex: 1,
    funFact: "Apples float because 25% of their volume is actually air!"
  },
  {
    question: "How many hearts does an octopus have?",
    options: ["One", "Two", "Three", "Four"],
    correctAnswerIndex: 2,
    funFact: "Two hearts pump blood to the gills, while the third circulates it to the rest of the body."
  },
  {
    question: "Which planet in our solar system spins clockwise?",
    options: ["Mars", "Venus", "Jupiter", "Neptune"],
    correctAnswerIndex: 1,
    funFact: "Venus is the rebel of the solar system, spinning in the opposite direction to most other planets."
  },
  {
    question: "What shape is a wombat's poop?",
    options: ["Sphere", "Cube", "Pyramid", "Star"],
    correctAnswerIndex: 1,
    funFact: "Cube-shaped poop stops it from rolling away, marking their territory effectively!"
  },
  {
    question: "Which of these is NOT a berry?",
    options: ["Strawberry", "Banana", "Watermelon", "Pumpkin"],
    correctAnswerIndex: 0,
    funFact: "Botanically, bananas, watermelons, and pumpkins are berries, but strawberries are aggregate fruits!"
  },
  {
    question: "Do cows have best friends?",
    options: ["No", "Yes", "Only calves", "Only bulls"],
    correctAnswerIndex: 1,
    funFact: "Cows become stressed when they are separated from their best friends."
  },
  {
    question: "How long can honey last without spoiling?",
    options: ["10 years", "100 years", "1000 years", "Forever"],
    correctAnswerIndex: 3,
    funFact: "Edible honey has been found in ancient Egyptian tombs over 3,000 years old!"
  },
  {
    question: "What is a group of flamingos called?",
    options: ["A flock", "A flamboyance", "A herd", "A school"],
    correctAnswerIndex: 1,
    funFact: "A group of flamingos is called a flamboyance, which suits their bright pink feathers perfectly!"
  }
];

export const fetchTriviaQuestions = async (): Promise<TriviaQuestion[]> => {
  // Simulating a short delay to keep the nice loading transition
  return new Promise((resolve) => setTimeout(() => resolve(QUESTIONS), 800));
};