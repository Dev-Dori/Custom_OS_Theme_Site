import { Window } from 'components';
import './style.scss'

function ComingSoon(props){
    const { Update, app } = props;
    return(
        <Window 
        Update = {Update}
        app = {app}
        ClassName={app.key}
        Contents={(
            <div className="bgimg">
                <div className="middle">
                    <h1>COMING SOON</h1>
                    <p>40 days left</p>
                </div>
            </div>
        )}
    />);
}

export default ComingSoon;