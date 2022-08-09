const notes = [
  {
    id: 1,
    title: "first note",
    body: "some dummy text first",
    updated: "2021-10-31T15:02:00.411Z",
  },
  {
    id: 2,
    title: "second note",
    body: "some dummy text second",
    updated: "2021-10-31T15:03:23.556Z",
  },
  {
    id: 3,
    title: "third note",
    body: "this is third note",
    updated: "2021-11-01T10:47:26.889Z",
  },
];

export default class NotesAPI {
  static getAllNotes() {
    //get data from DB
    const savedNotes = JSON.parse(localStorage.getItem("notes-app")) || [];
    //sort data based on Date (descending-fom new data to old data)
    return savedNotes.sort((a, b) => {
      return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });
  }

  static saveNote(noteToSave) {
    // get ALl notes
    const notes = NotesAPI.getAllNotes();
    //check if the note previously existed or not
    const existedNote = notes.find((n) => n.id == noteToSave.id);
    //if the note existed
    if (existedNote) {
      existedNote.title = noteToSave.title;
      existedNote.body = noteToSave.body;
      existedNote.updated = new Date().toISOString();
    } else {
      //if the note notexisted
      noteToSave.id = new Date().getTime();
      noteToSave.updated = new Date().toISOString();
      notes.push(noteToSave);
    }
    //put all notes again in DB
    localStorage.setItem("notes-app", JSON.stringify(notes));
  }

  static deleteNote(id) {
    //get all notes
    const notes = NotesAPI.getAllNotes();
    //remove the choosed note
    const filteredNotes = notes.filter((n) => n.id != id); // 1!== 2, 3!==2
    //put all notes again in DB
    localStorage.setItem("notes-app", JSON.stringify(filteredNotes));
  }
}

//به طور کلی در کار با دیتابیس این موارد به تریبت تکرار می شود

//1-گرفتن کل اطلاعات از دیتابیس
//2-انجام دادن عملیات مورد نظر(حذف -تغییر-اضافه کردن-...)
//3-فرستادن مجدد کل اطلاعات به دیتابیس
