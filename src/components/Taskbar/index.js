import { FileSystemContext } from 'contexts'
import { useContext,useState,useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icon } from 'components'; 
import { classes } from 'common/utils';
import './style.scss'


const getClock = () => {
    const two = (x) => x < 10 ? `0${x}` : x;
    const today = new Date();
    const H = today.getHours();
    const m = today.getMinutes();
    const hh = two(H % 12 || 12);
    const mm = two(m);
    const A = ['AM', 'PM'][H / 12 | 0];
    return `${hh}:${mm} ${A}`;
  };
  

function Taskbar(){
    const location = useLocation();
    const currentUrl = location.pathname;
    const [FileSystem,ReloadDir] = useContext(FileSystemContext);
    const apps = FileSystem.GetApps();
    const [time, setTime] = useState(new Date());


    useEffect(() => {
      const interval = setInterval(() => {
        setTime(new Date());
      }, 1000);
      return () => clearInterval(interval);
    }, []);


    // apps && apps.filter(app=>app.opened || app.PinTaskbar).map(app=>console.log(app.key))
    return (
        <div className="Taskbar">
            <div></div>
            <div className='shortcut-container'>
                {apps && apps.filter(app=>app.opened || app.PinTaskbar).map(app=>(
                    <Link key={'shortcut-'+app.key} className={classes('shortcut','pinned',app.opened&&'active')}
                          to={app.key===currentUrl.split("/")[1]?"/":app.key}>
                        <Icon iconKey={app.key}/>
                    </Link>)
                )}
            </div>
            <div className="label Date">
                <div>
                    {time.toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "numeric",
                    })}
                </div>
                <div>
                    {time.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "numeric",
                    })}
                </div>
            </div>
        </div>
    )
}

export default Taskbar;