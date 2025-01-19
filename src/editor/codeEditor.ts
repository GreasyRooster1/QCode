// @ts-ignore
import { basicSetup, EditorView} from "codemirror/codemirror/dist/index.js"
// @ts-ignore
import { keymap } from "codemirror/view/dist/index.js"
// @ts-ignore
import { indentWithTab } from "codemirror/commands/dist/index.js"
// @ts-ignore
import { linter } from 'codemirror/lint/dist/index.js'

// @ts-ignore
import { javascript } from "codemirror/lang-javascript/dist/index.js"
// @ts-ignore
import { javascriptLanguage } from 'codemirror/lang-javascript/dist/index.js'

// @ts-ignore
import { rust } from "codemirror/lang-rust/dist/index.js"
// @ts-ignore
import { rustLanguage } from 'codemirror/lang-rust/dist/index.js'

// @ts-ignore
import { html } from "codemirror/lang-html/dist/index.js"
// @ts-ignore
import { htmlLanguage } from 'codemirror/lang-html/dist/index.js'

// @ts-ignore
import { css } from "codemirror/lang-css/dist/index.js"
// @ts-ignore
import { cssLanguage } from 'codemirror/lang-css/dist/index.js'

// @ts-ignore
import { python } from "codemirror/lang-python/dist/index.js"
// @ts-ignore
import { pythonLanguage } from 'codemirror/lang-python/dist/index.js'

// @ts-ignore
import { cpp } from "codemirror/lang-cpp/dist/index.js"
// @ts-ignore
import { cppLanguage } from 'codemirror/lang-cpp/dist/index.js'

import {tags} from "@lezer/highlight"
import {HighlightStyle} from "@codemirror/language"
import {hasSavedRecently, setHasSaved} from "./save";

type Language =  "javascript" | "rust" | "html" | "css" | "text" | "python" | "c++" | undefined

const fixedFontTheme = EditorView.theme({
    '&': {
        font:"'JetBrains Mono', monospace",
        fontSize: "15px",
        fontVariantLigatures:"none",
    }
})

const myHighlightStyle = HighlightStyle.define([
    {tag: tags.keyword, color: "#fc6"},
    {tag: tags.comment, color: "#f5d", fontStyle: "italic"}
])

let editor;

function setupEditor(language: Language) {
    document.querySelector(".code-editor")!.innerHTML = "";
    let languagePair = getLanguagePair(language);
    let extensions = [
        basicSetup,
        keymap.of([indentWithTab]),
        fixedFontTheme,
    ]
    if(languagePair!=null){
        extensions.push(languagePair!.func,linter(languagePair!.lang));
    }
    editor = new EditorView({
        doc: "\n",
        extensions: extensions,
        updateListener:onDocUpdate,
        parent: document.querySelector(".code-editor"),
    });
    // @ts-ignore
    window.editor = editor;
}

function getLanguagePair(identifier:Language): { func: any; lang: any } | null{
    if(identifier == "javascript"){
        return {
            func: javascript(),
            lang: javascriptLanguage
        }
    }
    if(identifier == "rust"){
        return {
            func: rust(),
            lang: rustLanguage
        }
    }
    if(identifier == "html"){
        return {
            func: html(),
            lang: htmlLanguage
        }
    }
    if(identifier == "css"){
        return {
            func: css(),
            lang: cssLanguage
        }
    }
    if(identifier == "python"){
        return {
            func: python(),
            lang: pythonLanguage
        }
    }
    if(identifier == "c++"){
        return {
            func: cpp(),
            lang: cppLanguage
        }
    }
    if(identifier == "text"){
        return null;
    }
    return null;
}

function onDocUpdate(){
    setHasSaved(false);
}

// @ts-ignore
window.editor = null;

export {editor,setupEditor,Language};