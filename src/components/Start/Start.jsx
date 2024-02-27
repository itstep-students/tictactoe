import {useState} from "react";


import styles from './Start.module.css';


export default function Start({onSettings, settings}) {
    const [opponents, setOpponents] = useState('Computer');
    const [gamesToWin, setGamesToWin] = useState("3");

    function handlerOpponentsChanged(e) {
        setOpponents(e.target.value);
    }

    function handlerGamesToWinChanged(e) {
        setGamesToWin(e.target.value);
    }

    function handlerThemIdChanged(e) {
        onSettings({
            themeId: Number(e.target.value),
            isSettingsOpen: true
        })
    }

    function handlerSaveSettings() {
        onSettings({
            opponents,
            gamesToWin
        });
    }

    return (
        <div id="start" className={styles.settings__wrapper}>
            <div className={styles.topic}>
                <h2 className={styles.title}>Your opponent:</h2>
                <div className={styles.label__wrapper}>
                    <label className={styles.label}>
                        <input className={styles.input} type="radio" value="Computer" name="opponent"
                               checked={opponents === 'Computer'} onChange={handlerOpponentsChanged}/>
                        <span className={styles.span}>Computer</span>
                    </label>
                    <label className={styles.label}>
                        <input className={styles.input} type="radio" value="Friend" name="opponent"
                               checked={opponents === 'Friend'} onChange={handlerOpponentsChanged}/>
                        <span className={styles.span}>Friend</span>
                    </label>
                </div>
            </div>
            <div className={styles.topic}>
                <h2 className={styles.title}>Number of games to win:</h2>
                <div className={styles.label__wrapper}>
                    <label className={styles.label}>
                        <input className={styles.input} type="radio" value="3" name="number"
                               checked={gamesToWin === "3"} onChange={handlerGamesToWinChanged}/>
                        <span className={styles.span}>3</span>
                    </label>
                    <label className={styles.label}>
                        <input className={styles.input} type="radio" value="6" name="number"
                               checked={gamesToWin === "6"} onChange={handlerGamesToWinChanged}/>
                        <span className={styles.span}>7</span>
                    </label>
                    <label className={styles.label}>
                        <input className={styles.input} type="radio" value="9" name="number"
                               checked={gamesToWin === "9"} onChange={handlerGamesToWinChanged}/>
                        <span className={styles.span}>9</span>
                    </label>
                </div>
            </div>
            <div className={styles.topic}>
                <h2 className={styles.title}>Background:</h2>
                <div className={styles.label__wrapper}>
                    <label className={styles.label}>
                        <input className={styles.input} type="radio" value="1" name="background"
                               checked={settings.themeId === 1} onChange={handlerThemIdChanged}/>
                        <span className={styles.span}>Theme 1</span>
                    </label>
                    <label className={styles.label}>
                        <input className={styles.input} type="radio" value="2" name="background"
                               checked={settings.themeId === 2} onChange={handlerThemIdChanged}/>
                        <span className={styles.span}>Theme 2</span>
                    </label>
                </div>
            </div>
            <div className={styles.button__wrapper}>
                <button className={styles.start__button} onClick={handlerSaveSettings}>Start new game</button>
                <button className={styles.resume__button} onClick={handlerSaveSettings}>Resume game</button>
            </div>
        </div>
    )
}
