import { Window } from 'components';
import { ComingSoon } from 'windows';

function Terminal(props){
    const { Update, app } = props;
    return(<ComingSoon Update={Update} app={app}/>)

    return(
        <Window 
        Update = {Update}
        app = {app}
        ClassName='Window Terminal'
        Contents={(<div>Terminal</div>)}
    />);

}

export default Terminal;