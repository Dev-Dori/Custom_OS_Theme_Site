import { Window } from 'components';
import { ComingSoon } from 'windows';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import { none } from 'images';

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
        console.log('렌더링 발생')
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
        // console.log(event)
        if(event.ctrlKey&&event.key.length===1&&event.key.toUpperCase()==="C"){
            execCommand(`^${event.key.toUpperCase()}`)
        }else if(event.key&&event.key.length===1){
            setCommand(command.substring(0,cursorPosition)+event.key+command.substring(cursorPosition))
            setCursorPosition(cursorPosition+1)
            setCommandIndex([getCommandHistory().length,command.substring(0,cursorPosition)+event.key+command.substring(cursorPosition)])
        }else if(event.key==="Enter") {
            inputCommand(command)
            setCursorPosition(0)
            setCommandIndex([getCommandHistory().length+1,""])
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
            setCommand(commandhistory[cmdIndex])
            setCursorPosition(commandhistory[cmdIndex].length)
            setCommandIndex([cmdIndex,commandIndex[1]])
            
        }
    }

    const getCommandHistory=()=>{
        return terminalCommandData.filter((tmpCmdData)=>{
            return tmpCmdData.type==="input"&&tmpCmdData.value&&tmpCmdData.value[0]!=="^"
        }).map(tmpCmdData=>tmpCmdData.value)
    }
    
    const execCommand = (cmd, output) => {
        let cmdData=(cmd!==undefined)?[...terminalCommandData,{type:"input", value:cmd, workDir:workDir.replace(`/users/${user}`||`/users/${user}}/`,"~")}]:terminalCommandData
        if(output!==undefined) cmdData.push({type:"output", value:output})
        setTerminalCommandData(cmdData)
    }

    const inputCommand = (cmd) => {
        switch(cmd.split(" ")[0]){
            case 'help':{
                execCommand(cmd,[
                                "help   \t\tshow all the possible commands",
                                "whoami \t\tdisplay information about DevDori",
                                "history\t\tDisplay or manipulate the history list.",
                                "clear  \t\tclear the terminal screen",
                                "pwd    \t\tPrint the name of the current working directory.",
                                ].join("\n")
                            )
                break;
            }

            case 'whoami':{
                execCommand(cmd, user)
                break;
            }

            case 'history': {
                execCommand(cmd,getCommandHistory().concat("history").join("\n"))
                break;
            }

            case 'clear':{
                console.log(terminalCommandData.length)
                terminalCommandData[0]={type: "clear", value:terminalCommandData.length}
                execCommand(cmd)
                break;
            }

            case 'pwd': {
                execCommand(cmd,workDir)
                break;
            }

            case 'cd':{
                execCommand(cmd,"")

                let path=cmd.split(" ")[1]
                if(!path) return;

                if(path==="~") path=`/users/${user}`
                else if(path.substr(0,2)==="~/") path=`/users/${user}`+path.replace("~","")
                path=(path&&path[0]==="/"?path:`${workDir==="/"?"":workDir}/${path}`).split("/")
                path=path.filter(x=>x)

                //상위 디렉토리로 이동
                while(path.indexOf("..")!==-1) path.splice(path.indexOf("..")-1,2)

                let tmpdir = FileSystem, existsdir=true
                path&&path.forEach(EachDirName=>{
                    if((tmpdir&&tmpdir.getChild(EachDirName))||!EachDirName){
                        tmpdir=tmpdir.getChild(EachDirName)
                    }else{
                        execCommand(cmd,`bash: cd: ${path.join("/")?`/${path.join("/")}`:"/"}: No such file or directory`)
                        return existsdir=false;
                    }
                })
                existsdir&&path&&setWorkDir(path.join("/")?`/${path.join("/")}`:"/")
                break;               
            }

            case 'exit':{
                Update({ closing: true })
                navigate("/")
                break;
            }

            default:{
                execCommand(cmd,cmd&&"-bash: "+cmd+": command not found")
            }
        }

    }
    //https://jasonpark.me/#/
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
                                <div key={key}>{user}@W0R!D:{terminalCommandData[key].workDir}$ {terminalCommandData[key].value}</div>
                                :
                                terminalCommandData[key].type==="output"?
                                <div key={key}>{terminalCommandData[key].value}</div>
                                :
                                none
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