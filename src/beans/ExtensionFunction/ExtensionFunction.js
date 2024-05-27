import { none } from 'images';

class ExtensionFunction{
    constructor(){
        this.icon = none;
    }

    GetUserDir(user="DevDori"){
        return this.getChild('users',user);
    }

    GetDesktopDir(){
        const UserDir = this.GetUserDir();
        return UserDir?UserDir.getChild('Desktop'):undefined;
    }

    GetAppsDir(){
        const UserDir = this.GetUserDir();
        return UserDir?UserDir.getChild('Applications'):undefined;
    }

    GetApps(){
        const AppsDir = this.GetAppsDir();
        return AppsDir?AppsDir.children:undefined;
    }

    GetDesktop(){
        const DesktopDir = this.GetDesktopDir();
        return DesktopDir?DesktopDir.children:undefined;
    }

    GetName(){
        if(!this.parent) return ""
        return Object.keys(this.parent.children).find(key => this.parent.children[key]===this)
    }

    GetWorkDir(App=this, Path=[]){
        const Parent=App.parent
        if(!Parent) return Path
        const Appkey = Object.keys(Parent.children).find(key => Parent.children[key]===App)
        Path.unshift(Appkey)
        return App.GetWorkDir(Parent,Path)
    }

    Search(Keyword, App=this, Path={}){
        if(App.GetName().includes(Keyword)) Path[App.GetName()]=App
        typeof(App.key)==="object" && App.key.map(key=>{
            Path=App.Search(Keyword,App.children[key], Path)
        })
        return Path
    }

    remove() {
        if(this.parent===undefined) return(this.key=[],this.children={})
        const Appkey = Object.keys(this.parent.children).find(key => this.parent.children[key]===this)
        delete this.parent.children[Appkey]
        this.parent.key.splice(this.parent.key.indexOf(Appkey),1)
    }
}

export default ExtensionFunction;