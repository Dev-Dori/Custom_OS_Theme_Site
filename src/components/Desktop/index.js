import background from 'images/Wallpapers/background.jpg'
import { FileSystemContext } from 'contexts'
import { useContext } from 'react';
import './style.scss'

function Desktop(){
    const [FileSystem,ReloadDir]  = useContext(FileSystemContext);

    console.log("Desktop load");
    console.log(FileSystem.GetUserDir(), FileSystem.GetDesktopDir(), FileSystem.GetAppsDir(), FileSystem.GetApps(), FileSystem.GetDesktop());

    return (
        <div className='Desktop'>
            <div className="Wallpaper" style={{backgroundImage: `url(${background})`}}></div>
            <div className='app-container'>Desktop</div>
        </div>
    );
}

export default Desktop;