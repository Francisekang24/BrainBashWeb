import { useState } from "react"
import { useTriviaGame } from "../hooks/useTriviaGame"
import { GameCompleted, GamePlay } from "../components/Gamestyles"

export default function Endless() {
    const { questions, shuffledAnswers, loading, restartTrivia } = useTriviaGame();
  const [index, setIndex] = useState(0);
  const [streak, setStreak] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);

  const handleAnswerSelect = (answer: string) => {
    setUserAnswer(answer);
    setHasAnswered(true);
    
    // Use setTimeout to give user time to see the correct/wrong answer
    setTimeout(() => {
      const current = questions[index];
      if (answer === current.correct_answer) {
        setStreak(streak + 1);
        setIndex(index + 1);
      } else {
        setGameOver(true);
      }
      setHasAnswered(false);
      setUserAnswer(null);
    }, 1500);
  };

  const restartGame = () => {
    setIndex(0);
    setStreak(0);
    setGameOver(false);
    setHasAnswered(false);
    setUserAnswer(null);
    restartTrivia();
  };

  if (loading) return (
    <div>
        <p>
            Loading questions...
        </p>
    </div>
  );

  if (gameOver) {
    return (
      <GameCompleted 
        score={streak}
        questions={questions.slice(0, streak + 1)}
        restartGame={restartGame}
      />
    );
  }

  const current = questions[index];
  const answers = shuffledAnswers[index];

    return (
        <>
            <GamePlay 
                gameMode="Endless"
                currentQuestionIndex={index}
                questions={questions}
                current={current}
                answers={answers}
                hasAnswered={hasAnswered}
                correctAnswer={current.correct_answer}
                userAnswer={userAnswer}
                handleAnswerSelect={handleAnswerSelect}
            />
        </>
    )
}