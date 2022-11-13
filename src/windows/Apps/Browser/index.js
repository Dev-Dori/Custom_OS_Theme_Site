import { Window } from 'components';

function Browser(props){
    const { Update, app } = props;
    return(
        <Window 
        Update = {Update}
        app = {app}
        ClassName='Window Browser'
        Contents={(<div>Browser</div>)}
    />);
}

export default Browser;