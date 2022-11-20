import { Window } from 'components';
import { ComingSoon } from 'windows';
import './style.scss'
function Browser(props){
    const { Update, app } = props;
    // return(<ComingSoon Update={Update} app={app}/>)
    return(
        <Window 
        Update = {Update}
        app = {app}
        ClassName='Window Browser'
        Contents={(
            <div className='Browser'>
                {/* <iframe src="https://www.google.com/?igu=1"></iframe> */}
                <iframe src="https://reactportfoliotemplate.paytonpierce.dev/"></iframe>
            </div>
        )}
    />);
}

export default Browser;