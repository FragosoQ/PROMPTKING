
export type View = 'home' | 'multiple-choice' | 'prompt-dev' | 'history' | 'results' | 'tutorials';

// --- Multiple Choice Test Types ---
export interface Question {
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface MCQTest {
  clientProblem: string;
  questions: Question[];
}

export interface MCQAnswerFeedback {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string;
}

export interface MCQResult {
  id: string;
  type: 'Multiple-Choice';
  testData: MCQTest;
  userAnswers: number[];
  score: number;
  feedback: MCQAnswerFeedback[];
  suggestions: string[];
  timestamp: string;
}

// --- Prompt Development Types ---
export interface PromptDevProblem {
  clientProblem: string;
  task: string;
  desiredOutput: string;
}

export interface PromptDevResult {
  id: string;
  type: 'Prompt-Development';
  problem: PromptDevProblem;
  userPrompt: string;
  score: number;
  feedback: string;
  suggestedPrompt: string;
  timestamp: string;
}

// --- Union Type for History ---
export type TestResult = MCQResult | PromptDevResult;