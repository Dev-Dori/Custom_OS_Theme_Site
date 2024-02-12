import React from 'react'
import { FileSystemContext } from 'contexts'
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icon } from 'components';
import './style.scss'
// import background from 'images/Wallpapers/background2.webp';
import { Wallpapers as background } from 'images';
import { Link } from 'react-router-dom';

function Desktop(){
    const [FileSystem,ReloadDir]  = useContext(FileSystemContext);
    const DesktopDir = FileSystem.GetDesktopDir();
    const [apps,GetApp] = useState(FileSystem.GetApps());
    const history = useNavigate();
    const location = useLocation();
    const currentUrl = location.pathname;

    const refresh=()=>{
        let change = false;
        apps && apps.forEach(app => {
            // URL에서 호출된 정보를 기준으로 포커스 여부 판단 
            const focused = (currentUrl.split("/")[1] === app.key);
            // 창이 닫힌 상태 -> 새로 열기
            if (app.closing) {
                app.closing = false;
                app.opened = false;
                app.focused = false;
                change=true;
            }
            // 창이 열려있는 상태 -> 다시 창을 클릭 한 경우
            if (focused && (!app.opened||!app.focused)){
                app.opened = true;
                app.zIndex = Math.max(...apps.map(app => app.zIndex)) + 1;
                change = true;
            }
            app.focused = focused; // 무한반복을 방지하기 위함
        });
        if(change) ReloadDir();
    }
    
    useEffect(() => {refresh()});



    return (
        <div className='Desktop'>
            {/* <div className="Wallpaper" style={{backgroundImage: `linear-gradient(to top, rgba(19, 21, 25, 0.5), rgba(19, 21, 25, 0.5)),url(${background})`}}></div> */}
            <div className="Wallpaper" style={{backgroundImage: `url(${background})`}}></div>
            <div className='app-container'>
                {DesktopDir.children.map(child=>{
                    if(!child.href){
                        return(
                        <Link to={child.key} className='shortcut' id={'cortcut-'+child.key} key={child.key}>
                            {/* <div className={'Icon icon '+child.key} style={{backgroundImage: `url(${child.Icon})`}}></div> */}
                            <Icon iconKey={child.key} />
                            <div className='name'>{child.key}</div>
                        </Link>)
                    }else{
                        return(
                        <a href={child.href} className='shortcut' id={'cortcut-'+child.key} key={child.key} target='blank'>
                            {/* <div className={'Icon icon '+child.key} style={{backgroundImage: `url(${child.Icon})`}}></div> */}
                            <Icon iconKey={child.key} />
                            <div className='name'>{child.key}</div>
                        </a>)
                    }}
                )}
            </div>
            <div className='window-container'>
                {apps && apps.filter(app=>app.opened).map(app=>(
                    <app.WindowComponent key={app.key} app={app}
                        Update={patch =>{
                            Object.assign(app, patch);
                            GetApp(apps)
                        ;}}
                    />
                ))}
            </div>
        </div>
    );
}

export default Desktop;                                          