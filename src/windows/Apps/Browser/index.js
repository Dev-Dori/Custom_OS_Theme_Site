import { Window } from 'components';
import { ComingSoon } from 'windows';

function Browser(props){
    const { Update, app } = props;
    return(<ComingSoon Update={Update} app={app}/>)
    // return(
    //     <Window 
    //     Update = {Update}
    //     app = {app}
    //     ClassName='Window Browser'
    //     Contents={(<div>Browser</div>)}
    // />);
}

export default Browser;