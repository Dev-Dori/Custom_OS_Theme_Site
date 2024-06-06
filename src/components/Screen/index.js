// import { useState, useEffect } from 'react';
import React from 'react'
import { Wallpaper,Desktop,Taskbar } from 'components';
import { DeviceClassification, FileSystemContext } from 'contexts'
import { RootDir } from 'beans';
import { useState, useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom'
import './style.scss'

const isMobile = () => {
    const { clientWidth } = document.body;
    return clientWidth <= 512;
  };

function Screen(){
    const [mobile, setMobile] = useState(isMobile());
    const [reload, setReload] = useState(0)
    const FileSystem = RootDir.instance
    const navigate = useNavigate();
    const apps = FileSystem.GetApps();
    const location = useLocation();

    console.log("=== SCREEN RENDERING ===")
    console.log(`LOCATION : ${location.pathname}`)
    console.log(`PARAMETER : ${unescape(location.search)}`)
    console.log(`DEVICE MODE : ${mobile?"mobile":"PC"}`)

    useEffect(() => {
        const onResize = () => {setMobile(isMobile());};
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    useEffect(()=>{
        const Escape=(event)=>{ if(event.key==="Escape"&&location.pathname!=="/") navigate("/")}
        window.addEventListener("keydown", Escape)
        return () => window.removeEventListener("keydown", Escape)
    },[location])


    for(let key in apps){
        // URL에서 호출된 정보를 기준으로 포커스 여부 판단 
        const focused = (location.pathname.split("/")[1] === key);
        if (location.pathname.split("/")[1]===""&&apps[key].focused&&!apps[key].closing){
            apps[key].minimized = true;
            apps[key].focused = false;
        } else apps[key].minimized = false;
        // 창이 닫힌 상태 -> 새로 열기
        if (apps[key].closing) {
            apps[key].closing = false;
            apps[key].opened = false;
            apps[key].focused = false;
        }
        // 창이 열려있는 상태 -> 다시 창을 클릭 한 경우
        if (focused && (!apps[key].opened||!apps[key].focused)){
            apps[key].opened = true;
            apps[key].zIndex = Math.max(...Object.keys(apps).map(app => apps[app].zIndex)) + 1;
        }
        apps[key].focused = focused; // 무한반복을 방지하기 위함
    }
    
    return (
        <DeviceClassification.Provider value={mobile}>
            <FileSystemContext.Provider value={[FileSystem, ()=>{setReload(reload+1)}]}>
                {FileSystem.key.length>0&&(
                    <div className='Screen'>
                        <Wallpaper />
                        <Desktop />
                        <Taskbar />
                    </div>
                )}
            </FileSystemContext.Provider>
        </DeviceClassification.Provider>
      );
}

export default Screen;
