export default class NotesView {
  constructor(root, handlers) {
    //get the parent of all element in sheet
    this.root = root;
    //add events in sheet
    const { onNoteAdd, onNoteEdit, onNoteSelect, onNoteDelete } = handlers;
    this.onNoteAdd = onNoteAdd;
    this.onNoteEdit = onNoteEdit;
    this.onNoteSelect = onNoteSelect;
    this.onNoteDelete = onNoteDelete;
    //make the static appearance of the sheet
    this.root.innerHTML = `
    <div class="notes__sidebar">
    <div class="notes__logo">NOTE APP</div>
    <div class="notes__list"></div>
    <button class="notes__add">ADD NOTE</button>
  </div>
  <div class="notes__preview">
    <input type="text" class="notes__title" placeholder="note title ..." />
    <textarea name="" class="notes__body">Take Note</textarea>
  </div>
    `;
    //get the needed elements(element that we want to add events to them)
    const addNoteBtn = this.root.querySelector(".notes__add");
    const inputTitle = this.root.querySelector(".notes__title");
    const inputBody = this.root.querySelector(".notes__body");

    //add events to the chooosed elements
    addNoteBtn.addEventListener("click", () => {
      // run add note method !!
      this.onNoteAdd();
    });

    [inputBody, inputTitle].forEach((inputField) => {
      inputField.addEventListener("blur", () => {
        const newBody = inputBody.value.trim();
        const newTitle = inputTitle.value.trim();
        this.onNoteEdit(newTitle, newBody);
      });
    });

    // hide notes preview in firs tloading :
    this.updateNotePreviewVisibility(false);
  }
//تا قبل از این جا به محض ساخته شدن یک نمونه از این کلاس به طور خودکار اجرا می شود(چون داخل کانستراکتور است)


//method for creating one list item
  _creatListItemHTML(id, title, body, updated) {
    const MAX_BODY_LENGTH = 50;
    return `
    <div class="notes__list-item" data-note-id="${id}" >
     <div class="notes__item-header">
     <div class="notes__small-title">${title}</div>
     <span class="notes__list-trash" data-note-id="${id}">
        <i class="far fa-trash-alt"></i>
     </span>
     </div>
    <div class="notes__samall-body">
    ${body.substring(0, MAX_BODY_LENGTH)}
    ${body.length > MAX_BODY_LENGTH ? "..." : ""}
    </div>
    <div class="notes__small-updated">
    ${new Date(updated).toLocaleString(undefined, {
      dateStyle: "full",
      timeStyle: "short",
    })}
     </div>
  </div>
    `;
  }

  //
  updateNoteList(notes) {
    //get note list items area
    const notesContainer = this.root.querySelector(".notes__list");
    //  empty all the notes in noteList
    notesContainer.innerHTML = "";
    // put a empty container
    let notesList = "";
    //loop in all notes and add them to noteList variable
    for (const note of notes) {
      const { id, title, body, updated } = note;
      //method for creating one note item
      const html = this._creatListItemHTML(id, title, body, updated);
      //add made item to the noteList variable
      notesList += html;
    }
    // add notesList variable to the DOM
    notesContainer.innerHTML = notesList;
    // add click event for select to the notesList(این رو مجبوریم این جا اضافه کنیم چون این جا به دام ما اضافه شده)
    notesContainer.querySelectorAll(".notes__list-item").forEach((noteItem) => {
      noteItem.addEventListener("click", () =>
        this.onNoteSelect(noteItem.dataset.noteId)
      );
    });
    // add click event for delete to the notesList(این رو مجبوریم این جا اضافه کنیم چون این جا به دام ما اضافه شده)
    notesContainer
      .querySelectorAll(".notes__list-trash")
      .forEach((noteItem) => {
        noteItem.addEventListener("click", (e) => {
          //چون پدرش هم دارای کلیک هست برای جلوگیری از اختلاط رویداد ها از این کد استفاده می کنیم
          e.stopPropagation();
          this.onNoteDelete(noteItem.dataset.noteId);
        });
      });
  }
  //for changing  the value of each note item
  updateActiveNote(note) {
    this.root.querySelector(".notes__title").value = note.title;
    this.root.querySelector(".notes__body").value = note.body;

    //  remove 'notes__list-item--selected' from all note items
    this.root.querySelectorAll(".notes__list-item").forEach((item) => {
      item.classList.remove("notes__list-item--selected");
    });
    //  add 'notes__list-item--selected' to the selected note item
    this.root.querySelector(`.notes__list-item[data-note-id="${note.id}"]`)
      .classList.add("notes__list-item--selected");
  }
  //show or not the right section of the sheet
  updateNotePreviewVisibility(visible) {
    this.root.querySelector(".notes__preview").style.visibility = visible
      ? "visible"
      : "hidden";
  }
}
