// @ts-ignore
import { basicSetup, EditorView } from "codemirror";
// @ts-ignore
import { keymap } from "@codemirror/view";
// @ts-ignore
import { indentWithTab } from "@codemirror/commands";
// @ts-ignore
import { javascript } from "@codemirror/lang-javascript";
// @ts-ignore
import { rust } from "@codemirror/lang-rust";
// @ts-ignore
import { html } from "@codemirror/lang-html";
// @ts-ignore
import { css } from "@codemirror/lang-css";
// @ts-ignore
import { python } from "@codemirror/lang-python";
// @ts-ignore
import { cpp } from "@codemirror/lang-cpp";
// @ts-ignore
import { tags } from "@lezer/highlight";
// @ts-ignore
import { HighlightStyle } from "@codemirror/language";
import { setHasSaved } from "./save";
const fixedFontTheme = EditorView.theme({
    '&': {
        font: "'JetBrains Mono', monospace",
        fontSize: "15px",
        fontVariantLigatures: "none",
    }
});
const arduinoStyle = HighlightStyle.define([
    { tag: tags.keyword, color: "#fc6" },
    { tag: tags.comment, color: "#f5d", fontStyle: "italic" }
]);
let editor;
function setupEditor(language) {
    document.querySelector(".code-editor").innerHTML = "";
    let languagePair = getLanguagePair(language);
    let extensions = [
        basicSetup,
        keymap.of([indentWithTab]),
        fixedFontTheme,
    ];
    if (languagePair != null) {
        extensions.push(languagePair);
    }
    editor = new EditorView({
        doc: "\n",
        extensions: extensions,
        parent: document.querySelector(".code-editor"),
    });
    // @ts-ignore
    window.editor = editor;
}
function getLanguagePair(identifier) {
    if (identifier == "javascript") {
        return javascript();
    }
    if (identifier == "rust") {
        return rust();
    }
    if (identifier == "html") {
        return html();
    }
    if (identifier == "css") {
        return css();
    }
    if (identifier == "python") {
        return python();
    }
    if (identifier == "c++") {
        return cpp();
    }
    if (identifier == "text") {
        return null;
    }
    return null;
}
function onDocUpdate(update) {
    setHasSaved(false);
}
// @ts-ignore
window.editor = null;
export { editor, setupEditor };
