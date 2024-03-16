import {useEffect, useState} from "react";

import styles from './App.module.css';
import './index.css';

import Start from "./components/Start/Start";
import Player from "./components/Player/Player";
import GameBoard from "./components/GameBoard/GameBoard";
import Log from "./components/Log/Log";
import GameOver from "./components/GameOver/GameOver";

import {WINNING_COMBINATIONS} from "./components/winning-combinations";
import settingsIcon from './assets/setting.png';

import buttonLight from '/game-logo.png';
import buttonDark from '/logo_1.png';

import backgroundImgLight from '/bg-pattern-light.png';
import backgroundImgDark from '/bg-pattern-dark.png';
import TableOfWinners from "./components/TableOfWinners/table-of-winners.jsx";

export const themes = [
  {
    id: 1,
    backgroundImg: backgroundImgLight,
    logoImg: buttonLight,
    gameNameStyles: 'light'
  },
  {
    id: 2,
    backgroundImg: backgroundImgDark,
    logoImg: buttonDark,
    gameNameStyles: 'dark'
  }
]

const PLAYERS = {
  'X': 'Player 1',
  'O': 'Friend'
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

// localStorage.setItem("PLAYERS",
//     JSON.stringify({currentPlayer: "Computer", lastPlayer: "Friend"})
// );
// console.log(JSON.parse(localStorage.getItem("PLAYERS")).currentPlayer);
// console.log(JSON.parse(localStorage.getItem("PLAYERS")).lastPlayer);

export const FIRST_PLAYER = "X";
export const SECOND_PLAYER = "O";
export const COMPUTER = "Computer";

function playComputer(gameBoard) {
  const emptyIndexes = [];
  gameBoard.forEach((row, rowIndex) => {
    row.forEach((col, colIndex) => {
      if (!col) {
        emptyIndexes.push([rowIndex, colIndex]);
      }
    });
  });
  const randomIndex = Math.floor(Math.random() * emptyIndexes.length);
  return emptyIndexes.length ? emptyIndexes[randomIndex] : null;
}

function deriveActivePlayer(gameTurns) {
  let currentPlayer = FIRST_PLAYER;
  
  if (gameTurns.length > 0 && gameTurns[0].player === FIRST_PLAYER) {
    currentPlayer = SECOND_PLAYER;
  }
  return currentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];
  
  for (const turn of gameTurns) {
    const {square, player} = turn;
    const {row, col} = square;
    
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner = null;
  
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];
    
    if (firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
      break;
    }
  }
  return winner;
}

let resultGames = [];

function getPlayerToWon(resultGames) {
  const result = resultGames.reduce((acc, item) => {
    ++acc[item.symbol];
    return acc;
  }, {
    [FIRST_PLAYER]: 0,
    [SECOND_PLAYER]: 0
  })
  return result[FIRST_PLAYER] > result[SECOND_PLAYER] ? PLAYERS[FIRST_PLAYER] : PLAYERS[SECOND_PLAYER];
}

