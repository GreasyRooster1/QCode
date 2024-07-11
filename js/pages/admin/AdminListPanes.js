class LessonListPane extends GenericListPaneEvents{
    createItem(data) {
        return data.name
    }

    setDetails() {

    }

    loadItems() {
        FBDatabase.querySpecific("lessons",(data)=>{
            for(let [name,lesson] of Object.entries(data)){
                this.loadedData.push(new ListPaneItemData(name,lesson))
            }
            this.htmlElement.onLoadFinished()
            console.log(this.loadedData)
        })
    }
}

GenericListPane.register(LessonListPane);