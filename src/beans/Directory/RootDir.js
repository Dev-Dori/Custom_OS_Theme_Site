import { Dir } from 'beans';
import { App, LinkFile } from 'beans'; //SymlinkFile
import { Terminal, FileExplorer, System, Github, Browser, Project } from 'windows';
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

        const termianl = new App("Terminal",Terminal,true,IconMap.termianl);
        const fileExplorer = new App("FileExplorer",FileExplorer,true,IconMap.fileExplorer);
        const system = new App("System",System,false,IconMap.system);
        const browser = new App("Browser",Browser,true,IconMap.browser);
        const projects = new App("Project",Project,true,IconMap.project);


        this.rootDir = new Dir({
            users: new Dir({
                DevDori: new Dir({
                    apps: new Dir({
                        System : system,
                        Browser: browser,
                        Terminal : termianl, // new App('Terminal')
                        FileExplorer : fileExplorer,
                        Project : projects,
                    }),
                    Desktop: new Dir({
                        System: system,
                        // System: new LinkFile('https://devdori.notion.site/Profile-b65bbb4fbb41417ab3c616dd84c43a28',system.Icon), // Desktop Icon
                        Files: fileExplorer,
                        // Projects: projects, 
                        Terminal: termianl,
                        Blog: browser, 
                        Github: new LinkFile('https://github.com/Dev-Dori',IconMap.github), // Github Icon
                    })
                })
            })
        })


        // console.log(test3, this.rootDir)

        return this.rootDir;
    }

}


export default RootDir;