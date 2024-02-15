// import { useState, useEffect } from 'react';
import React from 'react'
import { Desktop,Taskbar } from 'components';
import { FileSystemContext } from 'contexts'
import { RootDir } from 'beans';
import './style.scss'
import { useContext,useState } from 'react';

function Screen(){
    const [_ReloadDir, SetReloadDir] = useState(0);
    const ReloadDir = () => SetReloadDir(_ReloadDir+1); 
    console.log("======================")
    return (
        <div className='Screen'>
            <FileSystemContext.Provider value={[RootDir.instance, ReloadDir]}>
                <Desktop />
                <Taskbar />
            </FileSystemContext.Provider>
        </div>
      );
}

export default Screen;
