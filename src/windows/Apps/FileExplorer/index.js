import { Window } from 'components';

function FileExplorer(props){
    const { Update } = props;
    return(
        <Window 
        Update = {Update}
        ClassName='Window Terminal'
        Contents={(<div>FileExplorer</div>)}
    />);

}

export default FileExplorer;