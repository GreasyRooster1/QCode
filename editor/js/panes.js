Split(['.steps-pane', '.code-pane', '.output-pane'],{
    sizes: [20, 50,30],
});

const horzGutters = document.querySelectorAll(".gutter.gutter-horizontal")

for(let gutter of horzGutters){
    let block = document.createElement("div");
    block.classList.add("gutter-block");
    gutter.appendChild(block);
}