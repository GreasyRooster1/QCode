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


const customTheme = EditorView.theme({
    '&': {
        font:"'JetBrains Mono', monospace",
        fontSize: "15px",
        fontVariantLigatures:"none",
    }
})

let editor;

function setupEditor(language: string) {
    let languagePair = getLanguagePair(language);
    editor = new EditorView({
        doc: "\n",
        extensions: [
            basicSetup,
            languagePair?.func,
            linter(languagePair?.lang),
            keymap.of([indentWithTab]),
            customTheme,
        ],
        updateListener:onDocUpdate,
        parent: document.querySelector(".code-editor"),
    });
    // @ts-ignore
    window.editor = editor;
}

function getLanguagePair(identifier:string): { func: any; lang: any } | null{
    if(identifier == "javascript"){
        return {
            func: javascript(),
            lang: javascriptLanguage
        }
    }
    return null;
}

function onDocUpdate(){
    hasSavedRecently = false;
}

// @ts-ignore
window.editor = null;

export {editor,setupEditor};