export class NoteView{
    constructor(root,handler){
        //get the parent of all tags
        this.root=root;
        const {onNoteAdd,onNoteEdit,onNoteSelect,onNoteDelete}=handler;
        this.onNoteAdd=onNoteAdd;
        this.onNoteEdit=onNoteEdit;
        this.onNoteSelect=onNoteSelect;
        this.onNoteDelete=onNoteDelete;
        
        //add the children of parent tag and parent tag to the DOM
        this.root.innerHTML=`
        <div class="notes__sidebar w-1/6 bg-blue-900 h-full flex flex-col justify-between">
            <div class="notes-logo">notes app</div>

            <div class="notes__list flex flex-col justify-start items-start gap-2 flex-1"></div>

            <button class="notes__add bg-green-500">Add notes</button>
        </div>


        <div class="notes__preview w-5/6 flex flex-col gap-2 h-full">
            <input type="text" name="inputt" class="notes__title border border-black rounded-sm h-10" />
            <textarea class="notes__body border border-black rounded-sm "></textarea>

        </div>
        `
        //select tags
        const addNoteBtn=this.root.querySelector(".notes__add");
        const inputTitle=this.root.querySelector(".notes__title");
        const inputBody=this.root.querySelector(".notes__body");
         //add Events to selected tags
        addNoteBtn.addEventListener("click",()=>{
            this.onNoteAdd()
        });
        [inputBody,inputTitle].forEach(item=>{
            item.addEventListener("blur",()=>{
                const newBody=inputBody.value.trim();
                const newTitle=inputTitle.value.trim();
                this.onNoteEdit(newTitle,newBody)
            })
        })
    }



    //create one list item
    _createListItemHTML(id,title,body,updated){
        const MAX_BODY_LENGTH=50;
        return`
        <div class="notes__list-item text-xs border-2 border-white flex flex-col gap-1 overflow-clip text-white flex-1" data-note-id=${id}>
                    <div class="notes__small-title">${title}</div>
                    <div clas="notes__list-trash data-note-id=${id}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-2 w-2 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                    </div>
                    <div class="notes__small-body">
                    ${body.substring(0,MAX_BODY_LENGTH)}
                    ${body.length>MAX_BODY_LENGTH?"...":""}
                    </div>
                    <div class="notes__small-updated">
                    ${new Date(updated).toDateString("en",{
                        dateStyle:"full",
                        timeStyle:"short"
                    })}
                    </div>
                </div>
        `
    }

//loop on all list item and add it to the dom
updateNoteList(notes){
    const notesContainer=this.root.querySelector(".notes__list");
    notesContainer.innerHTML="";
    let noteList="";   
    for (const note of notes) {
        const {id,title,body,updated}=note;
        const html=this._createListItemHTML(id,title,body,updated);
        noteList+=html;
    }
    notesContainer.innerHTML=noteList;
    notesContainer.querySelectorAll(".notes__list-item").forEach(noteItem=>{
        noteItem.addEventListener("click",()=>{
            this.onNoteSelect(noteItem.dataset.noteId)
        })
    });
     notesContainer.querySelectorAll(".notes__list-trash").forEach(noteItem=>{
        noteItem.addEventListener("click",(e)=>{
            e.stopPropagation();
            this.onNoteDelete(noteItem.dataset.noteId)
        })
    })
};
}
