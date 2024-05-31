import React from 'react'
import { FileSystemContext } from 'contexts'
import { useContext, useState } from 'react';
import { Icon } from 'components';
import './style.scss'
// import background from 'images/Wallpapers/background2.webp';
import { Wallpapers as background } from 'images';
import { Link } from 'react-router-dom';

function Desktop(){
    const [FileSystem]  = useContext(FileSystemContext);
    const GetDesktop = FileSystem.GetDesktopDir();
    const apps = FileSystem.GetApps()
    
    return (
        <div className='Desktop'>
            {/* <div className="Wallpaper" style={{backgroundImage: `linear-gradient(to top, rgba(19, 21, 25, 0.5), rgba(19, 21, 25, 0.5)),url(${background})`}}></div> */}
            {/* <div className="Wallpaper" style={{backgroundImage: `url(${background})`}}></div> */}
            <div className='app-container'>
                {GetDesktop&&GetDesktop.key.map(key=>{
                    if(!GetDesktop.children[key].href){
                        return(
                            <Link to={GetDesktop.children[key].name} className='shortcut' id={'cortcut-'+key} key={key}>
                                <Icon iconUrl={GetDesktop.children[key].icon}/> 
                                <div className='name'>{key}</div>
                            </Link>
                        )
                    }else{
                        return(
                            <a href={GetDesktop.children[key].href} className='shortcut' id={'cortcut-'+key} key={key} target='blank'>
                                <Icon iconUrl={GetDesktop.children[key].icon}/>
                                <div className='name'>{key}</div>
                            </a>
                        )
                    }
                })}
            </div>
            <div className='window-container'>
                {apps&&Object.keys(apps).filter(key=>apps[key].opened).map(key=>{
                        let application = Object.assign(apps[key],{"key":key});
                        return(<application.WindowComponent key={`App-${key}`} app={application}
                            Update={patch =>{
                                Object.assign(application, patch);
                            ;}}
                        />)
                    })
                }
            </div>
        </div>
    );
}

export default Desktop;                                          