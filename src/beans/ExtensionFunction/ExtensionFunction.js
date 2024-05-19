
class ExtensionFunction{
    GetUserDir(user="DevDori"){
        return this.getChild('users',user);
    }

    GetDesktopDir(){
        const UserDir = this.GetUserDir();
        return UserDir?UserDir.getChild('Desktop'):undefined;
    }

    GetAppsDir(){
        const UserDir = this.GetUserDir();
        return UserDir?UserDir.getChild('apps'):undefined;
    }

    GetApps(){
        const AppsDir = this.GetAppsDir();
        return AppsDir?AppsDir.children:undefined;
    }

    GetDesktop(){
        const DesktopDir = this.GetDesktopDir();
        return DesktopDir?DesktopDir.children:undefined;
    }

    remove() {
        if(this.parent===undefined) return(this.key=[],this.children={})
        const Appkey = Object.keys(this.parent.children).find(key => this.parent.children[key]===this)
        delete this.parent.children[Appkey]
        this.parent.key.splice(this.parent.key.indexOf(Appkey),1)
    }
}

export default ExtensionFunction;