function App() {
  const [settings, setSettings] = useState({
    isSettingsOpen: false,
    mainPlayer: PLAYERS.X,
    opponents: PLAYERS.O,
    gamesToWin: 3,
    themeId: 1,
    openStatistic: false
  });
  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);
  
  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns); //игровые ходы
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;
  const playerToWon = getPlayerToWon(resultGames)
  
  const [scores, setScores] = useState({[PLAYERS.X]: 0, [PLAYERS.O]: 0});
  const [seriesWinner, setSeriesWinner] = useState(null);
  const [isSeriesEnded, setIsSeriesEnded] = useState(false);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  
  useEffect(() => {
    if (hasDraw) {
      setGamesPlayed(prevGamesPlayed => {
        const newGamesPlayed = prevGamesPlayed + 1;
        if (newGamesPlayed >= parseInt(settings.gamesToWin)) {
          setSeriesWinner(winner);
        }
        return newGamesPlayed;
      });
    }
  }, [hasDraw]);
  
  
  useEffect(() => {
    if (winner) {
      setScores(prevScores => {
        resultGames.push({
          gameNumber: resultGames.length + 1,
          winner: winner,
          symbol: gameTurns[0].player
        });
        return {
          ...prevScores,
          [winner]: prevScores[winner] + 1
        }
      });
      
      
      setGamesPlayed(prevGamesPlayed => {
        const newGamesPlayed = prevGamesPlayed + 1;
        if (newGamesPlayed >= parseInt(settings.gamesToWin)) {
          setSeriesWinner(winner);
        }
        return newGamesPlayed;
      });
    }
  }, [winner]);
  
  useEffect(() => {
    if (settings.opponents === COMPUTER && activePlayer === "O" && !settings.isSettingsOpen) {
      const playComputerResult = playComputer(gameBoard);
      if (playComputerResult) {
        const [rowIndex, colIndex] = playComputerResult;
        handleSelectSquare(rowIndex, colIndex);
      }
    }
  }, [gameBoard]);
  
  useEffect(() => {
    handlerSettingsButton();
  }, [])
  useEffect(() => {
    if (seriesWinner) {
      setIsSeriesEnded(true);
      setGamesPlayed(prevGamesPlayed => {
        const newGamesPlayed = prevGamesPlayed + 1;
        if (newGamesPlayed >= parseInt(settings.gamesToWin)) {
          setSeriesWinner(winner);
        }
        return newGamesPlayed;
      });
    }
  }, [seriesWinner, winner, settings.gamesToWin]);
  
  function handlerSettingsButton() {
    setSettings(prevSettings => {
      return {
        ...prevSettings,
        isSettingsOpen: !prevSettings.isSettingsOpen
      }
    })
  }
  
  function handlerChangeSettings(settings) {
    setSettings(prevSettings => {
      if (settings.gamesToWin && prevSettings.gamesToWin !== settings.gamesToWin) {
        resultGames = [];
        setScores({[PLAYERS.X]: 0, [PLAYERS.O]: 0});
      }
      if (settings.opponents && settings.opponents !== prevSettings.opponents) {
        handlePlayerNameChange('O', settings.opponents);
        setScores({[PLAYERS.X]: 0, [PLAYERS.O]: 0});
      }
      return {
        ...prevSettings,
        isSettingsOpen: false,
        ...settings,
      }
    })
    setGameTurns([]);
  }
  
  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      
      const updatedTurns = [
        {
          square: {row: rowIndex, col: colIndex},
          player: currentPlayer
        },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }
  
  function handleRestart() {
    if (isSeriesEnded) {
      setSettings(prevState => ({
        ...prevState,
        openStatistic: true
      }));
      setGameTurns([]);
      setSeriesWinner(null);
      setIsSeriesEnded(false);
      setGamesPlayed(0);
    } else {
      setGameTurns([]);
      if (resultGames.length === settings.gamesToWin) {
        resultGames = [];
        setScores({[PLAYERS.X]: 0, [PLAYERS.O]: 0});
        setSettings(prevSettings => ({
            ...prevSettings,
            openStatistic: false
          })
        )
      }
    }
  }
  
  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      PLAYERS[symbol] = newName;
      return {
        ...prevPlayers,
        [symbol]: newName
      };
    });
  }
  
  let resultContent = null;
  if (settings.gamesToWin <= resultGames.length) {
    resultContent =
      <TableOfWinners resultGames={resultGames} winner={playerToWon} isSeriesEnded={isSeriesEnded}
                      onRestart={handleRestart}/>;
  }
  
  return (
    <main>
      <div id="game-container" className={styles.game_container}>
        <button className="menu" onClick={handlerSettingsButton}>
          <img src={settingsIcon} alt="menu" className="menu__img"/>
        </button>
        {settings.isSettingsOpen && <Start settings={settings} onSettings={handlerChangeSettings}/>}
        {settings.openStatistic && resultContent}
        <ol id="players" className="highlight_player">
          <Player
            initialName={settings.mainPlayer}
            symbol='X'
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Player
            initialName={settings.opponents}
            symbol='O'
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        
        {(winner || hasDraw) && (
          <GameOver winner={winner} scores={scores} seriesWinner={seriesWinner}
                    players={PLAYERS}
                    onRestart={handleRestart}
                    isSeriesEnded={isSeriesEnded}/>
        )}
        
        <GameBoard
          onSelectSquare={handleSelectSquare}
          board={gameBoard}
        />
      
      </div>
      
      <Log turns={gameTurns}/>
    </main>
  );
}

export default App
