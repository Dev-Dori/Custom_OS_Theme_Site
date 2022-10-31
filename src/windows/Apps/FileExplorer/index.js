import { Window } from 'components';

function FileExplorer(props){
    const { Update, app } = props;
    return(
        <Window 
        Update = {Update}
        app = {app}
        ClassName='Window Terminal'
        Contents={(<div>FileExplorer</div>)}
    />);

}

export default FileExplorer;