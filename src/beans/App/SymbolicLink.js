import { ExtensionFunction } from 'beans';

class SymbolicLink extends ExtensionFunction{
    constructor(app,link){
        super()
        this.type="SymbolicLink"
        this.name = link
        this.icon = app.icon
    }
}

export default SymbolicLink;