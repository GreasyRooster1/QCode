import { basicSetup, EditorView } from "codemirror";
import { keymap } from "@codemirror/view";
import { indentWithTab } from "@codemirror/commands";
import { javascript } from "@codemirror/lang-javascript";
import { rust } from "@codemirror/lang-rust";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { python } from "@codemirror/lang-python";
import { cpp } from "@codemirror/lang-cpp";
// @ts-ignore
import { tags } from "@lezer/highlight";
// @ts-ignore
import { HighlightStyle, defaultHighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { setHasSaved } from "./save";
import { dracula } from "thememirror";
const fixedFontTheme = EditorView.theme({
    '&': {
        font: "'JetBrains Mono', monospace",
        fontSize: "15px",
        fontVariantLigatures: "none",
    }
});
const arduinoStyle = HighlightStyle.define([
    { tag: tags.keyword, color: "#20969d" },
    { tag: tags.typeName, color: "#20969d" },
    { tag: tags.meta, color: "#758d24" },
    { tag: tags.name, color: "#cf590f" },
    { tag: tags.comment, color: "#737f80" },
    { tag: tags.number, color: "#444f7a" },
    { tag: tags.punctuation, color: "#444f54" },
    { tag: tags.string, color: "#0f5b5f" },
    { tag: tags.null, color: "#4f5b61" },
]);
let editor;
function setupEditor(language) {
    console.log(defaultHighlightStyle);
    document.querySelector(".code-editor").innerHTML = "";
    let languagePair = getLanguage(language);
    let extensions = [
        basicSetup,
        keymap.of([indentWithTab]),
        fixedFontTheme,
    ];
    if (languagePair != null) {
        extensions.push(languagePair);
    }
    setThemeFromCSS(extensions);
    editor = new EditorView({
        doc: "\n",
        extensions: extensions,
        parent: document.querySelector(".code-editor"),
    });
    // @ts-ignore
    window.editor = editor;
}
function setThemeFromCSS(extensions) {
    let themeCss = window.getComputedStyle(document.body).getPropertyValue('--code-editor-theme');
    if (themeCss == "dracula") {
        extensions.push(dracula);
    }
}
function getLanguage(identifier) {
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
        return [cpp(), syntaxHighlighting(arduinoStyle)];
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
