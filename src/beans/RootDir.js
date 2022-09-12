import { LinkFile } from 'beans';

class RootDir {
    static get instance(){
        this.RootDir = {
            users:{
                DevDori:{
                    apps:{
                        github: new LinkFile('https://github.com/Dev-Dori'),
                    },
                    desktop:{
                        
                    }
                }
            }
        }

        return this.rootDir;
    }
}

export default RootDir;