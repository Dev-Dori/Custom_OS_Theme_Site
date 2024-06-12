import { FileSystemContext } from 'contexts'
import { useRef, useEffect } from 'react';
import { useSearchParams,useNavigate } from 'react-router-dom'
import { LuFolderRoot as Root ,LuFolderOpenDot as Home,LuFolderHeart as Applications, LuMonitorCheck as Desktop, LuFile as Documents,LuFolderDown as Download, LuMusic4 as Music, LuTrash2 as Trash, LuFolderOpen as Folder, LuAppWindow as AppFile} from "react-icons/lu";
import { App, Dir, LinkFile, SymbolicLink, SystemDir } from 'beans';
import { LuChevronDown as ArrowDown, LuChevronRight as ArrowRight} from "react-icons/lu";

function DirectoryExtension({Directory, workDir, setWorkDir, pwd}){
    const navigate = useNavigate();
    const Ref = useRef(null);
    const SideBarIcon = {Applications:Applications, Desktop:Desktop, Downloads:Download, Documents:Documents, Music:Music, Trash:Trash}

    const key = Directory.key;
    const children = Directory.children;
    
    useEffect(()=>{
        if(Ref.current) Ref.current.scrollIntoView({block: "start", inline:"start", behavior: "smooth"});
        console.log(Ref)
    })

    return (
        <div className="Sub-Directory">
            {key.map(key=>{
                const target = children[key]
                const AppSideBarIcon = SideBarIcon[key]
                const focus = [`${pwd}${key}/`,`${pwd}${key}`].includes(workDir)
                return(
                    <div className='FileManager-Directory Children' key={`FileManager-Directory-Children-${key}`}>
                        <div className={`item ${focus&&"focused"}`} 
                             ref={focus?Ref:undefined}
                             onClick={()=>{
                                if(target instanceof App) navigate(key)
                                if(target instanceof SymbolicLink) navigate(target.name)
                                if(target instanceof LinkFile) window.open(target.href)
                                if(target instanceof Dir) setWorkDir(workDir.startsWith(`${pwd}${key}/`)?`${pwd}${key}`:`${pwd}${key}/`)
                                }
                             }
                            >

                                {target instanceof Dir && (target.key.length!=0) && (workDir && workDir.startsWith(`${pwd}${key}/`)?
                                    <ArrowDown className='Arrow'/>
                                    :
                                    <ArrowRight className='Arrow'/>)}
                                {target instanceof App || target instanceof SymbolicLink || target instanceof LinkFile ?
                                    <AppFile />
                                    :
                                    (AppSideBarIcon&&<AppSideBarIcon/>)||<Folder/>
                                } 
                                <div className='ObjectName'>{key}</div>

                        </div>
                        
                        {target instanceof Dir && target.key.length>0&&
                        (workDir.startsWith(`${pwd}${key}/`))&&
                        <DirectoryExtension 
                            Directory={target} 
                            workDir={workDir} setWorkDir={setWorkDir} 
                            pwd={`${pwd+key}/`} 
                        />}
                    </div>
                )
            })}
        </div>
    )
}

export default DirectoryExtension;