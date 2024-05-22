import { Window } from 'components';
import { App, Dir, LinkFile, SymbolicLink } from 'beans';
import { FileSystemContext, DeviceClassification } from 'contexts'
import { Icon } from 'components';
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
    const user = "DevDori"
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
                    <div className={`FileManager-Directory ${workDir==="/"&&"focused"}`}onClick={()=>setDir("/")}>Root</div>
                    <div className={`FileManager-Directory ${workDir.endsWith("/DevDori/")&&"focused"}`}onClick={()=>setDir(homeDir)}>Home</div>
                    {getListSegments(getAbsolutePath(homeDir)).key.map(app=>{
                            return(<div className={`FileManager-Directory ${workDir.includes(app)&&"focused"}`} 
                                        app={`FileManager-Directory-${app}`}
                                        onClick={()=>setDir(`${homeDir}${app}/`)}
                            >{app}</div>)
                    })}
                </div>
                <div className='Contents'>
                    {
                        getListSegments(getAbsolutePath(workDir)).key.length>0?
                            getListSegments(getAbsolutePath(workDir)).key.map(app=>{
                                const list = getListSegments(getAbsolutePath(workDir))
                                return(
                                <div app={`FileManager-InnerFile-${app}`} 
                                     className={'FileManager-InnerFile'}
                                        onClick={()=>{
                                            console.log(workDir.includes(app) && "focused")
                                            const target = list.children[app]
                                            if(target instanceof Dir) setDir(`${workDir}${app}/`)
                                            else if(target instanceof App) navigate(app)
                                            else if(target instanceof SymbolicLink) navigate(target.name)
                                            else if(target instanceof LinkFile) window.open(target.href)
                                        }
                                }>
                                    <Icon iconUrl={list.children[app].icon}/>
                                    <div className='FileName'>{app}</div>
                                </div>)
                            })
                        :
                        (<div className='FileManager-Empty'>This Folder is Empty</div>)
                    }
                </div>
            </div>
        )}
    />);

}

export default FileManager;
