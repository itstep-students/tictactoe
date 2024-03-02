import {useEffect, useState} from "react";
import Start from "./components/Start.jsx";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard.jsx";
import Log from "./components/Log.jsx";
import GameOver from "./components/GameOver.jsx";
import {WINNING_COMBINATIONS} from "./components/winning-combinations.jsx";
import settingsIcon from './assets/setting.png'

const PLAYERS = {
    'X': 'Player 1',
    'O': 'Player 2'
};

const INITIAL_GAME_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

function deriveActivePlayer(gameTurns) {
    let currentPlayer = "X";

    if (gameTurns.length > 0 && gameTurns[0].player === "X") {
        currentPlayer = "O";
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
// let winPlayer = {
//     "X": 0,
//     "O": 0
// }
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

function App() {
    const [settings, setSettings] = useState({
        isSettingsOpen: false,
        opponents: 'Computer',
        gamesToWin: "3",
        themId: "1"
    });
    const [players, setPlayers] = useState(PLAYERS);
    // const [currentGame, setCurrentGame] = useState(0);
    const [gameTurns, setGameTurns] = useState([]);
    const activePlayer = deriveActivePlayer(gameTurns);
    const gameBoard = deriveGameBoard(gameTurns); //игровые ходы
    const winner = deriveWinner(gameBoard, players);
    const hasDraw = gameTurns.length === 9 && !winner;
    // let symbol = 'X';

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
                ...settings,
                isSettingsOpen: false
            }
        })
    }

    function handleSelectSquare(rowIndex, colIndex) {
        //setActivePlayer((curActivePlayer) => curActivePlayer === "X" ? "0" : "X");
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
    }

    function handlePlayerNameChange(symbol, newName) {
        setPlayers(prevPlayers => {
            return {
                ...prevPlayers,
                [symbol]: newName
            };
        });
    }

    return (
        <main>
            <button className="menu" onClick={handlerSettingsButton}><img src={settingsIcon} alt="menu" className="menu__img"/></button>
            <div id="game-container">
                {settings.isSettingsOpen && <Start onSettings={handlerChangeSettings}/>}
                <ol id="players" className="highlight-player">
                    <Player
                        initialName={PLAYERS.X}
                        symbol="X"
                        isActive={activePlayer === "X"}
                        onChangeName={handlePlayerNameChange}
                    />
                    <Player
                        initialName={PLAYERS.O} //ОШИБКА .0
                        symbol="O"
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
