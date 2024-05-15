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
    const [FileSystem]  = useContext(FileSystemContext);
    const GetDesktop = FileSystem.GetDesktopDir();
    const [apps,GetApp] = useState(FileSystem.GetApps());
    console.log(GetDesktop)

    const navigate = useNavigate();
    const location = useLocation();
    let currentUrl = location.pathname;

    const refresh=()=>{
        let change = false;
        for(let key in apps){
            // URL에서 호출된 정보를 기준으로 포커스 여부 판단 
            const focused = (currentUrl.split("/")[1] === key);
            if (currentUrl.split("/")[1]===""&&apps[key].focused&&!apps[key].closing){
                apps[key].minimized = true;
                apps[key].focused = false;
            } else apps[key].minimized = false;
            // 창이 닫힌 상태 -> 새로 열기
            if (apps[key].closing) {
                apps[key].closing = false;
                apps[key].opened = false;
                apps[key].focused = false;
            }
            // 창이 열려있는 상태 -> 다시 창을 클릭 한 경우
            if (focused && (!apps[key].opened||!apps[key].focused)){
                apps[key].opened = true;
                apps[key].zIndex = Math.max(...Object.keys(apps).map(app => apps[app].zIndex)) + 1;
                change = true;
            }
            apps[key].focused = focused; // 무한반복을 방지하기 위함
        }
    }
    
    useEffect(() => {refresh()});
    useEffect(() => {
        window.addEventListener("keydown", (event)=>{if(event.key=="Escape"&&window.location.pathname!="/"){navigate("/")}})
        // return () => {arguments.callee}
    },[])


    
    return (
        <div className='Desktop'>
            {/* <div className="Wallpaper" style={{backgroundImage: `linear-gradient(to top, rgba(19, 21, 25, 0.5), rgba(19, 21, 25, 0.5)),url(${background})`}}></div> */}
            <div className="Wallpaper" style={{backgroundImage: `url(${background})`}}></div>
            <div className='app-container'>
                {GetDesktop.key.map(key=>{
                    if(!GetDesktop.children[key].href){
                        return(
                        <Link to={GetDesktop.children[key].name} className='shortcut' id={'cortcut-'+key} key={key}>
                            <Icon iconUrl={apps[GetDesktop.children[key].name].icon}/> 
                            <div className='name'>{key}</div>
                        </Link>)
                    }else{
                        return(
                        <a href={GetDesktop.children[key].href} className='shortcut' id={'cortcut-'+key} key={key} target='blank'>
                            <Icon iconUrl={GetDesktop.children[key].icon}/>
                            <div className='name'>{key}</div>
                        </a>)
                    }
                })}
            </div>
            <div className='window-container'>
                {Object.keys(apps).filter(key=>apps[key].opened).map(key=>{
                        let application = Object.assign(apps[key],{"key":key});
                        return(<application.WindowComponent key={application.name} app={application}
                            Update={patch =>{
                                console.log(patch)
                                Object.assign(application, patch);
                                GetApp(apps)
                            ;}}
                        />)
                    })
                }
            </div>
        </div>
    );
}

export default Desktop;                                          