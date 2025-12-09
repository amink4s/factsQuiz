export interface TriviaQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number; // 0-3
  funFact?: string;
}

export type GameStatus = 'idle' | 'loading' | 'playing' | 'finished' | 'error';

export interface GameState {
  status: GameStatus;
  questions: TriviaQuestion[];
  currentQuestionIndex: number;
  score: number;
  answers: number[]; // Array of user selected indices
}
