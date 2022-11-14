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
            <div class="bgimg">
                <div class="topleft">
                    <p>Logo</p>
                </div>
                <div class="middle">
                    <h1>COMING SOON</h1>
                    <p>35 days left</p>
                </div>
                <div class="bottomleft">
                    <p>Some text</p>
                </div>
            </div>
        )}
    />);
}

export default ComingSoon;