import styles from './GameOver.module.css';
export default function GameOver({winner, onRestart}){
    return(
        <div className={styles.game_over}>
            <h2>Game over!</h2>
            {winner && <p>{winner} won!</p>}
            {!winner && <p>It&apos;s a draw!</p>}
            <p><button onClick={onRestart}>Rematch!</button></p>
        </div>
    )
}