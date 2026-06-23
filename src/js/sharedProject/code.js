import { basicSetup, EditorView} from "codemirror"
import { keymap } from "@codemirror/view"
import { javascript } from "@codemirror/lang-javascript"
import { indentWithTab } from "@codemirror/commands"
import { linter } from '@codemirror/lint'
import { javascriptLanguage } from '@codemirror/lang-javascript'

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


export {editorView,customTheme};