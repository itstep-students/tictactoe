import styles from './Player.module.css';

import {useState} from 'react';
export default function Player({ initialName, symbol, playerIcon, isActive, onChangeName }){
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(initialName);

    function handleEditClick(){
        setIsEditing((editing) => !editing);

        if(isEditing){
            onChangeName(symbol, playerName);
        }
    }
    function handleChange(event) {
        setPlayerName(event.target.value);
    }
    let editablePlayerName =  <span className={styles.player_name}>{playerName}</span>;
    // let btnCaption = 'Edit';

    if(isEditing){
        editablePlayerName = <input type="text" required value={playerName} onChange={handleChange} />;
        // btnCaption = 'Save';
    }

    return(
        <li className={isActive ? 'active' : undefined}>
            <span className={styles.player}>
                {editablePlayerName}
                {symbol && <span className={styles.player_symbol}>{symbol}</span>}
                {playerIcon && <img src={playerIcon}/>}
            </span>
            <button onClick={handleEditClick}>{ isEditing ? 'Save' : 'Edit'}</button>
        </li>
    )
}