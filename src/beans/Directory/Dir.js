class Dir {
    constructor(children) {
        this.children = Object.keys(children).map(key => {
            const child = children[key];
            child.key = key;
            child.parent = this;
            return child;
        });
    }
}

export default Dir;