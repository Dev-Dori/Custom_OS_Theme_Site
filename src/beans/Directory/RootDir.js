import { Dir } from 'beans';
import { App, LinkFile, SymbolicLink } from 'beans'; //SymlinkFile
import { Terminal, FileExplorer, System, Browser, Project } from 'windows';
import * as IconMap from 'images';

class RootDir{    
    GetUserDir(user="DevDori"){
        return this.getChild('users',user);
    }

    GetDesktopDir(){
        const UserDir = this.GetUserDir();
        return UserDir.getChild('Desktop');
    }

    GetAppsDir(){
        const UserDir = this.GetUserDir();
        return UserDir.getChild('apps');
    }

    GetApps(){
        const AppsDir = this.GetAppsDir();
        return AppsDir.children;
    }

    GetDesktop(){
        const DesktopDir = this.GetDesktopDir();
        return DesktopDir.children;
    }

    static get instance(){
        if (this.rootDir){
            return this.rootDir;
        }
        
        const Apps = {
                        system:new App(System,false,IconMap.system,{use: true, name: "System"}),
                        termianl:new App(Terminal,true,IconMap.termianl, {use: true, name: "Terminal"}),
                        fileExplorer:new App(FileExplorer,true,IconMap.fileExplorer, {use: true, name: "Files"}),
                        browser:new App(Browser,true,IconMap.browser, {use: true, name: "Blog"}),
                        projects:new App(Project,true,IconMap.project, {use: false})
                    }

        const Desktop = {
                        // APP에 심볼링크 사용으로 등록한 객체는 자동으로 로드됨.
                        Github: new LinkFile('https://github.com/Dev-Dori',IconMap.github), // Github Icon
                    }

        this.rootDir = new Dir({
            users: new Dir({
                DevDori: new Dir({
                    apps: new Dir(Apps),
                    Desktop: new Dir(Object.assign({}, ...Object.keys(Apps).map(app=>{
                                if(Apps[app].SymbolicLink.use){
                                    return {[Apps[app].SymbolicLink.name]:new SymbolicLink(Apps[app],app)}
                                }
                                }).filter(element => element)
                            , Desktop))
                }),

            })
        })

        return this.rootDir;
    }

    

}


export default RootDir;