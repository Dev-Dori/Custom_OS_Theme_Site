import { DeviceClassification } from 'contexts'
import { useRef, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { LuFolderHeart as Applications, LuMonitorCheck as Desktop, LuFile as Documents,LuFolderDown as Download, LuMusic4 as Music, LuTrash2 as Trash, LuFolderOpen as Folder, LuAppWindow as AppFile} from "react-icons/lu";
import { App, Dir, LinkFile, SymbolicLink } from 'beans';
import { LuChevronDown as ArrowDown, LuChevronRight as ArrowRight} from "react-icons/lu";

function DirectoryExtension({Directory, workDir, setWorkDir, pwd}){
    const navigate = useNavigate();
    const Ref = useRef(null);
    const SideBarIcon = {Applications:Applications, Desktop:Desktop, Downloads:Download, Documents:Documents, Music:Music, Trash:Trash}
    const mobile = useContext(DeviceClassification)
    const key = Directory.key;
    const children = Directory.children;
    
    useEffect(()=>{
        if(Ref.current && !mobile) Ref.current.scrollIntoView({block: "center", inline:"start", behavior: "smooth"});
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
                                if(target instanceof LinkFile && target.newTab) window.open(target.href)
                                else if(target instanceof LinkFile) navigate(`browser?url=${target.href}`)
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