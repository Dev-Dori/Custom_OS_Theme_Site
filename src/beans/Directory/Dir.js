import { RootDir } from 'beans';

class Dir extends RootDir{
    constructor(children) {
        super(null);
        this.children = Object.keys(children).map(key => {
            const child = children[key];
            child.key = key;
            child.parent = this;
            return child;
        });
    }

    getChild(...pathKeys) {
        let dir = this;
        for (const dirKey of pathKeys) {
            if (!(dir instanceof Dir)) return undefined;
            dir = dir.children.find(c => c.key === dirKey);
        }
        return dir;
    };
}

export default Dir;