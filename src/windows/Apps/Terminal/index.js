import { Window } from 'components';
import { ComingSoon } from 'windows';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';

function Terminal({app, Update, FileSystem}){
    const navigate = useNavigate();
    let WindowSize = {WindowHeight:450, WindowWidth:700};
    const scrollRef = useRef();
    const [cursorPosition, setCursorPosition] = useState(0)
    const [commandIndex,setCommandIndex] = useState([0,""]);
    const [command, setCommand] = useState("");
    const [user,setUser] = useState("DevDori")
    const [workDir, setWorkDir] = useState("/users/DevDori")
    const [terminalCommandData, setTerminalCommandData] = useState([
        { type: "clear", value:0},
        { type: "output", value: "Welcome to the DevDori World !👋" },
        { type: "output", value: "Type \"help\" for all available commands."}
    ]);
    
    useEffect(()=>{
        scrollToBottom();
        window.addEventListener("keydown",handleKeyDownEvent)
        return () => window.removeEventListener("keydown",handleKeyDownEvent);
    },[command,commandIndex,terminalCommandData,cursorPosition])


    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    };

    const handleKeyDownEvent = (event) => {
        if(!app.focused) return;
        if(event.ctrlKey&&event.key.length===1&&event.key.toUpperCase()==="C"){
            execCommand(`^${event.key.toUpperCase()}`)
        }else if(event.key&&event.key.length===1){
            setCommand(command.substring(0,cursorPosition)+event.key+command.substring(cursorPosition))
            setCursorPosition(cursorPosition+1)
            setCommandIndex([getCommandHistory().length,command.substring(0,cursorPosition)+event.key+command.substring(cursorPosition)])
        }else if(event.key==="Enter") {
            inputCommand(command)
            setCursorPosition(0)
            setCommandIndex([command.length>0?getCommandHistory().length+1:getCommandHistory().length,""])
            setCommand("")
        }else if(event.key==="Backspace"){ 
            setCommand(command.substring(0,cursorPosition-1)+command.substring(cursorPosition))
            setCommandIndex([commandIndex,command.substring(0,cursorPosition-1)+command.substring(cursorPosition)])
            setCursorPosition(cursorPosition-1>=0?cursorPosition-1:cursorPosition)
        }else if(event.key==="ArrowLeft"||event.key==="ArrowRight"){
            event.key==="ArrowLeft"?
            setCursorPosition(cursorPosition-1>=0?cursorPosition-1:cursorPosition)
            :
            setCursorPosition(cursorPosition+1<=command.length?cursorPosition+1:cursorPosition)
        }else if(event.key==="ArrowUp" || event.key==="ArrowDown"){
            let commandhistory=getCommandHistory().concat([commandIndex[1]])
            let cmdIndex=event.key==="ArrowUp"?commandIndex[0]-1>=0?commandIndex[0]-1:0:commandIndex[0]+1<commandhistory.length?commandIndex[0]+1:commandIndex[0]
            console.log(commandhistory,commandhistory[cmdIndex],cmdIndex)
            setCommand(commandhistory[cmdIndex].replaceAll("&lt;","<").replaceAll("&gt;",">"))
            setCursorPosition(commandhistory[cmdIndex].length)
            setCommandIndex([cmdIndex,commandIndex[1]])
            event.preventDefault(); // 방향키 제어시 스크롤 움직임 방지
        }
    }

    const getCommandHistory=()=>{
        return terminalCommandData.filter((tmpCmdData)=>{
            return tmpCmdData.type==="input"&&tmpCmdData.value&&tmpCmdData.value[0]!=="^"
        }).map(tmpCmdData=>tmpCmdData.value)
    }

    const getAbsolutePath=(path)=>{
        if(!path) return;
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
    
    const execCommand = (cmd, output) => {
        let cmdData=(cmd!==undefined)?[...terminalCommandData,{type:"input", value:cmd, workDir:workDir.replace(`/users/${user}`||`/users/${user}}/`,"~")}]:terminalCommandData
        if(output!==undefined) cmdData.push({type:"output", value:output})
        setTerminalCommandData(cmdData)
    }

    const inputCommand = (cmd) => {
        cmd=cmd.replaceAll("<","&lt;").replaceAll(">","&gt;")
        switch(cmd.split(" ")[0]){
            case 'help':{
                let CommandOutput=[
                                "help   \t\tshow all the possible commands",
                                "whoami \t\tdisplay information about DevDori",
                                "cd     \t\tchange the working directory",
                                "ls     \t\tlist directory contents",
                                "pwd    \t\tPrint the name of the current working directory.",
                                "history\t\tDisplay or manipulate the history list.",
                                "clear  \t\tclear the terminal screen",
                                ].join("\n")

                execCommand(cmd,CommandOutput)
                return CommandOutput;
            }

            case 'whoami':{
                execCommand(cmd, user)
                return user;
            }

            case 'history': {
                let CommandOutput=getCommandHistory().concat("history").map((cmd,line)=>`${line+1}\t${cmd}`).join("\n")
                execCommand(cmd,CommandOutput)
                return CommandOutput;
            }

            case 'clear':{
                console.log(terminalCommandData.length)
                terminalCommandData[0]={type: "clear", value:terminalCommandData.length}
                execCommand(cmd)
                return;
            }

            case 'pwd': {
                execCommand(cmd,workDir)
                return workDir;
            }

            case 'cd':{
                execCommand(cmd,"")
                let path=getAbsolutePath(cmd.split(" ")[1]?cmd.split(" ")[1]:"./")
                let list=getListSegments(path)
                // list=list?list.children[path[path.length-1]].type==="Dir":false
                list&&list.type==="Dir"?
                    setWorkDir(path.join("/")?`/${path.join("/")}`:"/")
                    :
                    list&&list.type!=="Dir"?
                    execCommand(cmd,`bash: cd: ${`/${path.join("/")}`}: Not a directory`)
                    :
                    execCommand(cmd,`bash: cd: ${path.join("/")?`/${path.join("/")}`:"/"}: No such file or directory`)
                return;               
            }

            case 'll':
            case 'ls':{
                let option=cmd.split(" ")[1]&&cmd.split(" ")[1][0]==="-"?cmd.split(" ")[1]:false
                console.log(option)
                let path=getAbsolutePath(
                    cmd.split(" ")[1]&&option?
                        cmd.split(" ")[2]!==undefined?
                            cmd.split(" ")[2]
                            :
                            "./"
                        :
                        cmd.split(" ")[1]?
                            cmd.split(" ")[1]    
                            :
                            "./"
                )

                let list=getListSegments(path)
                let CommandOutput=list?
                    list.key.map(x=>`<span class="terminal-output-ls ${list.children[x].type}">${x}</span>`).join("")
                    :
                    `bash: ls: cannot access '${path.join("/")?`/${path.join("/")}`:"/"}': No such file or directory`
                execCommand(cmd,CommandOutput)
                break;
            }
          
            // case 'rm':{
            //     let path=getAbsolutePath(cmd.split(" ")[1]?cmd.split(" ")[1]:"./")
            //     let list=getListSegments(path)

            //     console.log(path,list,FileSystem&&!list)
            //     break
            // }

            case 'exit':{
                Update({ closing: true })
                navigate("/")
                return;
            }

            default:{
                execCommand(cmd,cmd&&"-bash: "+cmd+": command not found")
                return cmd&&"-bash: "+cmd+": command not found";
            }
        }

    }
    // return(<ComingSoon Update={Update} app={app}/>)
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
            </div>
        )}
    />);
}

export default Terminal;