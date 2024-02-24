import {useEffect, useState} from "react";
import Start from "./components/Start";
import './index.css';
import styles from './App.module.css';
import Player from "./components/Player/Player";
import GameBoard from "./components/GameBoard/GameBoard";
import Log from "./components/Log/Log";
import GameOver from "./components/GameOver/GameOver";
import Menu from "./components/Menu/Menu";
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

function deriveActivePlayer(gameTurns){
    let currentPlayer = "X";

    if(gameTurns.length > 0 && gameTurns[0].player === "X" ){
        currentPlayer = "O";
    }
    return currentPlayer;
}

function deriveGameBoard(gameTurns) {
    let gameBoard = [...INITIAL_GAME_BOARD.map(array =>[...array])];

    for(const turn of gameTurns){
        const {square, player} = turn;
        const { row, col } = square;

        gameBoard[row][col] = player;
    }
    return gameBoard;
}

function deriveWinner(gameBoard, players){
    let winner = null; //переменная победителя

    for(const combination of WINNING_COMBINATIONS){
        const firstSquareSymbol =
            gameBoard[combination[0].row][combination[0].column];
        const secondSquareSymbol =
            gameBoard[combination[1].row][combination[1].column];
        const thirdSquareSymbol =
            gameBoard[combination[2].row][combination[2].column];

        if(firstSquareSymbol &&
            firstSquareSymbol === secondSquareSymbol &&
            firstSquareSymbol === thirdSquareSymbol
        ){
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
    const [players, setPlayers]=useState(PLAYERS);
    const [gameTurns, setGameTurns] = useState([]);
    const [useTheme, setUseTheme]=useState(null);

    const activePlayer = deriveActivePlayer(gameTurns);
    const gameBoard = deriveGameBoard(gameTurns); //игровые ходы
    const winner = deriveWinner(gameBoard, players);
    const hasDraw = gameTurns.length === 9 && !winner;

    useEffect(()=>{
        handlerSettingsButton();
    },[])
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
        //setActivePlayer((curActivePlayer) => curActivePlayer === "X" ? "O" : "X");
        setGameTurns((prevTurns) => {
            const currentPlayer = deriveActivePlayer(prevTurns);

            const updatedTurns = [
                {
                    square:{ row: rowIndex, col: colIndex },
                    player: currentPlayer
                },
                ...prevTurns,
            ];
            return updatedTurns;
        });
    }

    function handleRestart(){
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
        <button className="menu" onClick={handlerSettingsButton}>
            <img src={settingsIcon} alt="menu" className="menu__img"/>
        </button>
        <Menu onSetUseTheme={setUseTheme}/>
      <div id="game-container" className={styles.game_container}>
          {settings.isSettingsOpen && <Start onSettings={handlerChangeSettings}/>}
        <ol id="players" className={styles.highlight_player}>
          <Player
              initialName={PLAYERS.X}
              symbol={useTheme.symbol1}
              playerIcon = {useTheme.playerIcon1}
              isActive={activePlayer === "X"}
              onChangeName = {handlePlayerNameChange}
          />
          <Player
              initialName={PLAYERS.O}
              symbol={useTheme.symbol2}
              playerIcon = {useTheme.playerIcon2}
              isActive={activePlayer === "O"}
              onChangeName = {handlePlayerNameChange}
          />
        </ol>
          {(winner || hasDraw) && (
              <GameOver winner={winner} onRestart={handleRestart} />
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
