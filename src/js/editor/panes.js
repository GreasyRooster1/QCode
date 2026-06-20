import Split from "split.js";

const stepsPane = document.querySelector(".steps-pane");

function setupDefaultPanes(hasLesson) {
    if(hasLesson) {
        Split(['.steps-pane', '.code-pane', '.output-pane'], {
            sizes: [20, 50, 30],
        });
    }else{
        Split(['.code-pane', '.output-pane'], {
            sizes: [60,40],
        });
        stepsPane.remove();
    }

    Split(['.canvas-output-pane', '.console-output-pane'], {
        sizes: [70, 30],
        direction: 'vertical',
        minSize: 30,
        snapOffset: 10,
    });
    createGutterBlocks()
}

function createGutterBlocks(){
    const horzGutters = document.querySelectorAll(".gutter.gutter-horizontal")

    for (let gutter of horzGutters) {
        let block = document.createElement("div");
        block.classList.add("gutter-block");
        gutter.appendChild(block);
    }
    const vertGutters = document.querySelectorAll(".gutter.gutter-vertical")

    for (let gutter of vertGutters) {
        let block = document.createElement("div");
        block.classList.add("gutter-block");
        gutter.appendChild(block);
    }
}

export {setupDefaultPanes,createGutterBlocks}