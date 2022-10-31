function App(WindowComponent){ 
    this.WindowComponent = WindowComponent;
    this.zIndex = 1;
    this.opened = false;
    this.focused = false;
    this.closing = false;
    this.defaultLeft = Math.floor(100+Math.random() * 800);
    this.defaultTop = Math.floor(80+Math.random() * 500);
    // this.WindowComponent = WindowComponent;
}

export default App;