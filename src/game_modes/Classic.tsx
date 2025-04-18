
import { useState } from "react";
import { useTriviaGame } from "../hooks/useTriviaGame";
import { GameCompleted, GamePlay } from "../components/Gamestyles";

export default function Classic() {
    const { questions, shuffledAnswers, loading, restartTrivia } = useTriviaGame();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
    const [gameCompleted, setGameCompleted] = useState(false);
    const [score, setScore] = useState(0);
    const [hasAnswered, setHasAnswered] = useState(false);

    const handleAnswerSelect = (answer: string) => {
        if (hasAnswered) return;
        setHasAnswered(true);
        const updatedAnswers = [...selectedAnswers];
        updatedAnswers[currentQuestionIndex] = answer;
        setSelectedAnswers(updatedAnswers);

        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setHasAnswered(false);
            } else {
                const newScore = questions.reduce((score, question, index) =>
                    updatedAnswers[index] === question.correct_answer ? score + 1 : score, 0);
                setScore(newScore);
                setGameCompleted(true);
            }
        }, 1500);
    };

    const restartGame = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswers([]);
        setGameCompleted(false);
        setScore(0);
        setHasAnswered(false);
        restartTrivia();

    };

    if (loading) return (
        <p>Loading questions...</p>
    );
    if (gameCompleted) return (
        GameCompleted({ score, questions, restartGame })
    );

    const current = questions[currentQuestionIndex];
    const answers = shuffledAnswers[currentQuestionIndex];
    const userAnswer = selectedAnswers[currentQuestionIndex];
    const correctAnswer = current.correct_answer;
    const gameMode = "Classic";

    return (
        GamePlay({
            gameMode,
            currentQuestionIndex,
            questions,
            current,
            answers,
            hasAnswered,
            correctAnswer,
            userAnswer,
            handleAnswerSelect
        })
    );
}