import { Window } from 'components';
import './style.scss';

function Terminal(props){
    const { Update } = props;
    return(
        <Window 
            Update = {Update}
            ClassName='Window Terminal'
            Contents={(<div>This is Terminal</div>)}
        />
    );
}

export default Terminal;