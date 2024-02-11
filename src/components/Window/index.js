import React from 'react'
import { useState, useEffect } from 'react';
import { classes } from 'common/utils';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from 'components';
// import $ from "jquery";
import './style.scss';

function Window({Name, Contents, Update, app,WindowSize}){
    const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);
    const {key, focused, zIndex} = app;
    const {WindowHeight,WindowWidth} = WindowSize;
    const [[maximized,fix_maximized], setMaximized] = useState([false,false]);
    const [minimized, setMinimized] = useState(false);
    const [resizing, setResizing] = useState(false);
    const [moving, setMoving] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        window.addEventListener("resize", setResizing);
        if (focused && minimized) {
            setMinimized(false);
        }
    }, [focused]);
    const [[left, top, width, height], setCoords] = useState([getRandom((window.innerWidth-WindowWidth)/6, (window.innerWidth-WindowWidth)/1.5), 
                                                              getRandom(30,(window.innerHeight-WindowHeight)-70), 
                                                              WindowWidth, 
                                                              WindowHeight]);

    if (!maximized && ((window.innerHeight<=500 || window.innerWidth<=500)||width+left>window.innerWidth||height+top>window.WindowHeight)) setMaximized([true,true])
    else if (fix_maximized && !((window.innerHeight<=500 || window.innerWidth<=500)||width+left>window.innerWidth||height+top>window.WindowHeight)) setMaximized([false,false])
   
    return (
        <div className={classes('Window',key,resizing && 'resizing',focused && 'focused', moving && 'moving',  minimized && 'minimized', maximized && 'maximized')}
            style={{ left, top, width, height, zIndex}}
            onMouseDown={e=>{
                if(!focused) navigate(key);
            }}
            onWheel={e=>{
                if(!focused) navigate(key);
            }}
        >
            {/* ############    상단바     ############ */}
            <div className='toolbar' 
                onMouseDown={e=>{
                    const offsetX = e.clientX;
                    const offsetY = e.clientY;
                    setMoving(true);
                    const onMouseMove = e => {
                        const dx = e.clientX - offsetX;
                        const dy = e.clientY - offsetY;

                        setCoords([
                          (left+dx >= 0 && left + dx + width <= window.innerWidth ? left + dx:(left+dx<=0?0:window.innerWidth-width)),
                          (top +dy >= 0 && top  + dy + height <= window.innerHeight ? top + dy:(top+dy<=0?0:window.innerHeight-height)),
                          (width),
                          (height),
                        ]);
                    }

                    const onMouseUp = e =>{
                        setMoving(false);
                        window.removeEventListener('mousemove', onMouseMove);
                        window.removeEventListener('mouseup', onMouseUp);
                    }
                    window.addEventListener('mousemove', onMouseMove);
                    window.addEventListener('mouseup', onMouseUp);
                }}>
                <div className='image-container'><Icon iconKey={app.key}/></div>
                <div className='title-container'>
                    <div className="name">{app.key}</div>
                </div>
                <div className="button-container">
                    <Link className="button button-minimize" to="/" onClick={e=>{setMinimized(true)}}>⚊</Link>
                    <div className="button button-maximize" onClick={e=>{setMaximized([!maximized,fix_maximized])}}>☐</div>
                    <Link className="button button-close" to="/" onClick={() => Update({ closing: true })}>✕</Link>
                </div>
            </div>

            {/* ############    Contents     ############ */}
            <div className='contents'>
                {Contents}
                <div className='interceptor' style={{display:focused&&!moving&&!resizing&&"none"}}></div>
            </div>
            {/* ############ Resizing Window ############ */}
            {
                [
                    ['top'],
                    ['bottom'],
                    ['left'],
                    ['right'],
                    ['top', 'left'],
                    ['top', 'right'],
                    ['bottom', 'left'],
                    ['bottom', 'right'],
                ].map(sides=>(
                        <div key={sides.join('-')} className={classes('border', ...sides.map(side=>`border-${side}`))}
                            onMouseDown={e=>{
                                const offsetX = e.clientX;
                                const offsetY = e.clientY;
                                
                                const onMouseMove = e => {
                                    const dx = e.clientX - offsetX;
                                    const dy = e.clientY - offsetY;
                                    let newLeft = left;
                                    let newTop = top;
                                    let newWidth = width;
                                    let newHeight = height;
                                    
                                    console.log("offsetY : ",offsetY,"dy : ",dy,"newTop : ",newTop,"e.clientY : ",e.clientY)

                                    sides.forEach(side => {
                                        switch (side) {
                                            case 'top':
                                                newTop = (dy + top >= 0) ? top+dy : 0;
                                                newHeight = (dy + top >= 0) ? newHeight-dy:newHeight+offsetY;
                                                newTop = newHeight>300?newTop:offsetY+height-300
                                                newHeight = newHeight>300?newHeight:300
                                                break;
                                            case 'left':
                                                newLeft = (dx + left >= 0) ? left+dx : 0;
                                                newWidth = (dx + left >= 0) ? newWidth-dx:newWidth+offsetX;
                                                newLeft = newWidth>300?newLeft:offsetX+width-300
                                                newWidth = newWidth>300?newWidth:300
                                                break;
                                            case 'bottom':
                                                newHeight= (height+top+dy<=window.innerHeight)?newHeight+dy:window.innerHeight-top;
                                                newHeight = newHeight>300?newHeight:300
                                                break;
                                            case 'right':
                                                newWidth = (width+left+dx<=window.innerWidth)?newWidth+dx:window.innerWidth-left;
                                                newWidth = newWidth>300?newWidth:300
                                                break;
                                            default:
                                        }
                                    })

                                    setCoords([
                                        newLeft,
                                        newTop,
                                        newWidth,
                                        newHeight
                                    ]);
                                }

                                const onMouseUp = e => {
                                    setResizing(false);
                                    window.removeEventListener('mousemove', onMouseMove);
                                    window.removeEventListener('mouseup', onMouseUp);
                                }
                                setResizing(true)
                                window.addEventListener('mousemove', onMouseMove);
                                window.addEventListener('mouseup', onMouseUp);
                            }}
                        >
                        </div>
                    ))
            }
        </div>
    );
}

export default Window;