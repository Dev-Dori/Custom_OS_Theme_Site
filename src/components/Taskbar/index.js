import { FileSystemContext } from 'contexts'
import { useContext } from 'react';
import WindowIcon from 'images/Icon/Taskbar/windows.webp';
import { Link } from 'react-router-dom';
import { Icon } from 'components';
import { classes } from 'common/utils';
import './style.scss'

function Taskbar(){
    const [FileSystem,ReloadDir] = useContext(FileSystemContext);
    const DesktopDir = FileSystem.GetDesktopDir();
    const apps = FileSystem.GetApps();
    return (
        <div className="Taskbar">
            <div className='shortcut-container'>
                <Link className='shortcut pinned' to='menu'>
                    <Icon iconKey={'windows'}/>
                </Link>
                {apps && apps.filter(app=>app.opened || app.PinTaskbar).map(app=>(
                    <Link key={'shortcut-'+app.key} className={classes('shortcut','pinned',app.opened&&'active')} to={app.key}>
                        <Icon iconKey={app.key}/>
                    </Link>)
                )}
            </div>
        </div>
    )
}

export default Taskbar;