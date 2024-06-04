import { FaSearch as SearchIcon } from "react-icons/fa";
import { CgMenuGridR as MenuIcon } from "react-icons/cg";
import { useEffect, useState } from 'react';
import './style.scss'

function Menu(){
    const [menuOpen, setMenuOpen] = useState(false)

    return(
        <>
            {menuOpen && <div className='Menu'>
                <div className='Search-Box'>
                    <SearchIcon/>
                    <input placeholder='Search' className='Search'/>
                </div>
            </div>}
            <MenuIcon className='MenuIcon' onClick={()=>{
                setMenuOpen(!menuOpen)
                if(menuOpen) window.addEventListener("click",()=>setMenuOpen(false), {once: true})
            }}/>
        </>
    )
}

export default Menu;