import background from 'images/Wallpapers/background.jpg'
import { FileSystemContext } from 'contexts'
import './style.scss'
import { useContext } from 'react';

function Desktop(){
    const data  = useContext(FileSystemContext);
    console.log(data);
    return (
        <div className='Desktop'>
            <div className="Wallpaper" style={{backgroundImage: `url(${background})`}}></div>
            <div className='app-container'>Desktop</div>
        </div>
    );
}

export default Desktop;