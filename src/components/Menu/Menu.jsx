import {useEffect, useState} from "react";
import styles from './Menu.module.css';
import {themes} from "../../App.jsx";



export default function Menu({onSetUseTheme}){

    const [themeId, setThemeId] = useState(1);
    const [styleColor, setStyleColor] = useState("dark");

    useEffect(() => {
            const themeTmp = themes.find(theme =>theme.id === themeId);

            const imgElem = document.getElementById("img-logo");
            const gameName = document.getElementById('game-name');

            gameName.className='';
            gameName.classList.add(themeTmp.gameNameStyles)

            imgElem.src = themeTmp.logoImg;

        document.body.style.backgroundImage = `url(${themeTmp.backgroundImg})`;

        if (styleColor !== "light") {
            setStyleColor("light");
        } else {
            setStyleColor("dark");
        }
        onSetUseTheme({
            ...themeTmp
        });
    }, [themeId]);

    return(
        <div className={styles.menu}>
            <div className={styles.button_background}>
                <div>
                    <button className={styles.button_light} onClick={()=>setThemeId(1) }></button>
                </div>
                {/*<div className={styles[styleColor]}></div>*/}
                <div>
                    <button className={styles.button_dark} onClick={()=>setThemeId(2)}></button>
                </div>
            </div>
        </div>
    )
}