// @ts-ignore
import { basicSetup, EditorView } from "codemirror";
// @ts-ignore
import { keymap } from "codemirror/view";
// @ts-ignore
import { indentWithTab } from "codemirror/commands";
// @ts-ignore
import { linter } from 'codemirror/lint';
// @ts-ignore
import { javascript } from "codemirror/lang-javascript";
// @ts-ignore
import { javascriptLanguage } from 'codemirror/lang-javascripts';
// @ts-ignore
import { rust } from "codemirror/lang-rust";
// @ts-ignore
import { rustLanguage } from 'codemirror/lang-rust';
// @ts-ignore
import { html } from "codemirror/lang-html";
// @ts-ignore
import { htmlLanguage } from 'codemirror/lang-html';
// @ts-ignore
import { css } from "codemirror/lang-css";
// @ts-ignore
import { cssLanguage } from 'codemirror/lang-css';
// @ts-ignore
import { python } from "codemirror/lang-python";
// @ts-ignore
import { pythonLanguage } from 'codemirror/lang-python';
// @ts-ignore
import { cpp } from "codemirror/lang-cpp";
// @ts-ignore
import { cppLanguage } from 'codemirror/lang-cpp';
// @ts-ignore
import { tags } from "lezer/highlight";
// @ts-ignore
import { HighlightStyle } from "codemirror/language";
import { setHasSaved } from "./save";
const fixedFontTheme = EditorView.theme({
    '&': {
        font: "'JetBrains Mono', monospace",
        fontSize: "15px",
        fontVariantLigatures: "none",
    }
});
const myHighlightStyle = HighlightStyle.define([
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
        extensions.push(languagePair.func, linter(languagePair.lang));
    }
    editor = new EditorView({
        doc: "\n",
        extensions: extensions,
        updateListener: onDocUpdate,
        parent: document.querySelector(".code-editor"),
    });
    // @ts-ignore
    window.editor = editor;
}
function getLanguagePair(identifier) {
    if (identifier == "javascript") {
        return {
            func: javascript(),
            lang: javascriptLanguage
        };
    }
    if (identifier == "rust") {
        return {
            func: rust(),
            lang: rustLanguage
        };
    }
    if (identifier == "html") {
        return {
            func: html(),
            lang: htmlLanguage
        };
    }
    if (identifier == "css") {
        return {
            func: css(),
            lang: cssLanguage
        };
    }
    if (identifier == "python") {
        return {
            func: python(),
            lang: pythonLanguage
        };
    }
    if (identifier == "c++") {
        return {
            func: cpp(),
            lang: cppLanguage
        };
    }
    if (identifier == "text") {
        return null;
    }
    return null;
}
function onDocUpdate() {
    setHasSaved(false);
}
// @ts-ignore
window.editor = null;
export { editor, setupEditor };
