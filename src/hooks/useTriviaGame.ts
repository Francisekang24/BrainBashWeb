import { useEffect, useState } from "react";
import { fetchQuestions, TriviaQuestion } from "../services/api";

export function useTriviaGame(
  amount: number = 10,
  category: number = 9,
  difficulty: 'easy' | 'medium' | 'hard' = 'easy',
  type: 'multiple' | 'boolean' = 'multiple'
) {
  const [questions, setQuestions] = useState<TriviaQuestion[]>([]);
  const [shuffledAnswers, setShuffledAnswers] = useState<string[][]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrivia();
  }, []);

  const fetchTrivia = async () => {
    setLoading(true);
    try {
      const data = await fetchQuestions(amount, category, difficulty, type);
      setQuestions(data);
      setShuffledAnswers(
        data.map((q) =>
          [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5)
        )
      );
    } catch (error) {
      console.error("Trivia fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const restartTrivia = () => {
    fetchTrivia();
  };

  return { questions, shuffledAnswers, loading, restartTrivia };
}