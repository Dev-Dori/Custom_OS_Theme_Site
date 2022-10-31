import { Window } from 'components';
import './style.scss';

function Terminal(props){
    const { Update, app } = props;
    return(
        <Window 
            Update = {Update}
            zIndex = {app.zIndex}
            app={app}
            Contents={(<div>This is Terminal</div>)}
        />
    );
}

export default Terminal;