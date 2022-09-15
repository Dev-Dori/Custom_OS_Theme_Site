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

        const termianl = new Terminal();
        const fileExplorer = new FileExplorer();
        const system = new System();
        const github = new Github();
        const browser = new Browser();
        const project = new Project();

        this.rootDir = new Dir({
            users: new Dir({
                DevDori: new Dir({
                    apps: new Dir({
                        System : system,
                        FileExplorer : fileExplorer,
                        Terminal : termianl, // new App('Terminal')
                        Projects : project,
                    }),
                    Desktop: new Dir({
                        System: new SymlinkFile('System',system.Icon), // Desktop Icon
                        Files: new SymlinkFile('FileExplorer', fileExplorer.Icon), //  File explorer Icon
                        Projects: new LinkFile('Projects', project.Icon), // Documents Icon
                        Terminal: new SymlinkFile('Terminal', termianl.Icon), // Terminal Icon
                        Blog: new SymlinkFile('Browser', browser.Icon, 'url=blog'), // Browser Icon or Edge Icon
                        Github: new LinkFile('https://github.com/Dev-Dori',github.Icon), // Github Icon
                    })
                })
            })
        })

        return this.rootDir;
    }

}


export default RootDir;