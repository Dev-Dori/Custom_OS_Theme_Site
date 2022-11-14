import { Window } from 'components';
import { ComingSoon } from 'windows';

function FileExplorer(props){
    const { Update, app } = props;
    return(<ComingSoon Update={Update} app={app}/>)
    return(
        <Window 
        Update = {Update}
        app = {app}
        ClassName='Window FileExplorer'
        Contents={(<div>FileExplorer</div>)}
    />);

}

export default FileExplorer;