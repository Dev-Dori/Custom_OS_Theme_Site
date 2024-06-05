import { Window } from 'components';
import { App, Dir, LinkFile, SymbolicLink } from 'beans';
import { FileSystemContext, DeviceClassification } from 'contexts'
import { Icon } from 'components';
import { useContext, useEffect, useState } from 'react';
import { useSearchParams,useNavigate } from 'react-router-dom'
import './style.scss'
import DirectoryExtension from './DirectoryExtension.js'
import { ComingSoon } from 'windows';
import { LuFolderRoot as Root ,LuFolderOpenDot as Home,LuFolderHeart as Applications, LuMonitorCheck as Desktop, LuFile as Documents,LuFolderDown as Download, LuMusic4 as Music, LuTrash2 as Trash, LuFolderOpen as Folder} from "react-icons/lu";
import { LuChevronDown as ArrowDown, LuChevronRight as ArrowRight } from "react-icons/lu";

function FileManager(props){
    const { Update, app } = props;
    const [serchParams, setSearchParams] = useSearchParams();
    const [FileSystem, reload] = useContext(FileSystemContext)
    const [workDir, setWorkDir] = useState("/users/DevDori/")
    const [dirHistory, setDirHistory] = useState([workDir])
    const [search, setSearch] = useState("")
    const navigate = useNavigate();
    const user = "DevDori"
    const homeDir = "/users/DevDori/"
    const SideBarIcon = {Applications:Applications, Desktop:Desktop, Downloads:Download, Documents:Documents, Music:Music, Trash:Trash}
    const searchResult = search && FileSystem.Search(search)
    

    if(Object.keys(searchResult).length===1 && workDir !==`/${Object.values(searchResult)[0].GetWorkDir().join("/")}/`){
        setWorkDir(`/${Object.values(searchResult)[0].GetWorkDir().join("/")}/`)
    }

    useEffect(()=>{
        const path = serchParams.get("path")
        if(path&& getListSegments(getAbsolutePath(path))) setWorkDir(`/${getAbsolutePath(path).join("/")}/`)
        window.history.pushState({page:1},{page:1},window.location.href.split("?")[0])
    },[])

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
    
    const workDirList = getListSegments(getAbsolutePath(workDir)) instanceof Dir ? getListSegments(getAbsolutePath(workDir)) : getListSegments(getAbsolutePath(workDir)).parent
    console.log(dirHistory)
    return(
        <Window 
        Update = {Update}
        app = {app}
        ClassName='Window FileManager'
        Contents={(
            <div className='FileManager-Body'>
                <div className='SideBar'>
                    <input  type="text" className='FileManager-Search' placeholder='🔍 Search'
                            // key={workDir}
                            // defaultValue={search}
                            onFocus={(event)=>{setSearch(event.target.value)}}
                            onKeyUp={(event)=>{event.target.value?setSearch(event.target.value):setWorkDir(dirHistory.at(-1))||setSearch(event.target.value)}}
                        />

                    <div className='SideBar-Group'>
                        <div className='Directory-Group'>        
                            <div className='Group-Title'>Base</div>                
                            <div className={`FileManager-Directory ${!search&&workDir==="/"&&"focused"}`} onClick={()=>setWorkDir("/")||setSearch("")}>                        
                                <div className='item'><Root/> Root</div>
                            </div>
                            <div className={`FileManager-Directory ${!search&&workDir===homeDir&&"focused"}`} onClick={()=>setWorkDir(homeDir)||setSearch("")}>
                                <div className='item'><Home/> Home</div>
                            </div>
                        </div>

                        <div className='Directory-Group HomeDir'>  
                            <div className='Group-Title'>Libraries</div>      

                            {getListSegments(getAbsolutePath(homeDir)).key.map(app=>{
                                    const target = getListSegments(getAbsolutePath(homeDir)).children[app]
                                    const AppSideBarIcon = SideBarIcon[app]
                                    return( 
                                        <div    className={`FileManager-Directory`}
                                                key={`FileManager-Directory-${app}`} 
                                                app={`FileManager-Directory-${app}`}
                                                onClick={()=>setSearch("")}
                                                >

                                                <div className={`item ${!search&&([homeDir+app,homeDir+app+"/"].includes(workDir))&&"focused"}`}
                                                    onClick={()=>setWorkDir(workDir.startsWith(`${homeDir}${app}/`)?`${homeDir}${app}`:`${homeDir}${app}/`)||setDirHistory(dirHistory.concat(workDir.startsWith(`${homeDir}${app}/`)?`${homeDir}${app}`:`${homeDir}${app}/`))}>
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

                </div>
                <div className='Contents'>
                    {/* <input type="text" className='Directory-Path' key={workDir} defaultValue={workDir} 
                           onKeyUp={(event)=>{
                            if(event.key==="Enter"&&getListSegments(getAbsolutePath(event.target.value))){
                                setWorkDir(event.target.value)
                            }}}
                            /> */}

                    {
                    !search?
                        workDirList instanceof Dir && workDirList.key.length===0?
                            (<div className='FileManager-Empty'>This Folder is Empty</div>)
                            :
                            workDirList.key.map(app=>{
                                return(
                                <div app={`FileManager-InnerFile-${app}`} 
                                    key={`FileManager-InnerFile-${app}`}
                                    className={'FileManager-InnerFile'}
                                        onClick={()=>{
                                            console.log(`${workDir}${app}/`)
                                            const target = workDirList.children[app]
                                            if(target instanceof Dir){
                                                const path = `/${target.GetWorkDir().join("/")}/`
                                                setWorkDir(path)
                                                setDirHistory(dirHistory.concat(path))
                                                setSearch("")
                                            }else if(target instanceof App) navigate(app)
                                            else if(target instanceof SymbolicLink) navigate(target.name)
                                            else if(target instanceof LinkFile) window.open(target.href)
                                        }
                                }>
                                    <Icon iconUrl={workDirList.children[app].icon}/>
                                    <div className='FileName'>{app}</div>
                                </div>)
                            })

                        :
                        Object.keys(searchResult).map(app=>{
                            return(
                                <div app={`FileManager-InnerFile-${app}`} 
                                     key={`FileManager-InnerFile-${app}`}
                                     className={'FileManager-InnerFile'}
                                     onClick={()=>{
                                        const target = searchResult[app]
                                        if(target instanceof Dir){
                                            const path = `/${target.GetWorkDir().join("/")}/`
                                            setWorkDir(path)
                                            setDirHistory(dirHistory.concat(path))
                                            setSearch("")
                                        }else if(target instanceof App) navigate(app)
                                        else if(target instanceof SymbolicLink) navigate(target.name)
                                        else if(target instanceof LinkFile) window.open(target.href)
                                    }}>

                                    <Icon iconUrl={searchResult[app].icon}/>
                                    <div className='FileName'>{app}</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )}
    />);

}

export default FileManager;
