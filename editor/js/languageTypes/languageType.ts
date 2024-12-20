interface ErrorCallback {
    (content:string,type:string):void,
}

abstract class LanguageType{
    identifier:string;
    allowShare:boolean;

    constructor(identifier:string,allowShare:boolean) {
        this.identifier = identifier;
        this.allowShare = allowShare;
    }

    setup(){
        this.loadProjectData()
    }

    loadProjectData(){

    }

    /*
    * Abstract methods
    */

    abstract setupEditor():void;

    abstract onLoad():void;

    abstract saveCode():void;

    abstract run(errorCallback:ErrorCallback):void;

    abstract stop():void;
}

export {LanguageType,ErrorCallback};