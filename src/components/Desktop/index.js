import background from 'images/Wallpapers/background.jpg'
import { FileSystemContext } from 'contexts'
import { useContext } from 'react';
import './style.scss'
import { Link } from 'react-router-dom';

function Desktop(){
    const [FileSystem,ReloadDir]  = useContext(FileSystemContext);

    const DesktopDir = FileSystem.GetDesktopDir();
    const Apps = FileSystem.GetApps();
    console.log("Desktop load");
    console.log(FileSystem);


    // function App(){
        
    // }
    // const a = DesktopDir.children.map((child)=>{
    //     if(child.constructor.name === "SymlinkFile"){
    //         // console.log(child.AppName,child.command, a.find((element) => {return element.key === child.AppName}));
    //         // let p = (new (a.find((element) => (element.key === child.AppName)))).Icon
    //         console.log(Apps.find((element) => (element.key === child.AppName)).Icon);
    //     }else{
    //         return '11';
    //     }
    // })

    // console.log(a);


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