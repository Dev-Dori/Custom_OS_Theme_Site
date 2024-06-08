import { FileSystemContext } from 'contexts'
import { Menu, Timer } from './Extention'
import { useContext,useState,useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from 'components'; 
import { CgMenuGridR as MenuIcon } from "react-icons/cg";
import { classes } from 'common/utils';
import './style.scss'

function Taskbar(){
    const location = useLocation();
    const currentUrl = location.pathname;
    const [FileSystem,ReloadDir] = useContext(FileSystemContext);
    const [menuOpen, setMenuOpen] = useState(false)
    const apps = FileSystem.GetApps();
    return (
        <div className="Taskbar">
            <Menu menuOpen={menuOpen} setMenuOpen={setMenuOpen}/>
            <div className='UserName'>DevDori</div>
            <div className='shortcut-container'>
                {apps&&Object.keys(apps).filter(key=>apps[key].opened).map(key=>( //|| apps[key].PinTaskbar
                        <Link key={'shortcut-'+key} className={classes('shortcut','pinned',apps[key].opened&&'active')}
                            to={!menuOpen&&key===currentUrl.split("/")[1]?"/":key}>
                            <Icon iconKey={key} iconUrl={apps[key].icon}/>
                        </Link>
                    )
                )}
            </div>
            <Timer />
        </div>
    )
}

export default Taskbar;