// import { useState, useEffect } from 'react';
import { Desktop } from 'components';
import { Taskbar } from 'components';
import { FileSystemContext } from 'contexts'
import { RootDir } from 'beans';
import './style.scss'

function Screen(){
    return (
        <div className='Screen'>
            <FileSystemContext.Provider value={[RootDir.instance]}>
                <Desktop />
                <Taskbar />
            </FileSystemContext.Provider>
        </div>
      );
}

export default Screen;
