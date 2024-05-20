import { none } from 'images';
import { ExtensionFunction } from 'beans';

class App extends ExtensionFunction{
    //PinTaskbar, icon, SymbolicLink
    constructor(WindowComponent,setting) {
        super()
        this.type = "App"
        this.WindowComponent = WindowComponent;
        this.zIndex = 1;
        this.opened = false;
        this.focused = false;
        this.closing = false;
        this.minimized = false;
        this.maximized = false;

        this.PinTaskbar = setting.PinTaskbar||false;
        this.icon = setting.icon? setting.icon : none;
        this.SymbolicLink = setting.SymbolicLink;
        this.WindowHeight = setting.WindowSize?setting.WindowSize.height:400;
        this.WindowWidth = setting.WindowSize?setting.WindowSize.width:600;
    }
}

export default App;