class EditorHelper {
    static writeToEditor(data){
        const transaction = editor.state.update({changes: {from: 0, to: editor.state.doc.length, insert: data}})
        const update = editor.state.update(transaction);
        editor.update([update]);
    }

    static clearSteps() {
        scrollableSteps.innerHTML = "";
    }
}