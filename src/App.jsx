import {useEffect, useState} from "react";

import styles from './App.module.css';
import './index.css';

import Start from "./components/Start/Start";
import Player from "./components/Player/Player";
import GameBoard from "./components/GameBoard/GameBoard";
import Log from "./components/Log/Log";
import GameOver from "./components/GameOver/GameOver";
import {WINNING_COMBINATIONS} from "./components/winning-combinations.jsx";
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
    'O': 'Player 2'
};

const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

export const FIRST_PLAYER = "X";
export const SECOND_PLAYER = "O"

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
    let winner = null; //переменная победителя

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
        }
    }
    return winner;
}

let resultGames = [];

function App() {
    const [settings, setSettings] = useState({
        isSettingsOpen: false,
        opponents: 'Computer',
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
    // let symbol = 'X';


    useEffect(() => {
        handlerSettingsButton();
    }, [])

    // useEffect(()=>{
    //     winPlayer={
    //         ...winPlayer,
    //         [symbol]: winPlayer[symbol]+1;  // "X": 0+1
    //     }
    //     if(){
    //         const playerWin = winPlayer.X>winPlayer.O ? Player.X : Player.O;
    //     }
    //
    // }, [currentGame])
    // useEffect(() => {
    //     winPlayer.push(winner);
    //     if (String(currentGame) >= settings.gamesToWin) {
    //         const firstWinner = winPlayer[0];
    //         const gameWon = winPlayer.reduce((item)=>{item===firstWinner},0);
    //         // win="X"
    //         // PLAYER[win] - победил
    //         setCurrentGame(0);
    //     }
    // }, [currentGame]);
    // useEffect(()=>{
    //     winPlayer={
    //         ...winPlayer,
    //         [symbol]: winPlayer[symbol]+1  // "X": 0+1
    //     }
    //     if(winPlayer.X > winPlayer.Y){
    //         const playerWin = PLAYERS.X;
    //     } else {
    //         const playerWin = PLAYERS.Y;
    //     }
    // }, [currentGame])
    // useEffect(() => {
    //     if (currentGame >= parseInt(settings.gamesToWin)) {
    //         const playerWin = winPlayer.X > winPlayer.O ? PLAYERS.X : PLAYERS.O;
    //         console.log(`Player ${playerWin} won the game!`);
    //     }
    // }, [currentGame]);
    //
    // useEffect(() => {
    //     winPlayer = {
    //         ...winPlayer,
    //         [symbol]: winPlayer[symbol] + 1
    //     };
    //     if (winPlayer.X > winPlayer.O) {
    //         const playerWin = PLAYERS.X;
    //         console.log(`Player ${playerWin} is currently winning!`);
    //     } else {
    //         const playerWin = PLAYERS.O;
    //         console.log(`Player ${playerWin} is currently winning!`);
    //     }
    // }, [currentGame]);
    // const [gamesPlayed, setGamesPlayed] = useState(0); // Track the number of games played
    //
    // useEffect(() => {
    //     if (winner || hasDraw) {
    //         setGamesPlayed(prevGamesPlayed => prevGamesPlayed + 1); // Увеличение количества сыгранных игр при наличии победителя или ничьей
    //     }
    // }, [winner, hasDraw]);
    //
    // useEffect(() => {
    //     if (gamesPlayed >= parseInt(settings.gamesToWin)) { // Проверка, равно ли количество сыгранных игр или больше указанного количества игр для победы
    //         const firstWinner = gameTurns[0].player; // Предполагая, что gameTurns[0] всегда содержит первого игрока
    //         const gameWon = gameTurns.filter(turn => turn.player === firstWinner).length; // Подсчет количества побед первого игрока
    //         // Отображение результата в зависимости от количества побед
    //         if (String(gameWon) >= parseInt(settings.gamesToWin)) {
    //             alert(`${PLAYERS[firstWinner]} выиграл серию!`);
    //         } else {
    //             alert(`Серия закончилась в ничью.`);
    //         }
    //         setGamesPlayed(0); // Сброс количества сыгранных игр
    //     }
    // }, [gamesPlayed, gameTurns, settings.gamesToWin]);
    //
    // useEffect(() => {
    //     handlerSettingsButton();
    // }, [])

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
            return {
                ...prevSettings,
                isSettingsOpen: false,
                ...settings,
            }
        })
    }

    function handleSelectSquare(rowIndex, colIndex) {
        //setActivePlayer((curActivePlayer) => curActivePlayer === "X" ? "O" : "X");
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
        setGameTurns([]);
        if (settings.gamesToWin <= resultGames.length) {
            setSettings(prevState => ({
                ...prevState,
                openStatistic: true
            }))
        }
    }

    function handleResetAllGame() {
        setGameTurns([]);
        resultGames = [];
        setSettings(prevState => ({
            ...prevState,
            openStatistic: false
        }))
    }

    function handlePlayerNameChange(symbol, newName) {
        setPlayers(prevPlayers => {
            return {
                ...prevPlayers,
                [symbol]: newName
            };
        });
    }

    if (winner) {
        resultGames.push({
            gameNumber: resultGames.length + 1,
            winner: winner,
            symbol: gameTurns[0].player
        });
    }

    let resultContent = null;
    if (settings.gamesToWin <= resultGames.length) {
        resultContent = <TableOfWinners resultGames={resultGames} winner={winner} isFinishGame={true}/>;
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
                        initialName={PLAYERS.X}
                        symbol='X'
                        isActive={activePlayer === "X"}
                        onChangeName={handlePlayerNameChange}
                    />
                    <Player
                        initialName={PLAYERS.O}
                        symbol='O'
                        isActive={activePlayer === "O"}
                        onChangeName={handlePlayerNameChange}
                    />
                </ol>

                {(winner || hasDraw) && (
                    <GameOver winner={winner} onRestart={handleRestart}/>
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
