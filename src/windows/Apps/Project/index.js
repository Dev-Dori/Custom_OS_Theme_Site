import { Window } from 'components';
import { ComingSoon } from 'windows';

function Project(props){
    const { Update, app } = props;
    return(<ComingSoon Update={Update} app={app}/>)

    return(
        <Window 
        Update = {Update}
        zIndex = {app.zIndex}
        app={app}
        Contents={(<div>Project</div>)}
    />);
}

export default Project;
