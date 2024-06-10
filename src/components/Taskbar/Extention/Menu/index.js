import { FileSystemContext, DeviceClassification } from 'contexts'
import { App } from 'beans';
import { Icon } from 'components';
import { FaSearch as SearchIcon } from "react-icons/fa";
import { CgMenuGridR as MenuIcon } from "react-icons/cg";
import { useEffect, useState, useContext } from 'react';
import { useNavigate,useLocation } from 'react-router-dom'
import './style.scss'

function Menu({menuOpen, setMenuOpen}){
    const [FileSystem, reload] = useContext(FileSystemContext)
    const [location, setLocation] = useState(useLocation())
    const [search, setSearch] = useState("")
    const prelocation = useLocation()
    const navigate = useNavigate();
    const app = search?FileSystem.GetAppsDir().Search(search):FileSystem.GetApps()

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
                    <input placeholder='Search' className='Search' onKeyUp={(event)=>setSearch(event.target.value)}/>
                </div>

                <div className='Application-Box'>
                    {Object.keys(app).map(key=>{
                        return (app[key] instanceof App) && (
                            <div onClick={()=>navigate(key)}>
                                <Icon iconUrl={app[key].icon}/>
                                <div className='FileName'>{key}</div>
                            </div>
                        )
                    }).filter(x=>x)}
                </div>
            </div>}
            <MenuIcon className='MenuIcon' onClick={()=>setMenuOpen(!menuOpen)}/>
        </>
    )
}

export default Menu;