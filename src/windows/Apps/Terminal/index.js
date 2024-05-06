import { Window } from 'components';
import { ComingSoon } from 'windows';
import { useState, useEffect, useRef} from 'react';
import './style.scss';

function Terminal(props){
    const { Update, app } = props;
    let WindowSize = {WindowHeight:450, WindowWidth:700};
    const scrollRef = useRef();
    const [command, setCommand] = useState("");
    const [terminalCommandData, setTerminalCommandData] = useState([
        { type: "output", value: "Welcome to the DevDori World !👋" },
        { type: "output", value: "Type \"help\" for all available commands."}
      ]);
    
    const CommandList = {
        "help":"help  \t\tshow all the possible commands\
              \nwhoami\t\tdisplay information about DevDori\
              \nclear \t\tclear the terminal screen\
              ",
        "whoami":"devdori"
    }

    
    useEffect(()=>{
        scrollToBottom();
        window.addEventListener("keydown",handleKeyDownEvent)
        return () => window.removeEventListener("keydown",handleKeyDownEvent);
    },[command,terminalCommandData])


    const scrollToBottom = () => {
        console.log(scrollRef.current.scrollTop )
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    };

    const handleKeyDownEvent = (event) => {
        if(!app.focused) return;
        if(event.key==="Enter") {
            execCommand(command)
            setCommand("")
        }else if(event.key&&event.key.length===1) setCommand(command+event.key)
        else if(event.key==="Backspace") setCommand(command.slice(0, -1))
    }
    
    const execCommand = (cmd) => {
        let cmdData = [
            ...terminalCommandData,
            {type:"input", value:cmd},
            {type:"output",value:CommandList[cmd]?CommandList[cmd]:cmd&&"-bash: "+cmd+": command not found"}
        ]
        if(cmd==="clear") cmdData=[]
        setTerminalCommandData(cmdData)
    }

    // return(<ComingSoon Update={Update} app={app}/>)
    return(
        <Window 
        Update = {Update}
        app = {app}
        WindowSize = {WindowSize}
        ClassName='Window Terminal'
        Contents={(
            <div className='Terminal-Body' ref={scrollRef}>
                {
                    // console.log(typeof(terminalCommandData))
                    Object.entries(terminalCommandData).map(([key]) => 
                        <div key={key}>{(terminalCommandData[key].type=="input"?"$ ":"")+terminalCommandData[key].value}</div>
                    )
                }
                <div className='terminal-input'><span>$ {command}</span>{app.focused&&<span className='cursor'/>}</div>
            </div>
        )}
    />);

}

export default Terminal;