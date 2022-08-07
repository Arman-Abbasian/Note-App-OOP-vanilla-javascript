const notes=[
    {id:1,title:"title 1",body:"this is the body of id 1",updated:"2021-08-06T05:07:33.457Z"},
    {id:2,title:"title 2",body:"this is the body of id 2",updated:"2022-08-06T05:07:33.457Z"}
]
export class NoteAPI{
  static  getAllNotes(){
        const savedNotes=JSON.parse(localStorage.getItem("notes-app")) ||[];
        return savedNotes.sort((a,b)=>{
            return new Date (b.updated) - new Date(a.updated)
        });
    }
    static savedNote(noteToSave){
        const notes=NoteAPI.getAllNotes();
        const existedNote=notes.find(item=>item.id===noteToSave.id)
        if(existedNote){
            console.log(existedNote)
            existedNote.title=noteToSave.title;
            existedNote.body=noteToSave.body;
            existedNote.updated=new Date().toISOString();
            console.log(existedNote)
        }else{
            console.log(noteToSave)
            noteToSave.id=new Date().getTime();
            noteToSave.updated=new Date().toISOString();
            console.log(noteToSave)
            notes.push(noteToSave);
        }
        localStorage.setItem("notes-app",JSON.stringify(notes))
    }
    static deleteNote(id){
        const notes=NoteAPI.getAllNotes();
        console.log(id)
        const filterdNotes=notes.filter(item=>item.id!==id);
        localStorage.setItem("notes-app",JSON.stringify(filterdNotes))
    }
}
console.log(NoteAPI.getAllNotes());
NoteAPI.savedNote({id:1,title:"edited title 1",body:"this is the body of id 1",updated:"2021-08-06T05:07:33.457Z"});
NoteAPI.deleteNote(1659764899060);
