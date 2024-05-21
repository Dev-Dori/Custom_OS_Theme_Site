import { Window } from 'components';
import { App, Dir, LinkFile, SymbolicLink } from 'beans';
import { FileSystemContext, DeviceClassification } from 'contexts'
import { useContext, useEffect, useState } from 'react';
import { useSearchParams,useNavigate } from 'react-router-dom'
import './style.scss'
import { ComingSoon } from 'windows';

function FileManager(props){
    const { Update, app } = props;
    const [FileSystem, reload] = useContext(FileSystemContext)
    const [workDir, setWorkDir] = useState("/users/DevDori/")
    const [searchParams, setSearchParams]=useSearchParams();
    const navigate = useNavigate();
    const homeDir = "/users/DevDori/"

    useEffect(()=>{
        const getDir = searchParams.get('path')?searchParams.get('path'):workDir
        setWorkDir(getListSegments(getAbsolutePath(getDir))?getDir:workDir)
    },[])
    // let WindowSize = {WindowHeight:450, WindowWidth:700};
    //return(<ComingSoon Update={Update} app={app}/>)

    const getAbsolutePath=(path)=>{
        if(!path) path=workDir;
        if(path==="~") path=`/users/${user}`
        else if(path.substr(0,2)==="~/") path=`/users/${user}`+path.replace("~","")
        else if(path.substr(0,2)==="./") path=`${workDir}/${path.replaceAll("./","")}`
        path=(path&&path[0]==="/"?path:`${workDir==="/"?"":workDir}/${path}`).split("/")
        path=path.filter(x=>x)
        //상위 디렉토리로 이동
        while(path.indexOf("..")!==-1) path.splice(path.indexOf("..")-1,2)
        return path
    }

    const getListSegments=(path)=>{
        while(path.indexOf("..")!==-1) path.splice(path.indexOf("..")-1,2)
        let tmpdir = FileSystem
        path&&path.forEach(EachDirName=>{
            if((tmpdir&&tmpdir.getChild(EachDirName))||!EachDirName)
                tmpdir=tmpdir.getChild(EachDirName)
            else return(tmpdir=false);
        })
        return tmpdir
    }


    const setDir = (path) => {
        if(path===workDir) return;
        setWorkDir(`${path}`)
        searchParams.set('path',`${path}`)
        setSearchParams(searchParams);
    }

    return(
        <Window 
        Update = {Update}
        app = {app}
        ClassName='Window FileManager'
        Contents={(
            <div className='FileManager-Body'>
                <div className='SideBar'>
                    <div className='FileManager-Directory'onClick={()=>setDir("/")}>Root</div>
                    <div className='FileManager-Directory'onClick={()=>setDir(homeDir)}>Home</div>
                    {getListSegments(getAbsolutePath(homeDir)).key.map(key=>{
                            return(<div className='FileManager-Directory' 
                                        key={`FileManager-Directory-${key}`}
                                        onClick={()=>setDir(`${homeDir}${key}/`)}
                            >{key}</div>)
                    })}
                </div>
                <div className='Contents'>
                    {
                        getListSegments(getAbsolutePath(workDir)).key.length>0?
                            getListSegments(getAbsolutePath(workDir)).key.map(key=>{
                                return(<div key={`FileManager-InnerFile-${key}`}
                                    onClick={()=>{
                                        const target = getListSegments(getAbsolutePath(workDir)).children[key]
                                        if(target instanceof Dir) setDir(`${workDir}${key}/`)
                                        else if(target instanceof App) navigate(key)
                                        else if(target instanceof SymbolicLink) navigate(target.name)
                                        else if(target instanceof LinkFile) window.open(target.href)
                                    }}
                                >{key}</div>)
                            })
                        :
                        (<div>EMPTY</div>)
                    }
                </div>
            </div>
        )}
    />);

}

export default FileManager;
