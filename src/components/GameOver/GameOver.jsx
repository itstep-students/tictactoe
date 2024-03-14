import styles from './GameOver.module.css';
import React from "react";

function GameOver({winner, scores, onRestart,players}){
    return(
        <div className={styles.game_over}>
            <h2>Game result!</h2>
            {winner && <p>{winner} won!</p>}
            {!winner && <p>It&apos;s a draw!</p>}
            <p>X: {scores[players.X]}   O: {scores[players.O]}</p>
            <p><button onClick={onRestart}>Continue</button></p>
        </div>
    )
}
export default GameOver;