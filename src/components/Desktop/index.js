import { FileSystemContext } from 'contexts'
import { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Icon } from 'components';
import './style.scss'
import background from 'images/Wallpapers/background.jpg'
import { Link } from 'react-router-dom';

function Desktop(){
    const [FileSystem,ReloadDir]  = useContext(FileSystemContext);
    const DesktopDir = FileSystem.GetDesktopDir();
    const apps = FileSystem.GetApps();
    const history = useNavigate();
    const location = useLocation();
    const currentUrl = location.pathname;
    console.log('Desktop')
    useEffect(() => {
        apps && apps.forEach(app => {
            const focused = currentUrl.replace("/","") === app.key;
            if (focused && !app.opened){
                app.opened = true;
            }
            if (focused && !app.focused) {
                app.zIndex = Math.max(...apps.map(app => app.zIndex)) + 1;
            }
            app.focused = focused;
        });
        ReloadDir();
    }, [currentUrl]);

    useEffect(() => {
        apps && apps.forEach(app => {
            if (app.closing) {
            setTimeout(() => {
                app.closing = false;
                app.opened = false;
                ReloadDir();
            }, 100);
            }
        });
    });

    return (
        <div className='Desktop'>
            <div className="Wallpaper" style={{backgroundImage: `linear-gradient(to top, rgba(19, 21, 25, 0.5), rgba(19, 21, 25, 0.5)),url(${background})`}}></div>
            <div className='app-container'>
                {DesktopDir.children.map(child=>{
                    if(!child.href){
                        return(
                        <Link to={child.key} className='shortcut' id={'cortcut-'+child.key} key={child.key}>
                            {/* <div className={'Icon icon '+child.key} style={{backgroundImage: `url(${child.Icon})`}}></div> */}
                            <Icon iconKey={child.key} />
                            <div className='name'>{child.key}</div>
                        </Link>)
                    }else{
                        return(
                        <a href={child.href} className='shortcut' id={'cortcut-'+child.key} key={child.key} target='blank'>
                            {/* <div className={'Icon icon '+child.key} style={{backgroundImage: `url(${child.Icon})`}}></div> */}
                            <Icon iconKey={child.key} />
                            <div className='name'>{child.key}</div>
                        </a>)
                    }}
                )}
            </div>
            <div className='window-container'>
                {apps && apps.filter(app=>app.opened).map(app=>(
                    <app.WindowComponent key={app.key} app={app}
                        Update={patch =>{
                            Object.assign(app, patch);
                            ReloadDir()
                        ;}}
                    />
                ))}
            </div>
        </div>
    );
}

export default Desktop;                                          