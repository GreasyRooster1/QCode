import { basicSetup, EditorView} from "codemirror/codemirror/dist/index.js"
import { keymap } from "codemirror/view/dist/index.js"
import { javascript } from "codemirror/lang-javascript/dist/index.js"
import { indentWithTab } from "codemirror/commands/dist/index.js"
import { linter } from 'codemirror/lint/dist/index.js'
import { javascriptLanguage } from 'codemirror/lang-javascript/dist/index.js'

const customTheme = EditorView.theme({
    '&': {
        font:"'JetBrains Mono', monospace",
        fontSize: "15px",
        fontVariantLigatures:"none",
    },
})

let editorView = new EditorView({
    doc: "\n",
    extensions: [
        basicSetup,
        javascript(),
        linter(javascriptLanguage),
        keymap.of([indentWithTab]),
        customTheme,
        EditorView.editable.of(false),
    ],
    updateListener:onDocUpdate,
    parent: document.querySelector(".code-editor"),
});

function onDocUpdate(){
    window.editor.state.doc.toString();
}

window.editor = editorView;

export const editor=editorView;