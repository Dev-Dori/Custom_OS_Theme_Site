import background from 'images/Wallpapers/background.jpg'
import { FileSystemContext } from 'contexts'
import { useContext } from 'react';
import './style.scss'
import { Link } from 'react-router-dom';

function Desktop(){
    const [FileSystem,ReloadDir]  = useContext(FileSystemContext);

    const DesktopDir = FileSystem.GetDesktopDir();
    console.log("Desktop load");
    console.log(FileSystem);


    return (
        <div className='Desktop'>
            <div className="Wallpaper" style={{backgroundImage: `url(${background})`}}></div>
            <div className='app-container'>
                {DesktopDir.children.map(child=>(
                    <Link to={child.key} className='shortcut' id={'cortcut-'+child.key} key={child.key}>
                        <div className={'Icon icon '+child.key} style={{backgroundImage: `url(${child.Icon})`}}></div>
                        <div className='name'>{child.key}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Desktop;                                          