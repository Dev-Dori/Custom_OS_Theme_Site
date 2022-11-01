import { Window } from 'components';

function Terminal(props){
    const { Update, app } = props;
    return(
        <Window 
        Update = {Update}
        app = {app}
        ClassName='Window Terminal'
        Contents={(<div>Terminal</div>)}
    />);

}

export default Terminal;