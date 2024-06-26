import { Window } from 'components';
import { App, Dir, LinkFile, SymbolicLink } from 'beans';
import { FileSystemContext, DeviceClassification } from 'contexts'
import { Icon } from 'components';
import { useContext, useMemo, useState } from 'react';
import { useSearchParams,useNavigate } from 'react-router-dom'
import './style.scss'
import DirectoryExtension from './DirectoryExtension.js'
import { LuFolderRoot as Root ,LuFolderOpenDot as Home} from "react-icons/lu";

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
    const searchResult = search && FileSystem.Search(search)

    if(Object.keys(searchResult).length===1 && workDir !==`/${Object.values(searchResult)[0].GetWorkDir().join("/")}/`){
        setWorkDir(`/${Object.values(searchResult)[0].GetWorkDir().join("/")}/`)
    }

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
    
    useMemo(()=>{
        const path = serchParams.get("path")
        const target = getListSegments(getAbsolutePath(path))
        if(path&&target&&target instanceof Dir) setWorkDir(`/${getAbsolutePath(path).join("/")}/`)
        else if(target instanceof App) navigate(target.GetName())
        else if(target instanceof SymbolicLink) navigate(target.name)
    },[])
    
    const filelist = search?FileSystem.Search(search):getListSegments(getAbsolutePath(workDir)).children;

    return(
        <Window 
        Update = {Update}
        app = {app}
        ClassName='Window FileManager'
        Contents={(
            <div className='FileManager-Body'>
                <div className='SideBar'>
                    <input  type="text" className='FileManager-Search' placeholder='🔍 Search'
                            onFocus={(event)=>setSearch(event.target.value)}
                            onKeyUp={(event)=>{event.target.value?setSearch(event.target.value):setWorkDir(dirHistory.at(-1))||setSearch("")}}
                        />

                    <div className='SideBar-Group'>
                        <div className='Directory-Group' onClick={()=>window.scrollTo(0, 0)}>        
                            <div className='Group-Title'>Base</div>                
                            <div className={`FileManager-Directory ${!search&&workDir==="/"&&"focused"}`} onClick={()=>setWorkDir("/")||setSearch("")}>                        
                                <div className='item'><Root/> <div className='ObjectName'>Root</div></div>
                            </div>
                            <div className={`FileManager-Directory ${!search&&workDir===homeDir&&"focused"}`} onClick={()=>setWorkDir(homeDir)||setSearch("")}>
                                <div className='item'><Home/> <div className='ObjectName'>Home</div></div>
                            </div>
                        </div>

                        <div className='Directory-Group HomeDir' onClick={()=>setSearch("")}>  
                            <div className='Group-Title'>Libraries</div>      
                            <DirectoryExtension 
                                Directory={getListSegments(getAbsolutePath(homeDir))} 
                                workDir={workDir} setWorkDir={(path)=>{setWorkDir(path)||setDirHistory(dirHistory.concat(path))}} 
                                pwd={`${homeDir}`}
                            />
                        </div>

                    </div>

                </div>
                <div className='Contents'>
                    {
                        Object.keys(filelist).length>0?
                        Object.keys(filelist).map(key=>{
                            return(
                                <div app={`FileManager-InnerFile-${key}`} 
                                     key={`FileManager-InnerFile-${key}`}
                                     className={'FileManager-InnerFile'}
                                     onClick={()=>{
                                        const target = filelist[key]
                                        if(target instanceof Dir){
                                            const path = `/${target.GetWorkDir().join("/")}/`
                                            setWorkDir(path)
                                            setDirHistory(dirHistory.concat(path))
                                            setSearch("")
                                        }else if(target instanceof App) navigate(key)
                                        else if(target instanceof SymbolicLink) navigate(target.name)
                                        else if(target instanceof LinkFile && target.newTab) window.open(target.href)
                                        else if(target instanceof LinkFile) navigate(`browser?url=${target.href}`)
                                     }
                                }>
                                    <Icon iconUrl={filelist[key].icon}/>
                                    <div className='FileName'>{key}</div>
                                </div>
                            )
                        })
                        :
                        <div className='FileManager-Empty'>
                            {search?"Couldn't find your Search":"This Folder is Empty"}
                        </div>
                    }
                </div>
            </div>
        )}
    />);

}

export default FileManager;
