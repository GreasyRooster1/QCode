import { basicSetup, EditorView} from "codemirror/codemirror/dist/index.js"
import { keymap } from "codemirror/view/dist/index.js"
import { javascript } from "codemirror/lang-javascript/dist/index.js"
import { indentWithTab } from "codemirror/commands/dist/index.js"
import { linter } from 'codemirror/lint/dist/index.js'
import { javascriptLanguage } from 'codemirror/lang-javascript/dist/index.js'

const linterExtension = linter(javascriptLanguage);

const customTheme = EditorView.theme({
    '&': {
        font:"'JetBrains Mono', monospace",
        fontSize: "15px",
    }
})

const editorView = new EditorView({
    doc: "\n",
    extensions: [
        basicSetup,
        javascript(),
        linterExtension,
        keymap.of([indentWithTab]),
        customTheme,
    ],
    updateListener:onDocUpdate,
    parent: document.querySelector(".code-editor"),
});

function onDocUpdate(){
    hasSavedRecently = false;
}

window.editor = editorView;

export const editor=editorView;