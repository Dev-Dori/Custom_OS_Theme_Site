import { Dir } from 'beans';
import { App, SymlinkFile, LinkFile } from 'beans';
import { Terminal, FileExplorer, System, Github, Browser, Project } from 'windows';

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
        // new App(component, TaskbarPin)
        const termianl = new App(Terminal,true);
        const fileExplorer = new App(FileExplorer,true);
        const system = new App(System);
        const github = new App(Github,true);
        const browser = new App(Browser,true);
        const project = new App(Project,true);

        this.rootDir = new Dir({
            users: new Dir({
                DevDori: new Dir({
                    apps: new Dir({
                        // System : system,
                        Brower: browser,
                        Terminal : termianl, // new App('Terminal')
                        FileExplorer : fileExplorer,
                        Projects : project,
                    }),
                    Desktop: new Dir({
                        // System: new SymlinkFile('System',system.Icon), // Desktop Icon
                        System: new LinkFile('https://devdori.notion.site/Profile-b65bbb4fbb41417ab3c616dd84c43a28',system.Icon), // Desktop Icon
                        Files: fileExplorer,
                        // Projects: project, 
                        Terminal: termianl,
                        Blog: browser, 
                        Github: new LinkFile('https://github.com/Dev-Dori',github.Icon), // Github Icon
                    })
                })
            })
        })

        return this.rootDir;
    }

}


export default RootDir;