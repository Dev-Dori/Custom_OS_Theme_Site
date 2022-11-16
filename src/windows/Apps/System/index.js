import { Window } from 'components';
import { ComingSoon } from 'windows';
import './style.scss'
import logo from './images/logo/devdori.jpg';
import "bootstrap/dist/css/bootstrap.min.css";

function System(props){
    const { Update, app } = props;
    // return(<ComingSoon Update={Update} app={app}/>)
    // https://nickreyno.com/#contact
    return(
        <Window 
        Update = {Update}
        zIndex = {app.zIndex}
        app={app}
        Contents={(
            <div className='Profile'>
                <iframe src="https://treyhuffine.com/"></iframe>
            </div>
        )}
    />);
}

export default System;
