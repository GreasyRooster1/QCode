import { basicSetup, EditorView} from "codemirror"
import {drawSelection, keymap} from "@codemirror/view"
import {defaultKeymap, indentWithTab} from "@codemirror/commands"
import {esLint, javascript} from "@codemirror/lang-javascript"
import { rust } from "@codemirror/lang-rust"
import { html } from "@codemirror/lang-html"
import { css } from "@codemirror/lang-css"
import { python } from "@codemirror/lang-python"
import { cpp } from "@codemirror/lang-cpp"

// @ts-ignore
import {tags} from "@lezer/highlight"
// @ts-ignore
import {HighlightStyle, defaultHighlightStyle, syntaxHighlighting} from "@codemirror/language"
import {hasSavedRecently, setHasSaved} from "./save";
import {ViewUpdate} from "@codemirror/view";
import {boysAndGirls, dracula} from "thememirror";
import {barf} from 'thememirror';
import {hackerManTheme} from "./theme/hackerman";
import {amy} from 'thememirror';
import {birdsOfParadise} from 'thememirror';
import {linter, lintGutter, lintKeymap} from "@codemirror/lint";
import * as eslint from "eslint-linter-browserify";

type Language =  "javascript" | "rust" | "html" | "css" | "text" | "python" | "c++" | undefined

const config = {
    // eslint configuration
    languageOptions: {
        globals: {
            //...globals.node,
        },
        parserOptions: {
            ecmaVersion: 2022,
            sourceType: "script",
        },
    },
    rules: {
        "semi": ["warn", "always"],
        "no-debugger": "error",
        "no-dupe-args": "error",
        "no-const-assign": "error",
        "no-constant-binary-expression":"warn",
        "no-cond-assign":"warn",
        "no-constructor-return":"error",
        "no-irregular-whitespace":["error",{ "skipStrings": true }],
        "no-self-assign":"warn",
        "no-var":"error",
    },
};

let fixedFontTheme = EditorView.theme({
    '&': {
        fontSize: "15px",
        fontVariantLigatures:"none",
    }
})

const arduinoStyle = HighlightStyle.define([
    {tag: tags.keyword, color: "#20969d"},
    {tag: tags.typeName, color: "#20969d"},
    {tag: tags.meta, color: "#758d24"},
    {tag: tags.name, color: "#cf590f"},
    {tag: tags.comment, color: "#737f80"},
    {tag: tags.number, color: "#444f7a"},
    {tag: tags.punctuation, color: "#444f54"},
    {tag: tags.string, color: "#0f5b5f"},
    {tag: tags.null, color: "#4f5b61"},
])

let editor;

function setupEditor(language: Language) {
    fixedFontTheme = EditorView.theme({
        '&': {
            font: getFontFromCSS(),
            fontSize: "15px",
            fontVariantLigatures:"none",
        }
    })

    console.log(defaultHighlightStyle)
    document.querySelector(".code-editor")!.innerHTML = "";
    let languagePair = getLanguage(language);
    let extensions = [
        basicSetup,
        keymap.of([indentWithTab,...defaultKeymap, ...lintKeymap,]),
        lintGutter(),
        linter(esLint(new eslint.Linter(), config)),
        fixedFontTheme,
    ]
    if(languagePair!=null){
        extensions.push(languagePair!);
    }
    setThemeFromCSS(extensions);
    editor = new EditorView({
        doc: "\n",
        extensions: extensions,

        parent: document.querySelector(".code-editor")!,
    });
    // @ts-ignore
    window.editor = editor;
}

function setThemeFromCSS(extensions:any){
    let themeCss = window.getComputedStyle(document.body).getPropertyValue('--code-editor-theme');
    console.log(themeCss)
    if(themeCss=="\"dracula\""){
        extensions.push(dracula);
    }
    if(themeCss=="\"hackerman\""){
        extensions.push(hackerManTheme);
    }
    if(themeCss=="\"barf\""){
        extensions.push(barf);
    }
    if(themeCss=="\"amy\""){
        extensions.push(amy);
    }
    if(themeCss=="\"birdsOfParadise\""){
        extensions.push(birdsOfParadise);
    }
    if(themeCss=="\"boysAndGirls\""){
        extensions.push(boysAndGirls);
    }
    if(themeCss=="\"boysAndGirls\""){
        extensions.push(boysAndGirls);
    }
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

function getFontFromCSS(){
    let fontCss = window.getComputedStyle(document.body).getPropertyValue('--editor-font');
    console.log(fontCss)
    return fontCss!=""?fontCss:"'JetBrains Mono', monospace";
}

// @ts-ignore
window.editor = null;

export {editor,setupEditor,Language};