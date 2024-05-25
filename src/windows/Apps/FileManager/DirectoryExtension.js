import { FileSystemContext } from 'contexts'
import { useContext } from 'react';
import { useSearchParams,useNavigate } from 'react-router-dom'
import { App, Dir, LinkFile, SymbolicLink, SystemDir } from 'beans';
import { LuChevronDown as ArrowDown, LuChevronRight as ArrowRight, LuFolderOpen as Folder, LuAppWindow as Applications} from "react-icons/lu";

function DirectoryExtension({Directory,workDir,setWorkDir,pwd}){
    const key = Directory.key;
    const children = Directory.children;
    return (
        <div className="Sub-Directory">
            {key.map(key=>{
                const target = children[key]
                return(
                    <div className='FileManager-Directory Children' key={`FileManager-Directory-Children-${key}`}
                        onClick={()=>{setWorkDir(pwd+key)}}>
                        {target instanceof Dir && (workDir && workDir.startsWith(pwd+key)?
                            <ArrowDown className='Arrow'/>
                            :
                            <ArrowRight className='Arrow'/>)}
                        {target instanceof App || target instanceof SymbolicLink || target instanceof LinkFile ?
                            <Applications />
                            :
                            <Folder />
                        } {key}

                        
                        {target instanceof Dir && target.key.length>0&&
                        (workDir.includes(pwd+key))&&
                        <DirectoryExtension Directory={target} workDir={workDir} pwd={`${pwd+key}/`}/>}
                    </div>
                )
            })}
        </div>
    )
}

export default DirectoryExtension;