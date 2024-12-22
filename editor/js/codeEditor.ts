// @ts-ignore
import { basicSetup, EditorView} from "codemirror/codemirror/dist/index.js"
// @ts-ignore
import { keymap } from "codemirror/view/dist/index.js"
// @ts-ignore
import { javascript } from "codemirror/lang-javascript/dist/index.js"
// @ts-ignore
import { indentWithTab } from "codemirror/commands/dist/index.js"
// @ts-ignore
import { linter } from 'codemirror/lint/dist/index.js'
// @ts-ignore
import { javascriptLanguage } from 'codemirror/lang-javascript/dist/index.js'


const customTheme = EditorView.theme({
    '&': {
        font:"'JetBrains Mono', monospace",
        fontSize: "15px",
        fontVariantLigatures:"none",
    }
})

const editorView = new EditorView({
    doc: "\n",
    extensions: [
        basicSetup,
        javascript(),
        linter(javascriptLanguage),
        keymap.of([indentWithTab]),
        customTheme,
    ],
    updateListener:onDocUpdate,
    parent: document.querySelector(".code-editor"),
});

function onDocUpdate(){
    hasSavedRecently = false;
}

export const editor=editorView;