const stepsPane = document.querySelector(".steps-pane");
const codePane = document.querySelector(".code-pane");
const outputPane = document.querySelector(".output-pane");
const leftGutter = document.querySelector(".gutter-left");
const rightGutter = document.querySelector(".gutter-right");
const wrapper = document.querySelector(".pane-container");


function resizerLeft(e) {
    window.addEventListener('mousemove', mousemove);
    window.addEventListener('mouseup', mouseup);
    e.preventDefault()

    let prevX = e.x;
    const paneBoundingBox = stepsPane.getBoundingClientRect();


    function mousemove(e) {
        let newX = prevX - e.x;
        stepsPane.style.width = paneBoundingBox.width - newX + "px";
    }

    function mouseup() {
        window.removeEventListener('mousemove', mousemove);
        window.removeEventListener('mouseup', mouseup);

    }
}

leftGutter.addEventListener('mousedown', resizerLeft);

function resizerRight(e) {
    e.preventDefault()

    window.addEventListener('mousemove', mousemove);
    window.addEventListener('mouseup', mouseup);

    let prevX = e.x;
    const wrapperBoundingBox = wrapper.getBoundingClientRect();
    const stepsBoundingBox = stepsPane.getBoundingClientRect();
    let codeBoundingBox = codePane.getBoundingClientRect();


    function mousemove(e) {
        let newX = prevX - e.x;
        codePane.style.width = codeBoundingBox.width - newX + "px";
        // codeBoundingBox = codePane.getBoundingClientRect();
        // outputPane.style.width = wrapperBoundingBox.width-(stepsBoundingBox.width+codeBoundingBox.width)  + "px";
    }

    function mouseup() {
        window.removeEventListener('mousemove', mousemove);
        window.removeEventListener('mouseup', mouseup);


    }

}
rightGutter.addEventListener('mousedown', resizerRight);