export default function GameOver({winner, onRestart}){
    return(
        <div id="game-over">
            <h2>Игра окончена!</h2>
            {winner && <p>{winner} победил!</p>}
            {!winner && <p>Ничья!</p>}
            <p><button onClick={onRestart}>Перезапустить игру!</button></p>
        </div>
    )
}