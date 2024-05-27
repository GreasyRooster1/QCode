import { basicSetup, EditorView} from "codemirror/codemirror/dist/index.js"
import { javascript } from "codemirror/lang-javascript/dist/index.js"
import { linter } from 'codemirror/lint/dist/index.js'
import { javascriptLanguage } from 'codemirror/lang-javascript/dist/index.js'

const linterExtension = linter(javascriptLanguage);

new EditorView({
    doc: "console.log('hello')\n",
    extensions: [basicSetup, javascript(), linterExtension],
    parent: document.querySelector(".code-editor"),
})