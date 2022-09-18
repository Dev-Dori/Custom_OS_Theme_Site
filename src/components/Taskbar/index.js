import { FileSystemContext } from 'contexts'
import { useContext } from 'react';
import WindowIcon from 'images/Icon/Taskbar/windows.webp';
import { Link } from 'react-router-dom';
import './style.scss'

function Taskbar(){
    const [FileSystem,ReloadDir] = useContext(FileSystemContext);
    return (
        <div className="Taskbar">
            <div className='shortcut-container'>
                <Link className='shortcut pinned' to='/menu'>
                    <div className='Icon icon' style={{backgroundImage:`url(${WindowIcon})`}}></div>
                </Link>
            </div>
        </div>
    )
}

export default Taskbar;