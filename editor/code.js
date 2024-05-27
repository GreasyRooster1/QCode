CodeMirror(document.querySelector('.code-editor'), {
    lineNumbers: true,
    tabSize: 2,
    value: 'console.log("Hello, World");',
    mode: 'javascript',
    theme: 'default',
    state: EditorState.create({
        extensions: [json(), linterExtension]
    }),
});