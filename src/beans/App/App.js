import { none } from 'images';

let count = 1;

function App(name, WindowComponent,PinTaskbar, icon){ 
    const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);
    this.type = "App"
    this.name = name;
    this.WindowComponent = WindowComponent;
    this.zIndex = 1;
    this.opened = false;
    this.focused = false;
    this.closing = false;
    this.minimized = false;
    this.maximized = false;
    this.WindowHeight = 750;
    this.WindowWidth = 450;
    this.PinTaskbar = PinTaskbar||false;
    this.icon = icon? icon : none;
    count++;
}

export default App;