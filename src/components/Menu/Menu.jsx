import {useEffect, useState} from "react";
import {themes} from "../../App.jsx";

export default function Menu({settings}) {

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

    return (
        <div>

        </div>
    )
}