let count = 1;


function App(WindowComponent){ 
    
    this.WindowComponent = WindowComponent;
    this.zIndex = 1;
    this.opened = false;
    this.focused = false;
    this.closing = false;
    
    this.defaultLeft = count*20//Math.floor(100+Math.random() * 800);
    this.defaultTop = count*20//Math.floor(80+Math.random() * 500);
    count++;
}

export default App;