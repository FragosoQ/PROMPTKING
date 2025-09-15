
import { GoogleGenAI, Type } from "@google/genai";
import type { Question, PromptDevProblem, MCQTest } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const mcqSchema = {
  type: Type.OBJECT,
  properties: {
    clientProblem: {
      type: Type.STRING,
      description: "A realistic client problem scenario for a prompt engineer."
    },
    questions: {
      type: Type.ARRAY,
      description: "An array of 5 multiple-choice questions about the scenario.",
      items: {
        type: Type.OBJECT,
        properties: {
          questionText: {
            type: Type.STRING,
            description: "The text of the question."
          },
          options: {
            type: Type.ARRAY,
            description: "An array of 4 string options for the question.",
            items: { type: Type.STRING }
          },
          correctAnswerIndex: {
            type: Type.INTEGER,
            description: "The 0-based index of the correct answer in the options array."
          }
        },
        required: ["questionText", "options", "correctAnswerIndex"]
      }
    }
  },
  required: ["clientProblem", "questions"]
};

const mcqEvaluationSchema = {
    type: Type.OBJECT,
    properties: {
        feedback: {
            type: Type.ARRAY,
            description: "Feedback for each question answered by the user.",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "The original question text." },
                    userAnswer: { type: Type.STRING, description: "The answer the user selected." },
                    correctAnswer: { type: Type.STRING, description: "The correct answer." },
                    isCorrect: { type: Type.BOOLEAN },
                    explanation: { type: Type.STRING, description: "A detailed explanation for why the user's answer was right or wrong." },
                },
                required: ["question", "userAnswer", "correctAnswer", "isCorrect", "explanation"],
            },
        },
        suggestions: {
            type: Type.ARRAY,
            description: "Three actionable suggestions for the student to improve their prompting skills.",
            items: { type: Type.STRING },
        },
    },
    required: ["feedback", "suggestions"],
};

const promptDevProblemSchema = {
    type: Type.OBJECT,
    properties: {
        clientProblem: { type: Type.STRING, description: "A summary of the client's business or situation." },
        task: { type: Type.STRING, description: "The specific task the client wants the AI to perform." },
        desiredOutput: { type: Type.STRING, description: "A description of the desired format or content of the AI's output." },
    },
    required: ["clientProblem", "task", "desiredOutput"],
};

const promptDevEvaluationSchema = {
    type: Type.OBJECT,
    properties: {
        score: { type: Type.INTEGER, description: "A score from 1-100 evaluating the prompt's effectiveness." },
        feedback: { type: Type.STRING, description: "Detailed feedback explaining the score, covering clarity, specificity, and effectiveness." },
        suggestedPrompt: { type: Type.STRING, description: "An improved version of the student's prompt." },
    },
    required: ["score", "feedback", "suggestedPrompt"],
};

export async function generateMultipleChoiceTest(language: 'en' | 'pt'): Promise<MCQTest> {
  const langInstruction = `IMPORTANT: Your entire response, including the client problem, all questions, and all options, must be in ${language === 'pt' ? 'Portuguese' : 'English'}.`;
  
  const prompt = `You are an AI assistant creating educational content for aspiring prompt engineers. ${langInstruction} Generate a unique and realistic client problem scenario and 5 multiple-choice questions based on it. The questions should test knowledge of prompt engineering techniques like Zero-shot, Few-shot, Chain-of-Thought, persona adoption, or formatting instructions. For each question, provide 4 options and indicate the correct answer's index.`;
  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: mcqSchema,
    },
  });

  return JSON.parse(response.text);
}

export async function evaluateMultipleChoiceAnswers(test: MCQTest, userAnswers: number[], language: 'en' | 'pt') {
    const detailedAnswers = test.questions.map((q, i) => ({
        question: q.questionText,
        userAnswer: q.options[userAnswers[i]],
        correctAnswer: q.options[q.correctAnswerIndex]
    }));

    const langInstruction = `IMPORTANT: Your entire response, including all explanations and suggestions, must be in ${language === 'pt' ? 'Portuguese' : 'English'}.`;

    const prompt = `You are an AI assistant evaluating a student's multiple-choice test on prompt engineering. 
    ${langInstruction}

    Here is the test context:
    Client Problem: "${test.clientProblem}"
    
    Here are the student's answers:
    ${JSON.stringify(detailedAnswers, null, 2)}
    
    For each question, determine if the user's answer was correct. Provide a clear explanation for why the answer was correct or incorrect, referencing the client problem. 
    Finally, provide 3 actionable, encouraging suggestions for the student to improve their prompting skills based on their performance.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: mcqEvaluationSchema,
        },
      });

    return JSON.parse(response.text);
}

export async function generatePromptProblem(language: 'en' | 'pt'): Promise<PromptDevProblem> {
    const langInstruction = `IMPORTANT: Your entire response (clientProblem, task, and desiredOutput) must be in ${language === 'pt' ? 'Portuguese' : 'English'}.`;

    const prompt = `You are an AI assistant creating educational content. ${langInstruction} Generate a realistic but concise client problem scenario for a beginner prompt engineer. Describe the client's business, the specific task, and the desired output format.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: promptDevProblemSchema,
        },
      });

    return JSON.parse(response.text);
}


export async function evaluateUserPrompt(problem: PromptDevProblem, userPrompt: string, language: 'en' | 'pt') {
    const langInstruction = `IMPORTANT: Your entire response (feedback and suggested prompt) must be in ${language === 'pt' ? 'Portuguese' : 'English'}.`;
    
    const prompt = `You are an expert prompt engineering instructor. ${langInstruction} A student was given the following client problem:
    - Client: ${problem.clientProblem}
    - Task: ${problem.task}
    - Desired Output: ${problem.desiredOutput}

    The student wrote this prompt: "${userPrompt}"

    Evaluate the student's prompt on a scale of 1-100 based on its clarity, specificity, inclusion of constraints, persona adoption (if applicable), and overall potential effectiveness for the given task. Provide detailed, constructive feedback explaining the score, highlighting what was done well and what could be improved. Offer a revised, more effective version of the prompt that an expert would write.`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: promptDevEvaluationSchema,
        },
      });
      
    return JSON.parse(response.text);
}
