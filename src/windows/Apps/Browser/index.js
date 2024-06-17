import { Window } from 'components';
import { ComingSoon } from 'windows';
import { Arrow, Refresh } from './NavigationIcons'
import './style.scss'

function Browser(props){
    const { Update, app} = props;
    let WindowSize = {WindowHeight:450, WindowWidth:700};
    // return(<ComingSoon Update={Update} app={app}/>)

    return(
        <Window 
        Update = {Update}
        app = {app}
        WindowSize = {WindowSize}
        ClassName='Window Browser'
        Toolbar={(
            <>
            <div className="Browser-Tab-Container">
                <div className='Browser-Title'>
                    Blog
                </div>
            </div>
            <div className="Browser-ToolBar-Container">
                <div className='Browser-Button-Container'>
                    <Arrow direction="left" />
                    <Arrow direction="right" />
                    <Refresh />
                </div>

                <div className='Browser-Search-Container'>
                    <input type="text" value="https://blog.devdori.com/" spellcheck="false" />
                </div>
            </div>
            </>
        )}
        Contents={(
            <div className='Browser'>
                {/* <iframe src="https://www.google.com/?igu=1"></iframe> */}
                {/* <iframe src="https://www.notion.so/devdori/Profile-b65bbb4fbb41417ab3c616dd84c43a28?pvs=4"></iframe> */}
                <iframe src="https://blog.devdori.com/"></iframe>
            </div>
        )}
    />);
}

export default Browser;
