import { LinkFile } from 'beans';
import { Dir } from 'beans';
import { App, SymlinkFile } from 'beans';

class RootDir {
    constructor(){
        console.log("RootDir 실행됨");
    }
    static get instance(){
        this.rootDir = new Dir({
            users: new Dir({
                DevDori: new Dir({
                    apps: new Dir({
                        System : new App('System'),
                        FileExplorer : new App('FileExplorer'),
                        Terminal : new App('Terminal'),
                        Projects : new App('Projects'),
                    }),
                    desktop: new Dir({
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