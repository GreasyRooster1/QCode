const textarea = document.querySelector(".code-editor > .text-input");
const numbers = document.querySelector(".code-editor > .numbers");
textarea.addEventListener("keydown", (e) => {
    const num = e.target.value.split("\n").length+1;
    numbers.innerHTML = Array(num).fill("<span></span>").join("");
});
textarea.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;

        textarea.value =
            textarea.value.substring(0, start) +
            "\t" +
            textarea.value.substring(end);

        event.preventDefault();
    }
});