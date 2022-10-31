import { Window } from 'components';

function Project(props){
    const { Update } = props;
    return(
        <Window 
        Update = {Update}
        ClassName='Window Terminal'
        Contents={(<div>Project</div>)}
    />);
}

export default Project;
