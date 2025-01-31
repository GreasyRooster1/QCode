// @ts-ignore
import { basicSetup, EditorView} from "codemirror"
// @ts-ignore
import { keymap } from "@codemirror/view"
// @ts-ignore
import { indentWithTab } from "@codemirror/commands"
// @ts-ignore
import { linter } from '@codemirror/lint'

// @ts-ignore
import { javascript } from "@codemirror/lang-javascript"
// @ts-ignore
import { javascriptLanguage } from '@codemirror/lang-javascript'

// @ts-ignore
import { rust } from "@codemirror/lang-rust"
// @ts-ignore
import { rustLanguage } from '@codemirror/lang-rust'

// @ts-ignore
import { html } from "@codemirror/lang-html"
// @ts-ignore
import { htmlLanguage } from '@codemirror/lang-html'

// @ts-ignore
import { css } from "@codemirror/lang-css"
// @ts-ignore
import { cssLanguage } from '@codemirror/lang-css'

// @ts-ignore
import { python } from "@codemirror/lang-python"
// @ts-ignore
import { pythonLanguage } from '@codemirror/lang-python'

// @ts-ignore
import { cpp } from "@codemirror/lang-cpp"
// @ts-ignore
import { cppLanguage } from '@codemirror/lang-cpp'

// @ts-ignore
import {tags} from "@lezer/highlight"
// @ts-ignore
import {HighlightStyle, defaultHighlightStyle, syntaxHighlighting} from "@codemirror/language"
import {hasSavedRecently, setHasSaved} from "./save";
import {ViewUpdate} from "@codemirror/view";

type Language =  "javascript" | "rust" | "html" | "css" | "text" | "python" | "c++" | undefined

const fixedFontTheme = EditorView.theme({
    '&': {
        font:"'JetBrains Mono', monospace",
        fontSize: "15px",
        fontVariantLigatures:"none",
    }
})

const arduinoStyle = HighlightStyle.define([
    {tag: tags.keyword, color: "#20969d"},
    {tag: tags.typeName, color: "#20969d"},
    {tag: tags.meta, color: "#758d24"},
    {tag: tags.name, color: "#cf590f"},
    {tag: tags.comment, color: "#96a5a6"},
    {tag: tags.number, color: "#444f7a"},
    {tag: tags.punctuation, color: "#444f54"},
])

let editor;

function setupEditor(language: Language) {
    console.log(defaultHighlightStyle)
    document.querySelector(".code-editor")!.innerHTML = "";
    let languagePair = getLanguage(language);
    let extensions = [
        basicSetup,
        keymap.of([indentWithTab]),
        fixedFontTheme,
    ]
    if(languagePair!=null){
        extensions.push(languagePair!);
    }
    editor = new EditorView({
        doc: "\n",
        extensions: extensions,

        parent: document.querySelector(".code-editor")!,
    });
    // @ts-ignore
    window.editor = editor;
}

function getLanguage(identifier:Language): any | null{
    if(identifier == "javascript"){
        return javascript()
    }
    if(identifier == "rust"){
        return rust()
    }
    if(identifier == "html"){
        return html()
    }
    if(identifier == "css"){
        return css()
    }
    if(identifier == "python"){
        return python()
    }
    if(identifier == "c++"){
        return [cpp(),syntaxHighlighting(arduinoStyle)]
    }
    if(identifier == "text"){
        return null;
    }
    return null;
}

function onDocUpdate(update: ViewUpdate){
    setHasSaved(false);
}

// @ts-ignore
window.editor = null;

export {editor,setupEditor,Language};