interface ErrorCallback {
    (content:string,type:string):void,
}

class LanguageType{
    identifier:string;
    allowShare:boolean;

    constructor(identifier:string,allowShare:boolean) {
        this.identifier = identifier;
    }

    onLoad(){

    }

    saveCode(){

    }

    run(errorCallback:ErrorCallback) {

    }

    stop(){

    }
}