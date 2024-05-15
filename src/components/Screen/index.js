// import { useState, useEffect } from 'react';
import React from 'react'
import { Desktop,Taskbar } from 'components';
import { FileSystemContext } from 'contexts'
import { RootDir } from 'beans';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom'
import './style.scss'

function Screen(){
    const [reload, SetReload] = useState(0);
    const [FileSystem, SetFileSystem] = useState(RootDir.instance)
    const location = useLocation()

    useEffect(() => {SetReload(reload+1)}, [location])
    console.log("=========Reload=========")
    return (
        <div className='Screen'>
            {/* <FileSystemContext.Provider value={[RootDir.instance, ReloadDir]}> */}
            <FileSystemContext.Provider value={[FileSystem, SetFileSystem]}>
                <Desktop />
                <Taskbar />
            </FileSystemContext.Provider>
        </div>
      );
}

export default Screen;
