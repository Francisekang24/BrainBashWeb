import { useState, useEffect } from "react";
import { useTriviaGame } from "../hooks/useTriviaGame";
import { GameCompleted, GamePlay } from "../components/Gamestyles";




export default function Timed() {

    const { questions, shuffledAnswers, loading, restartTrivia } = useTriviaGame();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(20);
    const [gameOver, setGameOver] = useState(false);
    const [hasAnswered, setHasAnswered] = useState(false);
    const [userAnswer, setUserAnswer] = useState<string | null>(null);

    useEffect(() => {
        // Only start the timer if the game is not over
        if (!gameOver) {
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setGameOver(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            // Clean up the timer when component unmounts or effect re-runs
            return () => clearInterval(timer);
        }
    }, [gameOver]); // Re-run the effect when gameOver changes

    const handleAnswerSelect = (answer: string) => {
        setUserAnswer(answer);
        setHasAnswered(true);

        // Move to next question after a short delay
        setTimeout(() => {
            handleAnswer(answer);
            setHasAnswered(false);
            setUserAnswer(null);
        }, 1000);
    };

    const handleAnswer = (answer: string) => {
        const current = questions[currentQuestionIndex];
        if (answer === current.correct_answer) {
            setScore(score + 1);
        }
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setGameOver(true);
        }
    };

    const restartGame = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setTimeLeft(60);
        setGameOver(false);
        setHasAnswered(false);
        setUserAnswer(null);
        restartTrivia(); 
    };

    if (loading) return <div>Loading questions...</div>;

    if (gameOver) {
        const timeUsed = 60 - timeLeft; // Calculate time used
        return <GameCompleted
            score={score}
            questions={questions}
            restartGame={restartGame}
            timeUsed={timeUsed} // Pass the time used to GameCompleted
        />;
    }

    const current = questions[currentQuestionIndex];
    const answers = shuffledAnswers[currentQuestionIndex];
    const gameMode = 'Timed';


    return (
        <GamePlay
            gameMode={gameMode}
            currentQuestionIndex={currentQuestionIndex}
            questions={questions}
            current={current}
            answers={answers}
            hasAnswered={hasAnswered}
            correctAnswer={current.correct_answer}
            userAnswer={userAnswer}
            handleAnswerSelect={handleAnswerSelect}
            timeLeft={timeLeft} // Pass the time left to GamePlay
        />
    )
}