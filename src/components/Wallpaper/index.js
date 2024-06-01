import React from 'react'
import { Wallpapers as background } from 'images';
import './style.scss'

function Wallpaper(){
    return(<div className="Wallpaper" style={{backgroundImage: `url(${background})`}}></div>)
}

export default Wallpaper