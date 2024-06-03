import { FileSystemContext } from 'contexts'
import Timer from './time.js'
import { useContext,useState,useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from 'components'; 
import { CgMenuGridR as Menu } from "react-icons/cg";
import { classes } from 'common/utils';
import './style.scss'

function Taskbar(){
    const location = useLocation();
    const currentUrl = location.pathname;
    const [FileSystem,ReloadDir] = useContext(FileSystemContext);
    const apps = FileSystem.GetApps();
    return (
        <div className="Taskbar">
            <Menu className='Menu'/>
            <div className='UserName'>DevDori</div>
            <div className='shortcut-container'>
                {apps&&Object.keys(apps).filter(key=>apps[key].opened).map(key=>{ //|| apps[key].PinTaskbar
                    return (
                        <Link key={'shortcut-'+key} className={classes('shortcut','pinned',apps[key].opened&&'active')}
                            to={key===currentUrl.split("/")[1]?"/":key}>
                            <Icon iconKey={key} iconUrl={apps[key].icon}/>
                        </Link>
                        )
                    }
                )}
            </div>
            <Timer />
        </div>
    )
}

export default Taskbar;