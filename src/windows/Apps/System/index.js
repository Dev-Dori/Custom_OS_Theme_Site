import { Window } from 'components';
import { ComingSoon } from 'windows';
import './style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faGithub ,faDiscord } from '@fortawesome/free-brands-svg-icons';
// import logo from './images/logo/devdori.jpg';
import logo from './images/logo/11.jpg';




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
                <div className='Logo'>
                    <img src={logo}></img>
                </div>
                <div className='Intro'>
                    <div className='Greetings'>
                        <h1>Hi, I'm Dohyun <span className='hand'>🤚</span></h1>
                        <h2>I'm a Developer & Hacker</h2>
                    </div>
                    <div className='Introduce'>
                        <div className='InfoBox'>
                            <ul>    
                                <li><span>🎁</span> Called by DevDori</li>
                                <li><span>🌎</span> Based in the KR</li>
                                <li><span>💼</span> Systems Engineer at ShinhanBank</li>
                                <li><span>📧</span> trouna43@gmail.com</li>
                            </ul>
                        </div>
                        <div className='social'>
                            <a target='_blank' rel="noreferrer" href='https://www.facebook.com/profile.php?id=100009637328604'><FontAwesomeIcon icon={faFacebookF} className="Facebook"></FontAwesomeIcon></a>
                            <a target='_blank' rel="noreferrer" href='https://www.instagram.com/d0.___.hyun/'><FontAwesomeIcon icon={faInstagram} className="Instagram"></FontAwesomeIcon></a>
                            <a target='_blank' rel="noreferrer" href='https://github.com/Dev-Dori'><FontAwesomeIcon icon={faGithub} className="Github"></FontAwesomeIcon></a>
                            <a target='_blank' rel="noreferrer" href='https://discordapp.com/users/281306936744476672'><FontAwesomeIcon icon={faDiscord} className="Discord"></FontAwesomeIcon></a>
                        </div>
                    </div>
                </div>
            </div>
        )}
    />);
}

export default System;
