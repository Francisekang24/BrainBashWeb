import "./Gamestyles.css"

interface GamePlayerProps {
  gameMode: string;
  currentQuestionIndex: number;
  questions: any[];
  current: { question: string };
  answers: string[];
  hasAnswered: boolean;
  correctAnswer: string;
  userAnswer: string | null;
  handleAnswerSelect: (answer: string) => void;
  timeLeft?: number;
  playersTurns?: React.ReactNode;
}

export const GamePlay = ({
  gameMode,
  currentQuestionIndex,
  questions,
  current,
  answers,
  hasAnswered,
  correctAnswer,
  userAnswer,
  handleAnswerSelect,
  timeLeft,
  playersTurns
}: GamePlayerProps) => {
  return (
    <>
      <p className="game-mode-text">
        {gameMode}
      </p>
      <p className="time-left-text">
        {timeLeft !== undefined && (
          <>Time Left: <span className="time-seconds">{timeLeft}</span></>
        )}
      </p>
      {playersTurns && playersTurns}
      <div className="inGameBox">
        <p className="question-number">
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
        <p className="question-text">
          {current.question}
        </p>
        <div className="answers-container">
          {
            answers.map((answer, index) => {
              let buttonStyle = 'button-style-default';

              if (hasAnswered) {
                if (answer === correctAnswer) {
                  buttonStyle = 'button-style-correct';
                } else if (answer === userAnswer) {
                  buttonStyle = 'button-style-incorrect';
                }
              } else if (answer === userAnswer) {
                buttonStyle = 'button-style-selected';
              }

              return (
                <button
                  key={index}
                  className={`buton-style ${buttonStyle}`}
                  onClick={() => handleAnswerSelect(answer)}
                  disabled={hasAnswered}
                >
                  <p className="answer-text">
                    {answer}
                  </p>
                </button>
              )
            })
          }
        </div>
        <p className="next-question-text">
          {hasAnswered ? 'Next question...' : 'Select an answer'}
        </p>
      </div>
    </>
  )
}

interface GameCompletedProps {
  score: number;
  questions: any[];
  restartGame: () => void;
  timeUsed?: number;
}

export const GameCompleted = ({
  score,
  questions,
  restartGame,
  timeUsed
}: GameCompletedProps) => {
  return (
    <div className="completedGameBox">
      <p className="game-completed-text">
        Game Completed!
      </p>
      <p className="score-text">
        Your score: {score} out of {questions.length}
      </p>
      {
        timeUsed &&
        <p className="time-used-text">
          Time used: {timeUsed} seconds
        </p>
      }
      <button
        onClick={restartGame}
        className="play-again-button"
      >
        Play Again
      </button>
    </div>
  )
}

interface PlayersEntryProps {
  onStart: () => void;
  playerNames: [string, string];
  setPlayerNames: (names: [string, string]) => void;
}

export const PlayersEntry = ({ onStart, playerNames, setPlayerNames }: PlayersEntryProps) => {
  return (
    <div className="players-entry-container">
      <p className="mode-title">
        Versus Mode
      </p>
      <div className="player-names-container">
        <div className="player-name-entry">
          <p>
            Player 1 Name
          </p>
          <input className="player-name-input" type="text" placeholder="Enter Player 1 Name" value={playerNames[0]} onChange={(e) => setPlayerNames([e.target.value, playerNames[1]])} />
        </div>
        <div className="player-name-entry">
          <p>
            Player 2 Name
          </p>
          <input
            className="player-name-input"
            type="text"
            placeholder="Enter Player 2 Name"
            value={playerNames[1]} onChange={(e) => setPlayerNames([playerNames[0], e.target.value])} />
        </div>
      </div>
      <button
        onClick={onStart}
        className="start-game-button"
      >
        <p>
          Start Game
        </p>
      </button>
    </div>
  )
}

interface VersusResultsProps {
  scores: [number, number];
  playerNames: [string, string];
  questions: any[];
  restartGame: () => void;
}

export const VersusResults = ({ scores, playerNames, restartGame }: VersusResultsProps) => {
  const winner = scores[0] > scores[1] ? 0 : scores[0] < scores[1] ? 1 : -1;

  return (
    <div className="versus-results-container">
      <p className="game-completed-text">
        Game Completed!
      </p>
      <p className="winner-text">
        {winner === -1 ? "It's a tie!" : `${playerNames[winner]} wins!`}
      </p>
      <div className="scores-container">
        <div className="player-score">
          <p>
            {playerNames[0]}
          </p>
          <p>
            {scores[0]} points
          </p>
        </div>
        <div className="player-score">
          <p>
            {playerNames[1]}
          </p>
          <p>
            {scores[1]} points
          </p>
        </div>
      </div>
      <button 
        className="play-again-button"
        onClick={restartGame}>
        <p>Play Again</p>
      </button>
    </div>
  )
}

interface PlayerTurnsProps {
  playerNames: [string, string];
  scores: [number, number];
  currentPlayer: number;
}

export const PlayerTurns = ({ playerNames, scores, currentPlayer }: PlayerTurnsProps) => {
  return (
    <div className="player-turns-container">
      <div className={`player-turns ${currentPlayer === 1 ? 'active' : ''}`}>
        <p>{playerNames[0]}</p>
        <p>{scores[0]} </p>
      </div>
      <div className="vs-container">
        <p>VS</p>
      </div>
      <div className={`player-turns ${currentPlayer === 2 ? 'active' : ''}`}>
        <p>{playerNames[1]}</p>
        <p>{scores[1]} </p>
      </div>
    </div>
  )
}