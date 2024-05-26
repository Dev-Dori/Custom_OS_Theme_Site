import { FileSystemContext } from 'contexts'
import { useContext } from 'react';
import { useSearchParams,useNavigate } from 'react-router-dom'
import { App, Dir, LinkFile, SymbolicLink, SystemDir } from 'beans';
import { LuChevronDown as ArrowDown, LuChevronRight as ArrowRight, LuFolderOpen as Folder, LuAppWindow as Applications} from "react-icons/lu";

function DirectoryExtension({Directory,workDir,setWorkDir,pwd}){
    const navigate = useNavigate();
    const key = Directory.key;
    const children = Directory.children;
    return (
        <div className="Sub-Directory">
            {key.map(key=>{
                const target = children[key]
                return(
                    <div className='FileManager-Directory Children' key={`FileManager-Directory-Children-${key}`}>
                        <div className={`item ${([`${pwd}${key}/`,`${pwd}${key}`].includes(workDir))&&"focused"}`}
                            onClick={()=>{
                                if(target instanceof App) navigate(key)
                                if(target instanceof SymbolicLink) navigate(target.name)
                                if(target instanceof LinkFile) window.open(target.href)
                                if(target instanceof Dir) setWorkDir(workDir.startsWith(`${pwd}${key}/`)?`${pwd}${key}`:`${pwd}${key}/`)}}>

                                {target instanceof Dir && (workDir && workDir.startsWith(`${pwd}${key}/`)?
                                    <ArrowDown className='Arrow'/>
                                    :
                                    <ArrowRight className='Arrow'/>)}
                                {target instanceof App || target instanceof SymbolicLink || target instanceof LinkFile ?
                                    <Applications />
                                    :
                                    <Folder />
                                } {key}

                        </div>
                        
                        {target instanceof Dir && target.key.length>0&&
                        (workDir.startsWith(`${pwd}${key}/`))&&
                        <DirectoryExtension Directory={target} workDir={workDir} setWorkDir={setWorkDir} pwd={`${pwd+key}/`}/>}
                    </div>
                )
            })}
        </div>
    )
}

export default DirectoryExtension;