/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/exec/index.js":
/*!***************************!*\
  !*** ./src/exec/index.js ***!
  \***************************/
/***/ (() => {

eval("\r\nlet parent = null;\r\n\r\nconst acceptedFunctions = [\r\n    \"mousePressed\",\r\n    \"mouseReleased\",\r\n    \"mouseClicked\",\r\n    \"mouseMoved\",\r\n    \"mouseDragged\",\r\n    \"doubleClicked\",\r\n    \"mouseWheel\",\r\n\r\n    \"keyPressed\",\r\n    \"keyReleased\",\r\n    \"keyTyped\",\r\n\r\n    \"touchStarted\",\r\n    \"touchEnded\",\r\n]\r\n\r\nconst oldLog = console.log;\r\nconst oldWarn = console.warn;\r\nconst oldErr = console.error;\r\n\r\nconsole.log = function (...args) {\r\n    logMessage(\"log\",args);\r\n}\r\n\r\nconsole.warn = function (...args) {\r\n    logMessage(\"warn\",args);\r\n}\r\n\r\nconsole.error = function (...args) {\r\n    logMessage(\"error\",args);\r\n}\r\n\r\n//log errors\r\nwindow.onerror = function(error) {\r\n    logMessage(\"error\",error);\r\n}\r\n\r\nfunction logMessage(type,...args){\r\n    if (parent === null) {\r\n        return;\r\n    }\r\n    let log = {type:type,message:args.join(\" \")};\r\n    parent.postMessage(JSON.stringify(log));\r\n}\r\n\r\n\r\nwindow.addEventListener(\"message\", ({ data, source }) => {\r\n    if (parent === null) {\r\n        parent = source;\r\n    }\r\n\r\n    runJs(data);\r\n});\r\n\r\ndocument.addEventListener('contextmenu', event => {\r\n    event.preventDefault();\r\n});\r\n\r\n\r\n\r\nfunction runJs(js){\r\n    //clear dangerous objects and run code\r\n    eval(js);\r\n\r\n    let eventFunctions = [];\r\n\r\n    for (let acceptedFunc of acceptedFunctions){\r\n        let funcDef;\r\n        try {\r\n            funcDef = eval(acceptedFunc);\r\n        }catch(e){\r\n            funcDef = undefined;\r\n        }\r\n\r\n        if (funcDef !== undefined) {\r\n            eventFunctions.push(funcDef);\r\n        }\r\n    }\r\n\r\n    if(draw===undefined||setup===undefined){\r\n        return;\r\n    }\r\n\r\n    startP5(draw,setup,eventFunctions);\r\n}\r\n\r\n\r\n//helpers\r\n\r\n\r\nfunction startP5(drawArg,setupArg,otherFunctions) {\r\n    window.setup = function(){\r\n        createCanvas(500,500);\r\n        createCanvas = function (){\r\n            console.error(\"createCanvas is disabled\");\r\n        }\r\n        document.getElementById(\"defaultCanvas0\").style.width = \"100vmin\";\r\n        document.getElementById(\"defaultCanvas0\").style.height = \"100vmin\";\r\n        setupArg()\r\n    };\r\n\r\n    for(let func of otherFunctions){\r\n        if(acceptedFunctions.includes(func.name)) {\r\n            window[func.name] = func;\r\n        }\r\n    }\r\n\r\n    window.draw = drawArg;\r\n\r\n    new p5();\r\n}\r\n\r\nfunction __canvasTest(){\r\n    background(0);\r\n    stroke(255);\r\n\r\n    for (let i = 0; i < 500; i+=10) {\r\n        let timeRatio = (frameCount % 500-i) / 490;\r\n        let bRat = i/500;\r\n\r\n        fill(timeRatio * 255, 0, bRat*255);\r\n        rect(timeRatio * 490, 0, 10, 10);\r\n\r\n        fill(0, timeRatio * 255, bRat*255);\r\n        rect(0, timeRatio * 490, 10, 10);\r\n    }\r\n\r\n    fill(255);\r\n\r\n    ellipse(mouseX,mouseY,10,10);\r\n\r\n    textAlign(CENTER);\r\n    text(\"Welcome back\",250,250);\r\n}\r\n\n\n//# sourceURL=webpack:///./src/exec/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/exec/index.js"]();
/******/ 	
/******/ })()
;