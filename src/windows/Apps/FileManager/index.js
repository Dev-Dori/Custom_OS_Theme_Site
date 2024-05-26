import { Window } from 'components';
import { App, Dir, LinkFile, SymbolicLink } from 'beans';
import { FileSystemContext, DeviceClassification } from 'contexts'
import { Icon } from 'components';
import { useContext, useEffect, useState } from 'react';
import { useSearchParams,useNavigate } from 'react-router-dom'
import './style.scss'
import { ComingSoon, DirectoryExtension } from 'windows';
import { LuFolderRoot as Root ,LuFolderOpenDot as Home,LuFolderHeart as Applications, LuMonitorCheck as Desktop, LuFile as Documents,LuFolderDown as Download, LuMusic4 as Music, LuTrash2 as Trash, LuFolderOpen as Folder} from "react-icons/lu";
import { LuChevronDown as ArrowDown, LuChevronRight as ArrowRight } from "react-icons/lu";
function FileManager(props){
    const { Update, app } = props;
    const [FileSystem, reload] = useContext(FileSystemContext)
    const [workDir, setWorkDir] = useState("/users/DevDori/")
    const navigate = useNavigate();
    const user = "DevDori"
    const homeDir = "/users/DevDori/"
    const SideBarIcon = {Applications:Applications, Desktop:Desktop, Downloads:Download, Documents:Documents, Music:Music, Trash:Trash}

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

    console.log(workDir,getListSegments(getAbsolutePath(workDir)).key.length)

    return(
        <Window 
        Update = {Update}
        app = {app}
        ClassName='Window FileManager'
        Contents={(
            <div className='FileManager-Body'>
                <div className='SideBar'>
                    <div className='SideBar-Group'>        
                        <div className='Group-Title'>Base</div>                
                        <div className={`FileManager-Directory ${workDir==="/"&&"focused"}`}onClick={()=>setWorkDir("/")}>                        
                            <div className='item'><Root/> Root</div>
                        </div>
                        <div className={`FileManager-Directory ${workDir===homeDir&&"focused"}`}onClick={()=>setWorkDir(homeDir)}>
                            <div className='item'><Home/> Home</div>
                        </div>
                    </div>

                    <div className='SideBar-Group HomeDir'>  
                        <div className='Group-Title'>Libraries</div>      

                        {getListSegments(getAbsolutePath(homeDir)).key.map(app=>{
                                const target = getListSegments(getAbsolutePath(homeDir)).children[app]
                                const AppSideBarIcon = SideBarIcon[app]
                                return( 
                                    <div    className={`FileManager-Directory`}
                                            key={`FileManager-Directory-${app}`} 
                                            app={`FileManager-Directory-${app}`}>

                                            <div className={`item ${(workDir===homeDir+app+"/")&&"focused"}`}
                                                onClick={()=>setWorkDir(workDir.startsWith(`${homeDir}${app}/`)?`${homeDir}${app}`:`${homeDir}${app}/`)}>
                                                {target.key.length>0&&(workDir.startsWith(`${homeDir}${app}/`)?
                                                                            <ArrowDown className='Arrow'/>
                                                                            :
                                                                            <ArrowRight className='Arrow'/>)}

                                                {(AppSideBarIcon&&<AppSideBarIcon/>)||<Folder/>} {app}
                                            </div>
                                                {target.key.length>0&&
                                                (workDir.startsWith(`${homeDir}${app}/`))&&
                                                <DirectoryExtension Directory={target} workDir={workDir} setWorkDir={setWorkDir} pwd={`${homeDir}${app}/`} />}
                                    </div>
                                )
                        })}
                        
                    </div>

                </div>
                <div className='Contents'>
                    <div className='Directory-Path'>{workDir}</div>
                    {
                        getListSegments(getAbsolutePath(workDir)).key.length>0?
                            getListSegments(getAbsolutePath(workDir)).key.map(app=>{
                                const list = getListSegments(getAbsolutePath(workDir))
                                return(
                                <div app={`FileManager-InnerFile-${app}`} 
                                     key={`FileManager-InnerFile-${app}`}
                                     className={'FileManager-InnerFile'}
                                        onClick={()=>{
                                            console.log(`${workDir}${app}/`)
                                            const target = list.children[app]
                                            if(target instanceof Dir) setWorkDir(`${workDir}${app}/`)
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
