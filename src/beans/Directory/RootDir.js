import { Dir, SystemDir } from 'beans';
import { App, LinkFile, SymbolicLink } from 'beans'; //SymlinkFile
import { Terminal, FileExplorer, System, Browser, Project } from 'windows';
import * as IconMap from 'images';

class RootDir{    
    static get instance(){
        if (this.rootDir) return this.rootDir;
           
        const Apps = {
                        system:new App(System,false,IconMap.system,{use: true, name: "System"}),
                        fileExplorer:new App(FileExplorer,true,IconMap.fileExplorer, {use: true, name: "Files"}),
                        termianl:new App(Terminal,true,IconMap.termianl, {use: true, name: "Terminal"}),
                        browser:new App(Browser,true,IconMap.browser, {use: true, name: "Blog"}),
                        projects:new App(Project,true,IconMap.project, {use: false})
                    }

        const Desktop = {
                        // APP에 심볼링크 사용으로 생성한 객체는 자동으로 로드됨.
                        Github: new LinkFile('https://github.com/Dev-Dori',IconMap.github), // Github Icon
                    }

        this.rootDir = new SystemDir({
            users: new SystemDir({
                DevDori: new SystemDir({
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