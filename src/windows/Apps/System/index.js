import { Window } from 'components';
import { ComingSoon } from 'windows';
import './style.scss'
import logo from './images/logo/devdori.jpg';

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
            <div className='About'>
                <aside>
                    <div className='Profile-Images'>
                        <img src={logo}></img>
                    </div>
                    <div className='Menu'>
                        <div>About Me</div>
                        <div>Awards</div>
                        <div>Skills</div>
                        <div>Contact</div>
                    </div>
                </aside>
                <main>
                    <div className='Profile-Name'>
                        DevDori
                    </div>
                </main>
            </div>
            
        )}
    />);
}

export default System;
