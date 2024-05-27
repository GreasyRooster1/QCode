const stepsPane = document.querySelector(".steps-pane");
const codePane = document.querySelector(".code-pane");
const outputPane = document.querySelector(".output-pane");
const leftGutter = document.querySelector(".gutter-left");
const rightGutter = document.querySelector(".gutter-right");
const wrapper = document.querySelector(".pane-container");


Split(['.steps-pane', '.code-pane', '.output-pane'],{
    sizes: [20, 50,30],
});