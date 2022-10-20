function App(WindowComponent){ 
    const app = new WindowComponent();
    this.Icon = app.Icon;
    this.zindex = 1;
    this.opened = false;
}

export default App;