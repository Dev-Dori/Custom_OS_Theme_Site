import { RootDir } from 'beans';

class Dir extends RootDir{
    constructor(children) {
        super(null);
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
}

export default Dir;