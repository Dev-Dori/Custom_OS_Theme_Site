import { Window } from 'components';

function Project(props){
    const { Update, app } = props;
    return(
        <Window 
        Update = {Update}
        zIndex = {app.zIndex}
        app={app}
        Contents={(<div>Project</div>)}
    />);
}

export default Project;
