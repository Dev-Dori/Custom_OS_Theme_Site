import { Window } from 'components';
import { Arrow, Refresh, Close } from './NavigationIcons'
import { useSearchParams, useNavigate } from 'react-router-dom'
import './style.scss'
import { useEffect, useMemo, useState } from 'react';

function Browser(props){
    const {Update, app} = props;
    const [serchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [focusTabNum, setFocusTabNum] = useState(0)
    const [inputUrl, setInputUrl] = useState(serchParams.get("url") ? serchParams.get("url") : "https://www.google.com/webhp?igu=1")
    const [tabList, setTabList] = useState({})
    let WindowSize = {WindowHeight:450, WindowWidth:700};

    useMemo(()=>{
        window.history.pushState(null, null, "browser");
        const GetUrl = serchParams.get("url")
        if(GetUrl){
            setFocusTabNum(Object.keys(tabList).length);
            if(!(Object.keys(tabList).map(key=>tabList[key].url).includes(GetUrl)))
                setTabList({...tabList, [Object.keys(tabList).length]:{title:"test",url:GetUrl,history:[GetUrl], historyNum:0}})
            else 
                setFocusTabNum(Object.keys(tabList).map(key=>tabList[key].url).indexOf(GetUrl))
            
        }else{
            if(!Object.keys(tabList).length) setTabList({0:{title:"Google", url:"https://www.google.com/webhp?igu=1", history:["https://www.google.com/webhp?igu=1"],  historyNum:0}})
        }
    },[serchParams])

    useEffect(()=>{
        if(Object.keys(tabList).length===0){
            Update({ closing: true })
            navigate("/")
        }
    },[tabList])
    return(
        <Window 
        Update = {Update}
        app = {app}
        WindowSize = {WindowSize}
        ClassName='Window Browser'
        Toolbar={(
            <div className="Browser-Tab-Container">
                {
                    Object.keys(tabList).map(key=>{
                        return(
                            <div className={`Tab ${key==focusTabNum && "Focused"} ${key==focusTabNum-1 && "Focused-Left"}`} key={"Tab-"+key} 
                                 onClick={()=>{
                                    setFocusTabNum(key)
                                    setInputUrl(tabList[key].url)
                                 }}>
                                <div className='Tab-Info'>
                                    <div className='Tab-Title'>{tabList[key].url.replace("https://","").replace("http://","").split("/")[0]}</div>
                                    <Close onClick={(e)=>{
                                            const tmpTabList={...tabList}
                                            delete tmpTabList[key]
                                            setTabList(tmpTabList)
                                            setFocusTabNum(Object.keys(tmpTabList).at(-1))
                                            e.stopPropagation()
                                        }
                                    }/>
                                </div>
                            </div> 
                        )
                    })
                }
            </div>
        )}
        Contents={(
            <>
            <div className="Browser-ToolBar-Container">
                <div className='Browser-Button-Container'>
                    <Arrow direction="left" className={tabList[focusTabNum] && tabList[focusTabNum].historyNum==0?"svg_disable":undefined} onClick={()=>{
                        if(tabList[focusTabNum].historyNum-1>=0){
                            tabList[focusTabNum].historyNum -= 1
                            window.document.getElementById("Browser-Focused-Page").src
                                = tabList[focusTabNum].history[tabList[focusTabNum].historyNum]
                            setInputUrl(window.document.getElementById("Browser-Focused-Page").src)
                        }
                    }}/>
                    <Arrow direction="right" className={tabList[focusTabNum] && tabList[focusTabNum].historyNum==tabList[focusTabNum].history.length-1?"svg_disable":undefined} onClick={()=>{
                        if(tabList[focusTabNum].historyNum+1<tabList[focusTabNum].history.length){
                            tabList[focusTabNum].historyNum += 1
                            window.document.getElementById("Browser-Focused-Page").src
                                =tabList[focusTabNum].history[tabList[focusTabNum].historyNum]
                            setInputUrl(window.document.getElementById("Browser-Focused-Page").src)
                        }
                    }}/>
                    <Refresh onClick={()=>window.document.getElementById("Browser-Focused-Page").src+=""}/>
                </div>

                <div className='Browser-AddressBar'>
                    <input type="text" value={inputUrl} spellCheck="false" 
                           onChange={(e)=>{
                                let { value } = { ...e.target }
                                setInputUrl(value)
                           }}
                           onKeyUp={(e)=>{
                                const CheckDomain = (url) => {
                                    if(url.startsWith("http://") || url.startsWith("https://")) return true;
                                    else if(["com","net","org","kr","edu","gov","mil","kr"].some(c=>url.endsWith(`.${c}`))) return true;
                                }
                                if(e.target.value && e.key==="Enter"){
                                    const tmptabList = {...tabList}
                                    if(CheckDomain(e.target.value)){
                                        if(e.target.value.startsWith("https://") || e.target.value.startsWith("http"))
                                            tmptabList[focusTabNum].url=e.target.value
                                        else
                                            tmptabList[focusTabNum].url=`https://${e.target.value}`
                                    }else{
                                        tmptabList[focusTabNum].url=`https://www.google.com/search?igu=1&q=${e.target.value}`
                                    }
                                    if(tmptabList[focusTabNum].historyNum<tmptabList[focusTabNum].history.length-1){
                                        tmptabList[focusTabNum].history=tmptabList[focusTabNum].history.slice(0,tmptabList[focusTabNum].historyNum+1)
                                    }

                                    tmptabList[focusTabNum].history.push(tmptabList[focusTabNum].url)
                                    tmptabList[focusTabNum].historyNum=tmptabList[focusTabNum].history.length-1
                                    setInputUrl(tmptabList[focusTabNum].url)
                                    setTabList(tmptabList)
                                }
                           }}
                           />                    
                </div>
                <a className='NewTab' href={tabList[focusTabNum]&&tabList[focusTabNum].url} target="_blank">
                    Open in a new tab
                </a>
            </div>

            <div className='Browser'>
                {
                    Object.keys(tabList).map(key=>{
                        return(<iframe src={tabList[key].url} key={tabList[key].url} 
                                        id={key==focusTabNum?"Browser-Focused-Page":""} 
                                        style={{display:key==focusTabNum?"":"none" }}
                                />) 
                    })
                }
            </div>
            </>
        )}
    />);
}

export default Browser;
