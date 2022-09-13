import { FileSystemContext } from 'contexts'
import { useContext } from 'react';
import './style.scss'

function Taskbar(){
    const [FileSystem,ReloadDir] = useContext(FileSystemContext);

    return (
        <div className="Taskbar">
            TaskBar
        </div>
    )
}

export default Taskbar;