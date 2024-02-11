import { Window } from 'components';
import { ComingSoon } from 'windows';

function Project(props){
    const { Update, app } = props;
    let WindowSize = {WindowHeight:450, WindowWidth:700};
    return(<ComingSoon Update={Update} app={app}/>)

    return(
        <Window 
        Update = {Update}
        zIndex = {app.zIndex}
        WindowSize = {WindowSize}
        app={app}
        Contents={(<div>Project</div>)}
    />);
}

export default Project;
