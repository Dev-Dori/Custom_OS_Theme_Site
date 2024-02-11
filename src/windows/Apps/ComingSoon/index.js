import { Window } from 'components';
import './style.scss'

function ComingSoon(props){
    const { Update, app } = props;
    let WindowSize = {WindowHeight:450, WindowWidth:700};
    return(
        <Window 
        Update = {Update}
        app = {app}
        ClassName={app.key}
        WindowSize = {WindowSize}
        Contents={(
            <div className="bgimg">
                <div className="middle">
                    <h1>COMING SOON</h1>
                    {/* <p>40 days left</p> */}
                    <p>May be</p>
                </div>
            </div>
        )}
    />);
}

export default ComingSoon;