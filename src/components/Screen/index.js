// import { useState, useEffect } from 'react';
import React from 'react'
import { Desktop,Taskbar } from 'components';
import { FileSystemContext } from 'contexts'
import { RootDir } from 'beans';
import './style.scss'
import { useState } from 'react';

function Screen(){
    const [_ReloadDir, SetReloadDir] = useState(0);
    const ReloadDir = () => SetReloadDir(_ReloadDir+1); 
    console.log("최상위 프롭스 호출\n======================")
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
