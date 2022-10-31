import { Window } from 'components';
import './style.scss';

function Terminal(){
    return(
        <Window 
            ClassName='Window Terminal'
            Contents={(<div>This is Terminal</div>)}
        />
    );
}

export default Terminal;