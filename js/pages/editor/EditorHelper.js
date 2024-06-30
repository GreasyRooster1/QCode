class EditorHelper {
    static writeToEditor(data){
        const transaction = editor.state.update({changes: {from: 0, to: editor.state.doc.length, insert: data}})
        const update = editor.state.update(transaction);
        editor.update([update]);
    }

    static clearSteps() {
        EditorDOM.scrollableSteps.innerHTML = "";
    }

    static createSteps(steps){
        for (let ixd=0;i<steps.length;i++) {
            let stepData = steps[i];
            let stepEl = EditorHelper.createStepEl(stepData.head,stepData.content,stepData.image,stepData.type,i);
        }
        EditorHelper.createLessonBufferSpace()
    }

    static createLessonBufferSpace(){
        let buffer = document.createElement("div");
        buffer.classList.add("buffer");
        scrollableSteps.appendChild(buffer);
    }

    static createStepEl(head,content,image,type,count) {
        let stepEl = StepComponent.new();
        stepEl.setAttribute("head", head);
        stepEl.setAttribute("type", type);
        stepEl.setAttribute("count", count);
        stepEl.setAttribute("image", image);
        stepEl.innerHTML = content;
        return stepEl;
    }
}