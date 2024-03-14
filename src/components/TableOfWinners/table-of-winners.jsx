import styles from './table-of-winners.module.css';
import {useEffect, useState} from "react";


export default function TableOfWinners({resultGames, winner, onRestart}) {
    return (
        <div className={styles.winners}>
            <div className={styles.title}>Results of games</div>
            <div className={styles.congratulations}>
               {"Congratulation! " + winner + " won!"}
            </div>
            <table className={styles.table__wrapper}>
                <tbody>
                <tr>
                    <th>Game number</th>
                    <th>Winner</th>
                    <th>Symbol</th>
                </tr>
                {resultGames.map(game => (
                    <tr key={game.gameNumber}>
                        <td>{game.gameNumber}</td>
                        <td>{game.winner}</td>
                        <td>{game.symbol}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button onClick={onRestart} className={styles.start__button}>Start new game</button>
        </div>
    );
}