import {useEffect, useState} from "react";
import {themes} from "../../App";

import styles from './Start.module.css';


export default function Start({onSettings, settings}) {

    const [opponents, setOpponents] = useState('Computer');


    const [styleColor, setStyleColor] = useState("dark");

    useEffect(() => {
        const themeTmp = themes.find(theme => theme.id === settings.themeId);

        const imgElem = document.getElementById("img-logo");
        const gameName = document.getElementById('game-name');

        gameName.className = '';
        gameName.classList.add(themeTmp.gameNameStyles)

        imgElem.src = themeTmp.logoImg;

        document.body.style.backgroundImage = `url(${themeTmp.backgroundImg})`;

        if (styleColor !== "light") {
            setStyleColor("light");
        } else {
            setStyleColor("dark");
        }
    }, [settings.themeId]);

    function handlerOpponentsChanged(e) {
        setOpponents(e.target.value);
    }

    function handlerGamesToWinChanged(e) {
        onSettings({
            gamesToWin: Number(e.target.value),
            isSettingsOpen: true
        })
    }

    function handlerThemIdChanged(e) {
        onSettings({
            themeId: Number(e.target.value),
            isSettingsOpen: true
        })
    }

    function handlerSaveSettings() {
        onSettings({
            opponents
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
                               checked={settings.gamesToWin === 3} onChange={handlerGamesToWinChanged}/>
                        <span className={styles.span}>3</span>
                    </label>
                    <label className={styles.label}>
                        <input className={styles.input} type="radio" value="5" name="number"
                               checked={settings.gamesToWin === 5} onChange={handlerGamesToWinChanged}/>
                        <span className={styles.span}>5</span>
                    </label>
                    <label className={styles.label}>
                        <input className={styles.input} type="radio" value="7" name="number"
                               checked={settings.gamesToWin === 7} onChange={handlerGamesToWinChanged}/>
                        <span className={styles.span}>7</span>
                    </label>
                    <label className={styles.label}>
                        <input className={styles.input} type="radio" value="9" name="number"
                               checked={settings.gamesToWin === 9} onChange={handlerGamesToWinChanged}/>
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
                        <span className={styles.span}>Theme1</span>
                    </label>
                    <label className={styles.label}>
                        <input className={styles.input} type="radio" value="2" name="background"
                               checked={settings.themeId === 2} onChange={handlerThemIdChanged}/>
                        <span className={styles.span}>Theme2</span>
                    </label>
                </div>
            </div>
                <button className={styles.start__button} onClick={handlerSaveSettings}>Start new game</button>
        </div>
    )
}
