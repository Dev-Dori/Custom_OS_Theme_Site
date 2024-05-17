import { none } from 'images';

let count = 1;

class App {
    constructor(name, WindowComponent,PinTaskbar, icon) {
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

    remove(){
        const key = Object.keys(this.parent.parent.children).find(key => this.parent.parent.children[key]===this.parent)
        this.parent.parent.children[key] = this.parent
        delete this.parent.children[this.name]
        this.parent.key.splice(this.parent.key.indexOf(this.name),1)
    }
}

export default App;