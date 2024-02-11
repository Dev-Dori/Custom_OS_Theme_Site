let count = 1;


function App(WindowComponent,PinTaskbar){ 
    const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min);
    this.WindowComponent = WindowComponent;
    this.zIndex = 1;
    this.opened = false;
    this.focused = false;
    this.closing = false;
    this.PinTaskbar = PinTaskbar?true:false;
    this.WindowHeight = 750;
    this.WindowWidth = 450;
    count++;
}

export default App;