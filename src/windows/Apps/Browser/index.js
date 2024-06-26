import { Window } from 'components';
import { Arrow, Refresh, Close } from './NavigationIcons'
import { useSearchParams, useNavigate } from 'react-router-dom'
import './style.scss'
import { useEffect, useMemo, useState } from 'react';

function Browser(props){
    const {Update, app} = props;
    const [serchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const [focusUrl, setFocusUrl] = useState(serchParams.get("url") ? serchParams.get("url") : "https://www.google.com/webhp?igu=1")
    const [tabList, setTabList] = useState({})
    let WindowSize = {WindowHeight:450, WindowWidth:700};

    useMemo(()=>{
        window.history.pushState(null, null, "browser");
        const tmpurl = serchParams.get("url")
        if(tmpurl && tmpurl!==focusUrl) setFocusUrl(tmpurl);
        if(!tabList[tmpurl?tmpurl:focusUrl]) setTabList({...tabList, [tmpurl?tmpurl:focusUrl]:{title:"test",num:1}})

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
                            <div className={`Tab ${key===focusUrl && "Focused"}`} 
                                 onClick={()=>setFocusUrl(key)}>
                                <div className='Tab-Info'>
                                    <div className='Tab-Title'>{key.replace("https://","").replace("http://","").split("/")[0]}</div>
                                    <span onClick={(e)=>{
                                            const tmpTabList={...tabList}
                                            delete tmpTabList[key]
                                            setTabList(tmpTabList)
                                            setFocusUrl(Object.keys(tmpTabList).at(-1))
                                            e.stopPropagation()
                                        }
                                    }><Close/></span>
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
                    <Arrow direction="left" />
                    <Arrow direction="right" />
                    <Refresh />
                </div>

                <div className='Browser-AddressBar'>
                    <input type="text" value={focusUrl} spellCheck="false" onChange={()=>false}/>                    
                </div>
                <a className='NewTab' href={focusUrl} target="_blank">
                    Open in a new tab
                </a>
            </div>

            <div className='Browser'>
                {
                    Object.keys(tabList).map(url=>{
                        return(<iframe src={url} key={url} style={{display:url===focusUrl?"":"none"}}/>)
                    })
                }
            </div>
            </>
        )}
    />);
}

export default Browser;
