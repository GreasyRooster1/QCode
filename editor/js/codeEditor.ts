// @ts-ignore
import { basicSetup, EditorView} from "codemirror/codemirror/dist/index.js"
// @ts-ignore
import { keymap } from "codemirror/view/dist/index.js"
// @ts-ignore
import { indentWithTab } from "codemirror/commands/dist/index.js"
// @ts-ignore
import { linter } from 'codemirror/lint/dist/index.js'
// @ts-ignore


const customTheme = EditorView.theme({
    '&': {
        font:"'JetBrains Mono', monospace",
        fontSize: "15px",
        fontVariantLigatures:"none",
    }
})

let editor;

function setupEditor(languageFunc:any,language:any){
    editor = new EditorView({
        doc: "\n",
        extensions: [
            basicSetup,
            languageFunc,
            linter(language),
            keymap.of([indentWithTab]),
            customTheme,
        ],
        updateListener:onDocUpdate,
        parent: document.querySelector(".code-editor"),
    });
}

function onDocUpdate(){
    hasSavedRecently = false;
}

export {editor};