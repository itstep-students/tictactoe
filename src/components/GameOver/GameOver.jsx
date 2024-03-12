import styles from './GameOver.module.css';
import React from "react";

function deriveSeriesWinner(scores) {
    if (scores["Player 1"] > scores["Player 2"]) {
        return "Player 1";
    } else if (scores["Player 1"] < scores["Player 2"]) {
        return "Player 2";
    } else {
        return null;
    }
}
function GameOver({winner, scores, onRestart}){
    return(
        <div className={styles.game_over}>
            <h2>Game result!</h2>
            {winner && <p>{winner} won!</p>}
            {!winner && <p>It&apos;s a draw!</p>}
            <p>X: {scores["Player 1"]}   O: {scores["Player 2"]}</p>
            <p><button onClick={onRestart}>Continue</button></p>
        </div>
    )
}
export default GameOver;