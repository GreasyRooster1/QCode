import { basicSetup, EditorView} from "codemirror/codemirror/dist/index.js"
import { javascript } from "codemirror/lang-javascript/dist/index.js"
import { linter } from 'codemirror/lint/dist/index.js'
import { javascriptLanguage } from 'codemirror/lang-javascript/dist/index.js'

const linterExtension = linter(javascriptLanguage);

const editorView = new EditorView({
    doc: "function setup(){\n" +
        "  //setup code goes here\n" +
        "}\n" +
        "\n" +
        "function draw(){\n" +
        "  //drawing code goes here\n" +
        "}",
    extensions: [basicSetup, javascript(), linterExtension],
    parent: document.querySelector(".code-editor"),
});

window.__exportedEditorContext = editorView;

export const editor=editorView;