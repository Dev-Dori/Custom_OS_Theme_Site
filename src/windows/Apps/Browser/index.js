import { Window } from 'components';
import { ComingSoon } from 'windows';
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
