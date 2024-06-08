import { FaSearch as SearchIcon } from "react-icons/fa";
import { CgMenuGridR as MenuIcon } from "react-icons/cg";
import { useEffect, useState } from 'react';
import { useNavigate,useLocation } from 'react-router-dom'
import './style.scss'

function Menu({menuOpen, setMenuOpen}){
    const [location, setLocation] = useState(useLocation())
    if(useLocation() !== location){
        setMenuOpen(false)
        setLocation(useLocation())
    }   

    return(
        <>
            {menuOpen && <div className='Menu' onClick={()=>setMenuOpen(!menuOpen)}>
                <div className='Search-Box'>
                    <SearchIcon/>
                    <input placeholder='Search' className='Search'/>
                </div>
            </div>}
            <MenuIcon className='MenuIcon' onClick={()=>setMenuOpen(!menuOpen)}/>
        </>
    )
}

export default Menu;