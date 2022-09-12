// import { useState, useEffect } from 'react';
import { Desktop } from 'components';
import { Taskbar } from 'components';
import { FileSystemContext } from 'contexts'
import { Dir } from 'beans';
import './style.scss'

function Screen(){
    return (
        <div className='Screen'>
            <FileSystemContext.Provider>
                <Desktop />
                <Taskbar />
            </FileSystemContext.Provider>
        </div>
      );
}

export default Screen;
