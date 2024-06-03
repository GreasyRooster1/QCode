import { basicSetup, EditorView} from "codemirror/codemirror/dist/index.js"
import { javascript } from "codemirror/lang-javascript/dist/index.js"
import { linter } from 'codemirror/lint/dist/index.js'
import { javascriptLanguage } from 'codemirror/lang-javascript/dist/index.js'

const linterExtension = linter(javascriptLanguage);

const customTheme = EditorView.theme({
    '&': {
        font:"'JetBrains Mono', monospace",
        fontSize: "16px",
    }
})

const editorView = new EditorView({
    doc: "function setup(){\n" +
        "  //setup code goes here\n" +
        "}\n" +
        "\n" +
        "function draw(){\n" +
        "  //drawing code goes here\n" +
        "}",
    extensions: [
        basicSetup,
        javascript(),
        linterExtension,
        customTheme,
    ],
    parent: document.querySelector(".code-editor"),
});

window.editor = editorView;

export const editor=editorView;