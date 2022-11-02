import { FileSystemContext } from 'contexts'
import { useContext,useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'components';
import { classes } from 'common/utils';
import './style.scss'

const getClock = () => {
    const two = (x) => x < 10 ? `0${x}` : x;
    const date = new Date();
    const H = date.getHours();
    const m = date.getMinutes();
    const hh = two(H % 12 || 12);
    const mm = two(m);
    const A = ['AM', 'PM'][H / 12 | 0];
    return `${hh}:${mm} ${A}`;
  };
  

function Taskbar(){
    const [FileSystem,ReloadDir] = useContext(FileSystemContext);
    const apps = FileSystem.GetApps();
    const [clock, setClock] = useState(getClock());

    useEffect(() => {
        const interval = window.setInterval(() => {
            const clock = getClock();
            setClock(clock);
        }, 1000);

        return () => {
            window.clearInterval(interval);
        };
    }, []);
    return (
        <div className="Taskbar">
            <div></div>
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
            <div className="label label-clock">
                <div className="name">{clock}</div>
            </div>
        </div>
    )
}

export default Taskbar;