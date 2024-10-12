
const cyrb53 = (str, seed = 0) => {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for(let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

class ShareBoardProject{
    constructor(pid,metadata){
        this.timestamp = metadata.timestamp;
        this.author = metadata.author;
        this.name = metadata.name;
        this.likedBy = metadata.likedBy;
        this.staredBy = metadata.staredBy;
        this.pid = pid;

        this.code = null;
    }

    loadProjectCode(next){
        database.ref("sharedProjects/projectData/"+this.pid).once("value").then((snapshot) => {
            this.code = snapshot.val();
            next(this.code);
        })
    }
}

function getShareBoardProjects(next){
    let projects = [];
    database.ref("sharedProjects/metadata").once("value").then((snapshot) => {
        let data = snapshot.val();
        for (let [pid, metadata] of Object.entries(data)) {
            projects.push(new ShareBoardProject(pid, metadata));
        }
        next(projects);
    })
}