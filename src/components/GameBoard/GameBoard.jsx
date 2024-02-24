import styles from './GameBoard.module.css';
export default function GameBoard({ onSelectSquare, board }){

    return(
        <ol className={styles.game_board}>
            {board.map((row, rowIndex) =>(
                <li key={rowIndex}>
                    <ol>
                        {row.map((playerSymbol,colIndex) =>(
                            <li key={colIndex}>
                                <button onClick={() => onSelectSquare(rowIndex,colIndex)}
                                        disabled={playerSymbol !==null} >
                                    {playerSymbol}
                                </button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    );
}