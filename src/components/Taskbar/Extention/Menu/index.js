import { FileSystemContext, DeviceClassification } from 'contexts'
import { Icon } from 'components';
import { FaSearch as SearchIcon } from "react-icons/fa";
import { CgMenuGridR as MenuIcon } from "react-icons/cg";
import { useEffect, useState, useContext } from 'react';
import { useNavigate,useLocation } from 'react-router-dom'
import './style.scss'

function Menu({menuOpen, setMenuOpen}){
    const [location, setLocation] = useState(useLocation())
    const [FileSystem, reload] = useContext(FileSystemContext)
    const prelocation = useLocation()
    const navigate = useNavigate();

    const app = FileSystem.GetApps()

    useEffect(()=>{
        if(prelocation !== location){
            setMenuOpen(false)
            setLocation(prelocation)
        }
    })

    return(
        <>
            {menuOpen && <div className='Menu'>
                <div className='Search-Box'>
                    <SearchIcon/>
                    <input placeholder='Search' className='Search'/>
                </div>

                <div className='Application-Box'>
                    {Object.keys(app).map(key=>{
                        return (
                            <div onClick={()=>navigate(key)}>
                                <Icon iconUrl={app[key].icon}/>
                                <div className='FileName'>{key}</div>
                            </div>
                        )
                    })}
                </div>
            </div>}
            <MenuIcon className='MenuIcon' onClick={()=>setMenuOpen(!menuOpen)}/>
        </>
    )
}

export default Menu;