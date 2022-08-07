import  {NoteAPI} from './NoteApI.js';
import { NoteView } from './NoteView.js';
const app=document.querySelector("#app");
const noteView=new NoteView(app,{
    onNoteAdd(){
        console.log("note has been added")
    },
    onNoteEdit(newTitle,newBody){
        console.log(newTitle,newBody)
    },
    onNoteSelect(noteId){
        console.log(noteId)
    },
    onNoteDelete(noteId){
        console.log(noteId)
    }
})
const notes=NoteAPI.getAllNotes();
console.log(notes);
noteView.updateNoteList(notes)
