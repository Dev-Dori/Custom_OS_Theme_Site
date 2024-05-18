import { none } from 'images';
import { ExtensionFunction } from 'beans';

class App extends ExtensionFunction{
    constructor(WindowComponent,PinTaskbar, icon, SymbolicLink) {
        super()
        this.type = "App"
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
        this.SymbolicLink = SymbolicLink;
    }
}

export default App;