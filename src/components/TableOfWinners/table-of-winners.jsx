import styles from './table-of-winners.module.css';
// interface IGame{
//     gameNumber: number;
//     winner: string;
//     symbol: string;
// }

export default function TableOfWinners({resultGames, winner}) {
    return (
        <div>
            <div>Results of games</div>
            <div className="winner_wrapper">
                {"Congratulation!!!" + winner + "won!!!"}
            </div>
            <table>
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
            <button>Start new game</button>
        </div>
    );
}