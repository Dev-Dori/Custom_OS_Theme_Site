import { ExtensionFunction } from 'beans';

class LinkFile extends ExtensionFunction{
    constructor(href, Icon) {
        super()
        this.type = "LinkFile"
        this.href = href;
        this.icon = Icon;
    }
}

export default LinkFile;