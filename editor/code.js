const codeInput = document.querySelector(".code-input");

codeInput.addEventListener("input", (e) => {
    e.target.querySelector(":scope > br").remove()
});