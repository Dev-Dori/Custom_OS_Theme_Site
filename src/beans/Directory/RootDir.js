import { Dir } from 'beans';
import { App, SymlinkFile, LinkFile } from 'beans';

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

        this.rootDir = new Dir({
            users: new Dir({
                DevDori: new Dir({
                    apps: new Dir({
                        System : new App('System'),
                        FileExplorer : new App('FileExplorer'),
                        Terminal : new App('Terminal'),
                        Projects : new App('Projects'),
                    }),
                    Desktop: new Dir({
                        System: new SymlinkFile('System'), // Desktop Icon
                        Files: new SymlinkFile('FileExplorer'), //  File explorer Icon
                        Projects: new LinkFile('Projects'), // Documents Icon
                        Blog: new SymlinkFile('Browser','url=blog'), // Browser Icon or Edge Icon
                        Terminal: new SymlinkFile('Terminal'), // Terminal Icon
                        Github: new LinkFile('https://github.com/Dev-Dori'), // Github Icon
                    })
                })
            })
        })

        return this.rootDir;
    }

}


export default RootDir;