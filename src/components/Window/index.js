import React from 'react'
import { useState, useEffect } from 'react';
import { classes } from 'common/utils';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from 'components';
import * as IconMap from 'images';
import './style.scss';

function Window({Name, Contents, Update, app,WindowSize}){
    const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);
    const {key, focused, zIndex} = app;
    const {WindowHeight,WindowWidth} = WindowSize;
    let [[maximized,fix_maximized], setMaximized] = useState([false,false]);
    const [minimized, setMinimized] = useState(false);
    const [resizing, setResizing] = useState(false);
    const [WindowResizeing, setWindowResizeing] = useState(false);
    const [moving, setMoving] = useState(false);
    const navigate = useNavigate();

    let [[left, top, width, height], setCoords] = useState([getRandom((window.innerWidth-WindowWidth)/6, (window.innerWidth-WindowWidth)/1.5), 
                                                              getRandom(30,(window.innerHeight-WindowHeight)-70), 
                                                              WindowWidth, 
                                                              WindowHeight]);
    useEffect(() => {
        window.addEventListener("resize", setWindowResizeing);
        if (focused && minimized) setMinimized(false);
    }, [focused]);
    if(!maximized && left+width>window.innerWidth && window.innerWidth-width>=0) left=window.innerWidth-width
    if(!maximized && top+height>window.innerHeight && window.innerHeight-height>=0) top=window.innerHeight-height
    if (!maximized && ((window.innerHeight<=height || window.innerWidth<=width ))) setMaximized([true,true])
    else if (fix_maximized && !((window.innerHeight<=height || window.innerWidth<=width ))) setMaximized([false,false])

    return (
        <div className={classes('Window',key,resizing && 'resizing',focused && 'focused', moving && 'moving',  minimized && 'minimized', maximized && 'maximized')}
            style={{ left, top, width, height, zIndex}}
            onMouseDown={e=>{if(!focused) navigate(key);}}
            onWheel={e=>{if(!focused) navigate(key);}}
        >
            {/* ############    상단바     ############ */}
            <div className='toolbar' 
                onDoubleClick={e=>{setMaximized([!maximized, false])}}
                onMouseDown={e=>{
                    const offsetX = e.clientX;
                    const offsetY = e.clientY;
                    setMoving(true);
                    const onMouseMove = e => {
                        if(fix_maximized) return ;
                        const dx = e.clientX - offsetX;
                        const dy = e.clientY - offsetY;

                        if(top+dy<-60) setMaximized([true, false]); // 어플리케이션을 최상단 위로 드래그시 전체화면으로 변경 (주석 해제시 하단 if 문을 else if 로 변경할것)
                        else if (maximized){  //전체 화면에서 상단바를 드래그 할때
                            // 커서의 x좌표가 어플리케이션 너비의 절반값을 화면너비의 시작과 끝에서 제외한 범위 안에 들어왔을때 바가 커서 중앙으로 고정
                            if(width/2<e.clientX&&e.clientX<window.innerWidth-width/2) left = e.clientX-width/2 
                            // 커서의 x좌표가 좌측을 기준으로 어플리케이션 너비안에 들어왔을 경우 바 좌표를 왼쪽으로 고정
                            else if (e.clientX<width/2) left = 0
                            // 커서의 x좌표가 우측을 기준으로 어플리케이션 너비안에 들어왔을 경우 바 좌표를 오른쪽으로 고정
                            else left = window.innerWidth-width
                            top=0; maximized=false
                            setMaximized([false, false]);
                        }else setMaximized([false, false]); // 커서를 놓지 않은 상태에서 어플리케이션바의 좌표가 최상단을 벗어났을때 전체화면 해제
                        
                        setCoords([
                          (left+dx >= 0 && left + dx + width <= window.innerWidth ? left + dx:(left+dx<=0?0:window.innerWidth-width)),
                          (top+dy >= 0 && top  + dy + height <= window.innerHeight && top+dy>=0 ? top + dy:(top+dy<=0?0:window.innerHeight-height)),
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

                <div className='info-container'>
                    <div className='image'><Icon iconKey={app.key}/></div>
                    <div className='title'>
                        <div className="name">{app.key}</div>
                    </div>
                </div>
                
                <div className="button-container">
                    <Link className="button button-close" to="/" onClick={() => Update({ closing: true })}>
                        <img className="normal" src={IconMap.Close}/>
                        <img className="hover" src={IconMap.HoverClose}/>
                    </Link>
                    <Link className="button button-minimize" to="/" onClick={e=>{setMinimized(true)}}>
                        <img className="normal" src={IconMap.Minimize}/>
                        <img className="hover" src={IconMap.Hoverminimize}/>
                    </Link>
                    <div className="button button-maximize" onClick={e=>{setMaximized([!maximized,fix_maximized])}}>
                        <img className="normal" src={IconMap.Maximize}/>
                        <img className="hover" src={IconMap.HoverMaximize}/>
                    </div>
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
                        <div key={sides.join('-')} className={classes('border', ...sides.map(side=>`border-${side}`))} style={{display:moving&&"none"}}
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

                                    sides.forEach(side => {
                                        switch (side) {
                                            case 'top':
                                                if(dy+top<0) setMaximized([true, false]);
                                                else setMaximized([false, false]);
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