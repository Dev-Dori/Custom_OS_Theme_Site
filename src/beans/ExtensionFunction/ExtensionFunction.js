
class ExtensionFunction{
    remove() {
        const Dirkey = Object.keys(this.parent.parent.children).find(key => this.parent.parent.children[key]===this.parent)
        const Appkey = Object.keys(this.parent.children).find(key => this.parent.children[key]===this)
        this.parent.parent.children[Dirkey] = this.parent
        delete this.parent.children[Appkey]
        this.parent.key.splice(this.parent.key.indexOf(Appkey),1)
    }
}

export default ExtensionFunction;