import React from 'react'
import { useState, useEffect } from 'react';
import { classes } from 'common/utils';
import { Link, useNavigate } from 'react-router-dom';
import './style.scss';

function Window({Name, Contents, Update, app}){
    const {key, focused, zIndex } = app;
    const [[left, top, width, height], setCoords] = useState([100, 100, 280, 150]);
    const [maximized, setMaximized] = useState(false);
    const [minimized, setMinimized] = useState(false);
    const [resizing, setResizing] = useState(false);
    const [moving, setMoving] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (focused && minimized) {
            setMinimized(false);
        }
    }, [focused]);

    return (
        <div className={classes('Window',key,resizing && 'resizing', moving && 'moving',  minimized && 'minimized', maximized && 'maximized')}
            style={{ left, top, width, height, zIndex}}
            onMouseDown={e=>{
                if(!focused) navigate(key);
            }}
        >
            <div className='toolbar' 
                onMouseDown={e=>{
                    const offsetX = e.clientX;
                    const offsetY = e.clientY;
                    setMoving(true);
                    const onMouseMove = e => {
                        const dx = e.clientX - offsetX;
                        const dy = e.clientY - offsetY;
                        setCoords([
                          left + dx,
                          top + dy,
                          width,
                          height,
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
                
                <div className='title-container'>
                    <div className="name">{app.key}</div>
                </div>
                <div className="button-container">
                    <Link className="button button-minimize" to="/" onClick={e=>{setMinimized(true)}}>⚊</Link>
                    <div className="button button-maximize" onClick={e=>{setMaximized(!maximized)}}>☐</div>
                    <Link className="button button-close" to="/" onClick={() => Update({ closing: true })}>✕</Link>
                </div>
            </div>

            {/* ############    Contents     ############ */}
            <div className='contents'>
                {Contents}
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
                                setResizing(true);
                                const offsetX = e.clientX;
                                const offsetY = e.clientY;
                                
                                const onMouseMove = e => {
                                    const dx = e.clientX - offsetX;
                                    const dy = e.clientY - offsetY;
                                    let newLeft = left;
                                    let newTop = top;
                                    let newWidth = width;
                                    let newHeight = height;
                                    sides.forEach(side => {
                                        switch (side) {
                                            case 'top':
                                                newTop += dy;
                                                newHeight -= dy;
                                                break;
                                            case 'left':
                                                newLeft += dx;
                                                newWidth -= dx;
                                                break;
                                            case 'bottom':
                                                newHeight += dy;
                                                break;
                                            case 'right':
                                                newWidth += dx;
                                                break;
                                            default:
                                        }
                                    })
                                    if (newWidth < 280 || newHeight < 60) return;
                                    setCoords([newLeft,newTop,newWidth,newHeight]);
                                }

                                const onMouseUp = e => {
                                    setResizing(false);
                                    window.removeEventListener('mousemove', onMouseMove);
                                    window.removeEventListener('mouseup', onMouseUp);
                                }
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