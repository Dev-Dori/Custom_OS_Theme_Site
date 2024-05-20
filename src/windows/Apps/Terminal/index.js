import { Window } from 'components';
import { FileSystemContext, DeviceClassification } from 'contexts'
import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { App, Dir, LinkFile, SymbolicLink, SystemDir } from 'beans';
import './style.scss';

function Terminal({app, Update}){
    const navigate = useNavigate();
    const mobile = useContext(DeviceClassification)
    let WindowSize = {WindowHeight:450, WindowWidth:700};
    const scrollRef = useRef();
    const [FileSystem,setReload]  = useContext(FileSystemContext);
    const [cursorPosition, setCursorPosition] = useState(0)
    const [commandIndex,setCommandIndex] = useState([0,""]);
    const [command, setCommand] = useState("");
    const [user,setUser] = useState("DevDori")
    const [workDir, setWorkDir] = useState("/users/DevDori/Desktop")
    const [terminalCommandData, setTerminalCommandData] = useState([
        { type: "clear", value:0},
        { type: "output", value: "Welcome to the DevDori World !👋" },
        { type: "output", value: "Type \"help\" for all available commands."}
    ]);
    
    useEffect(()=>{
        scrollToBottom();
        !mobile && window.addEventListener("keydown",handleKeyDownEvent)
        return () => window.removeEventListener("keydown",handleKeyDownEvent);
    },[command,commandIndex,terminalCommandData,cursorPosition,mobile])


    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    };

    const handleKeyDownEvent = (event) => {
        if(!app.focused) return;
        if(event.ctrlKey&&event.key.length===1&&event.key.toUpperCase()==="C"){
            setTerminalCommandData([
                ...terminalCommandData,
                {type:"input", value:`${command}^${event.key.toUpperCase()}`, workDir:workDir.replace(`/users/${user}`||`/users/${user}}/`,"~")}
            ])
            setCommand("")
        }else if(event.key&&event.key.length===1){
            setCommand(command.substring(0,cursorPosition)+event.key+command.substring(cursorPosition))
            setCursorPosition(cursorPosition+1)
            setCommandIndex([getCommandHistory().length,command.substring(0,cursorPosition)+event.key+command.substring(cursorPosition)])
        }else if(event.key==="Enter") {
            setTerminalCommandData([...terminalCommandData,{type:"input", value:command, hidden:false,workDir:workDir.replace(`/users/${user}`||`/users/${user}}/`,"~")}])
            inputCommand(command)
            setCursorPosition(0)
            setCommandIndex([command.length>0?getCommandHistory().length+1:getCommandHistory().length,""])
            setCommand("")
        }else if(event.key==="Backspace"){ 
            setCommand(command.substring(0,cursorPosition-1)+command.substring(cursorPosition))
            setCommandIndex([commandIndex,command.substring(0,cursorPosition-1)+command.substring(cursorPosition)])
            setCursorPosition(cursorPosition-1>=0?cursorPosition-1:cursorPosition)
        }else if(event.key==="Tab"){
            event.preventDefault();
            if(command==="") return;
            let cmd=command.split(" ")
            let path=cmd.at(-1).indexOf("/")!==-1?cmd.at(-1).slice(0,cmd.at(-1).lastIndexOf("/")+1):"./"
            let ChangePath=cmd.pop().split("/")
            let list=Object.entries(getListSegments(getAbsolutePath(path)).children).filter(x=>x[0].startsWith(ChangePath.at(-1))||ChangePath.at(-1)==="")

            list.length>1&&setTerminalCommandData([
                ...terminalCommandData,
                {type:"input", value:command, workDir:workDir.replace(`/users/${user}`||`/users/${user}}/`,"~")},
                {type:"output", value:list.map(x=>`<span class="terminal-output-ls ${x[1].type}">${x[0]}</span>`).join("")}
            ])

            if(list.length===1){
                list = list[0]
                ChangePath.pop() 
                event.target.value=cmd.concat(`${path.startsWith("./")?path.replace("./",""):path}${list[0]}${list[1].type==="Dir"?"/":""}`).join(" ")
                setCommand(cmd.concat(`${path.startsWith("./")?path.replace("./",""):path}${list[0]}${list[1].type==="Dir"?"/":""}`).join(" "))
                setCursorPosition(cmd.concat(`${path.startsWith("./")?path.replace("./",""):path}${list[0]}${list[1].type==="Dir"?"/":""}`).join(" ").length)
            }

        }else if(event.key==="ArrowLeft"||event.key==="ArrowRight"){
            event.key==="ArrowLeft"?
            setCursorPosition(cursorPosition-1>=0?cursorPosition-1:cursorPosition)
            :
            setCursorPosition(cursorPosition+1<=command.length?cursorPosition+1:cursorPosition)
        }else if(event.key==="ArrowUp" || event.key==="ArrowDown"){
            let commandhistory=getCommandHistory().concat([commandIndex[1]])
            let cmdIndex=event.key==="ArrowUp"?commandIndex[0]-1>=0?commandIndex[0]-1:0:commandIndex[0]+1<commandhistory.length?commandIndex[0]+1:commandIndex[0]
            setCommand(commandhistory[cmdIndex].replaceAll("&lt;","<").replaceAll("&gt;",">"))
            setCursorPosition(commandhistory[cmdIndex].length)
            setCommandIndex([cmdIndex,commandIndex[1]])
            event.preventDefault(); // 방향키 제어시 스크롤 움직임 방지
        }
    }

    const getCommandHistory=()=>{
        return terminalCommandData.filter((tmpCmdData)=>{
            return tmpCmdData.type==="input"&&!tmpCmdData.hidden&&tmpCmdData.value&&tmpCmdData.value[0]!=="^"
        }).map(tmpCmdData=>tmpCmdData.value)
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
            if((tmpdir&&tmpdir.getChild(EachDirName))||!EachDirName){
                tmpdir=tmpdir.getChild(EachDirName)
            }else{
                tmpdir=false;
                return;
            }
        })
        return tmpdir
    }
    
    const print = (output) => {
        setTerminalCommandData([
            ...terminalCommandData,
            {type:"input", value:command, hidden:false, workDir:workDir.replace(`/users/${user}`||`/users/${user}}/`,"~")},
            {type:"output", value:output}
        ])
        return output
    }

    const inputCommand = (input) => {
        input=input.replaceAll("<","&lt;").replaceAll(">","&gt;")
        const cmd=input.split(/\s+/)[0]
        const args=input.split(/\s+/).splice(1)
        const pathArgs = args.find(arg => !arg.startsWith('-'));
        const absolutePath = getAbsolutePath(pathArgs?pathArgs:"./")
        const optionArg = args.find(arg => arg.startsWith('-'));
        const option = optionArg ? optionArg.substring(1).split('') : [];
        
        switch(cmd){
            case 'help':{
                let CommandOutput=[
                                "help   \t\tshow all the possible commands",
                                "whoami \t\tdisplay information about DevDori",
                                "pwd    \t\tPrint the name of the current working directory.",
                                "ls     \t\tlist directory contents",
                                "cd     \t\tchange the working directory",
                                "rm     \t\tremoves the entries for a specified file or directory",
                                "run    \t\trunning a specific application",
                                "mkdir  \t\tmake a new directory",
                                "history\t\tDisplay or manipulate the history list.",
                                "clear  \t\tclear the terminal screen",
                                ].join("\n")

                return print(CommandOutput);
            }

            case 'whoami':
                return print(user)
            
            case 'history':
                return print(getCommandHistory().concat("history").map((cmd,line)=>`${line+1}\t${cmd}`).join("\n"))

            case 'clear':
                terminalCommandData[0]={type: "clear", value:terminalCommandData.length}
                return print("")
            
            case 'pwd':return print(workDir);

            case 'cd':{
                let list=getListSegments(absolutePath)
                list instanceof Dir?
                    setWorkDir(absolutePath.join("/")?`/${absolutePath.join("/")}`:"/")
                    :
                    list?
                        print(`bash: ${cmd}: ${`/${absolutePath.join("/")}`}: Not a directory`)
                        :
                        print(`bash: ${cmd}: ${absolutePath.join("/")?`/${absolutePath.join("/")}`:"/"}: No such file or directory`)
                return;               
            }

            case 'll':
            case 'ls':{
                let list=getListSegments(absolutePath)
                return print(
                    list?
                        list.key?
                            list.key.map(x=>`<span class="terminal-output-ls ${list.children[x].type}">${x}</span>`).join("")
                            :
                            `<span class="terminal-output-ls ${list.type}">${list.name}</span>`
                        :
                        `bash: ${cmd}: cannot access '${absolutePath.join("/")?`/${absolutePath.join("/")}`:"/"}': No such file or directory`
                )
            }
          
            case 'rm':{
                const target = getListSegments(absolutePath)
                if(!pathArgs) return print(`bash: ${cmd}: missing operand`)
                
                if(!target)
                    return print(`bash: ${cmd}: cannot remove '${pathArgs?pathArgs:"./"}': No such file or directory`)
                
                if(target instanceof Dir && !option.includes("r")) 
                    return print(`bash: ${cmd}: '${pathArgs?pathArgs:"./"}': Is a directory`)
                
                if(target instanceof SystemDir && !option.includes("f")) 
                    return print(`bash: ${cmd}: '${pathArgs?pathArgs:"./"}': Permission denied`)
                
                if(target instanceof App && target.opened && !option.includes("f"))
                    return print(`bash: ${cmd}: '${pathArgs?pathArgs:"./"}': Application is running (try again with -f)`)

                target.remove()
                setReload()
                return;
            }

            case 'run':{
                const target = getListSegments(absolutePath)
                if(!pathArgs) return print(`bash: ${cmd}: missing operand`)
                if(target instanceof App || target instanceof SymbolicLink) navigate(`/${target instanceof SymbolicLink?target.name:absolutePath.at(-1)}`)
                else if(target instanceof LinkFile) window.open(target.href)
                else if(target) return(print(`bash: ${cmd}: '${pathArgs?pathArgs:"./"}': Is not a Application`))
                else return(print(`bash: ${cmd}: '${pathArgs?pathArgs:"./"}': No such file or directory`))
                return ;
            }

            case 'mkdir':{
                const parent = getListSegments(absolutePath.slice(0,-1))
                const newDirName = absolutePath.at(-1)
                if(parent.key.includes(newDirName)) return(print(`bash: ${cmd}: cannot create directory '${newDirName?newDirName:"./"}': File already exists`))
                parent.key.push(newDirName)
                parent.children[newDirName] = new Dir({})
                parent.children[newDirName].parent = parent
                return setReload();
            }

            case 'exit':{
                Update({ closing: true })
                navigate("/")
                return;
            }

            default:
                return print(cmd&&`-bash: ${cmd}: command not found`);
            
        }

    }

    return(
        <Window 
        Update = {Update}
        app = {app}
        WindowSize = {WindowSize}
        ClassName='Window Terminal'
        Contents={(
            <div className='Terminal-Body' ref={scrollRef} onKeyDown={handleKeyDownEvent}>
                {
                    Object.entries(terminalCommandData).map(([key]) => (
                            key>terminalCommandData[0].value&&(
                                terminalCommandData[key].type==="input"?
                                <div key={key} dangerouslySetInnerHTML={{__html:`${user}@W0R!D:${terminalCommandData[key].workDir}$ ${terminalCommandData[key].value}`}}></div>
                                :
                                terminalCommandData[key].type==="output"?
                                <div key={key} dangerouslySetInnerHTML={{__html:terminalCommandData[key].value}}></div>
                                :
                                false
                            )
                        )
                    )
                }
                <div className='terminal-input'>
                    <span>{user}@W0R!D:{workDir.replace("/users/"+user,"~")}$ </span>
                    {command.split('').map((char,index)=><span className={`input-char ${index===cursorPosition&&app.focused&&"cursor"} ${cursorPosition}`} key={`input-char-${index}`}>{char}</span>)}
                    {app.focused&&cursorPosition===command.length&&<span className='cursor'> </span>}
                </div>
                {mobile&&(<input type="text" className='mobile-terminal-input'
                                 onKeyUp={(event)=>{
                                            setCommand(event.key!=="Enter"?event.target.value:event.target.value="");
                                            setCursorPosition(event.key!=="Enter"?event.target.value.length:0);
                                        }}
                                 autoComplete="off" autoCorrect="off" autoCapitalize="off" spellCheck="false" autoFocus={true}
                            />
                         )}
            </div>
        )}
    />);
}

export default Terminal;