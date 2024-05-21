import { Dir, SystemDir } from 'beans';
import { App, LinkFile, SymbolicLink } from 'beans'; //SymlinkFile
import { Terminal, FileManager, System, Browser, Project } from 'windows';
import * as IconMap from 'images';

class RootDir{    
    static get instance(){
        if (this.rootDir) return this.rootDir; // rootDir 초기화 방지
           
        const Apps = {
                        system:new App(System,{PinTaskbar:false, icon:IconMap.system, SymbolicLink:{use:true, name: "System"}, WindowSize:{width:700, height:500}}),
                        FileManager:new App(FileManager,{PinTaskbar:true, icon:IconMap.FileManager, SymbolicLink:{use:true, name: "Files"}}),
                        terminal:new App(Terminal,{PinTaskbar:true, icon:IconMap.termianl, SymbolicLink:{use:true, name: "Terminal"}}),
                        browser:new App(Browser,{PinTaskbar:true, icon:IconMap.browser, SymbolicLink:{use:true, name: "Blog"}}),
                        projects:new App(Project,{PinTaskbar:true, icon:IconMap.project, SymbolicLink:{use:false}}),
                    }

        const Desktop = {
                        // APP에 심볼링크 사용으로 생성한 객체는 자동으로 로드됨.
                        Github: new LinkFile('https://github.com/Dev-Dori',IconMap.github), // Github Icon
                    }

        this.rootDir = new SystemDir({
            users: new SystemDir({
                DevDori: new SystemDir({
                    Applications: new Dir(Apps),
                    Desktop: new Dir(Object.assign({}, ...Object.keys(Apps).map(app=>{
                                if(Apps[app].SymbolicLink.use)
                                    return {[Apps[app].SymbolicLink.name]:new SymbolicLink(Apps[app],app)}
                                return false
                                }).filter(element => element)
                            , Desktop)),

                    Downloads: new Dir(),
                    Documents: new Dir(),
                    Music: new Dir(),
                    Trash: new SystemDir()
                }),

            })
        })

        return this.rootDir;
    }

    

}


export default RootDir;