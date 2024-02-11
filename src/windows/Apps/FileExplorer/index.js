import { Window } from 'components';
import { ComingSoon } from 'windows';

function FileExplorer(props){
    const { Update, app } = props;
    let WindowSize = {WindowHeight:450, WindowWidth:700};
    return(<ComingSoon Update={Update} app={app}/>)
    return(
        <Window 
        Update = {Update}
        app = {app}
        WindowSize = {WindowSize}
        ClassName='Window FileExplorer'
        Contents={(<div>FileExplorer</div>)}
    />);

}

export default FileExplorer;