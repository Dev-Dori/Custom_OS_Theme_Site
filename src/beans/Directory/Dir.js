import { RootDir } from 'beans';

class Dir extends RootDir{
    constructor(children) {
        super(null);
        this.type="Dir"
        this.key = Object.keys(children)
        this.children = Object.assign({}, ...Object.keys(children).map(key => {
            const child = children[key];
            child.parent = this;
            return {[key]:child};
        }))
    }
    getChild(...pathKeys) {
        let dir = this;
        for (const dirKey of pathKeys) {
            if (!(dir instanceof Dir)) return undefined;
            dir = dir.children[dirKey];
        }
        return dir;
    };

    remove() {
        console.log("RM : ",this)
        const Dirkey = Object.keys(this.parent.parent.children).find(key => this.parent.parent.children[key]===this.parent)
        const Appkey = Object.keys(this.parent.children).find(key => this.parent.children[key]===this)
        this.parent.parent.children[Dirkey] = this.parent
        delete this.parent.children[Appkey]
        this.parent.key.splice(this.parent.key.indexOf(Appkey),1)
    }
}

export default Dir;