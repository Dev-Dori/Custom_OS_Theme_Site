import { Window } from 'components';
import { Arrow, Refresh, Close } from './NavigationIcons'
import './style.scss'

function Browser(props, url_path){
    const {Update, app} = props;
    let WindowSize = {WindowHeight:450, WindowWidth:700};

    // const url=url_path.length?url_path:"https://www.google.com/webhp?igu=1";
    const url=url_path.length?url_path:"https://blog.devdori.com/";
    // const url=url_path.length?url_path:"https://github.com/dev-dori";
    
    return(
        <Window 
        Update = {Update}
        app = {app}
        WindowSize = {WindowSize}
        ClassName='Window Browser'
        Toolbar={(
            <div className="Browser-Tab-Container">
                <div className='Tab Focused'>
                    <div className='Tab-Info'>
                        <div className='Tab-Title'>Blog</div>
                        <Close/>
                    </div>
                </div>
                <div className='Tab'>
                    <div className='Tab-Info'>
                        <div className='Tab-Title'>TestTab google</div>
                        <Close/>
                    </div>
                </div>
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
                    <input type="text" value={url} spellCheck="false" />                    
                </div>
                <a className='NewTab' href={url} target="_blank">
                    Open in a new tab
                </a>
            </div>

            <div className='Browser'>
                {/* <iframe src="https://www.google.com/?igu=1"></iframe> */}
                {/* <iframe src="https://www.notion.so/devdori/Profile-b65bbb4fbb41417ab3c616dd84c43a28?pvs=4"></iframe> */}
                <iframe src={url}></iframe>
            </div>
            </>
        )}
    />);
}

export default Browser;
