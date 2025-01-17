const defaultCodeJs = "function setup(){\n  //setup code here\n}\n\nfunction draw(){\n  //draw code goes here\n}\n"
const defaultCodeArduino = "void setup(){\n  // put your setup code here, to run once:\n\n}\n\nvoid loop(){\n  // put your main code here, to run repeatedly:\n\n}\n"
const defaultFilesWeb = {
    "index➽css":"",
    "index➽js":"",
    "index➽html":"<!DOCTYPE html>\n" +
        "<html lang=\"en\">\n" +
        "  <head>\n" +
        "    <title>My Website</title>\n" +
        "    <link rel=\"stylesheet\" href=\"index.css\">\n" +
        "    <script src=\"index.js\"></script>\n" +
        "  </head>\n" +
        "  <body>\n" +
        "    \n" +
        "  </body>\n" +
        "</html>",
}

const stepTypes = ["info","code","challenge","check","chapters","next"]

export {defaultCodeJs, defaultCodeArduino, stepTypes,defaultFilesWeb}