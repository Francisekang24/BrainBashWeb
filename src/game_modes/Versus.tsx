import { useState, useEffect } from "react"
import { useTriviaGame } from "../hooks/useTriviaGame"
import { GamePlay, PlayersEntry, PlayerTurns, VersusResults } from "../components/Gamestyles"



export default function Versus() {
    const { questions, shuffledAnswers, loading, restartTrivia } = useTriviaGame();
    const [currentPlayer, setCurrentPlayer] = useState(1);
    const [index, setIndex] = useState(0);
    const [scores, setScores] = useState<[number, number]>([0, 0]);
    const [gameOver, setGameOver] = useState(false);
    const [hasAnswered, setHasAnswered] = useState(false);
    const [userAnswer, setUserAnswer] = useState<string | null>(null);
    const [playerNames, setPlayerNames] = useState<[string, string]>(["Player 1", "Player 2"]);
    const [gameStarted, setGameStarted] = useState(false);

    const handleAnswerSelect = (answer: string) => {
        setUserAnswer(answer);
        setHasAnswered(true);
    };

    useEffect(() => {
        if (hasAnswered) {
            const timer = setTimeout(() => {
                const current = questions[index];
                if (userAnswer === current.correct_answer) {
                    const newScores = [...scores] as [number, number];
                    newScores[currentPlayer - 1]++;
                    setScores(newScores);
                }

                if (index < questions.length - 1) {
                    setIndex(index + 1);
                    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
                } else {
                    setGameOver(true);
                }

                setHasAnswered(false);
                setUserAnswer(null);
            }, 1500); // Short delay to show the correct answer

            return () => clearTimeout(timer);
        }
    }, [hasAnswered, userAnswer]);

    const startGame = () => {
        setGameStarted(true);
    };

    const restartGame = () => {
        setCurrentPlayer(1);
        setIndex(0);
        setScores([0, 0]);
        setGameOver(false);
        setHasAnswered(false);
        setUserAnswer(null);
        setGameStarted(false); // Go back to the name entry screen
        restartTrivia();
    };

    if (loading) return <p>Loading questions...</p>;

    if (!gameStarted) {
        return (
            <PlayersEntry
                onStart={startGame}
                playerNames={playerNames}
                setPlayerNames={setPlayerNames}
            />
        );
    }

    if (gameOver) {
        return (
            <VersusResults
                scores={scores}
                playerNames={playerNames}
                questions={questions}
                restartGame={restartGame}
            />
        );
    }

    const current = questions[index];
    const answers = shuffledAnswers[index];
    return (
        <>
            <GamePlay
                playersTurns={
                    <PlayerTurns
                        playerNames={playerNames}
                        currentPlayer={currentPlayer}
                        scores={scores}
                    />
                }
                gameMode="Versus"
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