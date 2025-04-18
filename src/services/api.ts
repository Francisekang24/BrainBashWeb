
// api.ts
// Service to fetch trivia questions from Open Trivia Database

export interface TriviaQuestion {
    category: string;
    type: 'multiple' | 'boolean';
    difficulty: 'easy' | 'medium' | 'hard';
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export interface TriviaResponse {
    response_code: number;
    results: TriviaQuestion[];
}

/**
 * Fetches trivia questions from the Open Trivia Database
 * @param amount Number of questions to fetch (default: 10)
 * @param category Category ID (optional)
 * @param difficulty Difficulty level (optional)
 * @param type Question type (optional)
 * @returns Promise with trivia questions
 */
export async function fetchQuestions(
    amount: number = 10,
    category?: number,
    difficulty?: 'easy' | 'medium' | 'hard',
    type?: 'multiple' | 'boolean'
): Promise<TriviaQuestion[]> {
    let url = `https://opentdb.com/api.php?amount=${amount}`;
    
    if (category) url += `&category=${category}`;
    if (difficulty) url += `&difficulty=${difficulty}`;
    if (type) url += `&type=${type}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data: TriviaResponse = await response.json();
        
        if (data.response_code !== 0) {
            throw new Error(`API error! Code: ${data.response_code}`);
        }
        
        return data.results;
    } catch (error) {
        console.error('Error fetching trivia questions:', error);
        throw error;
    }
}