// if (navigator.serviceWorker) {
//     navigator.serviceWorker.register("./sw.js");
// }

import { getAllNoteFire, createNoteFire } from "/js/firebase-functions.js";

const getAllNotes = () => {
  getAllNoteFire();
};

const saveNote = async () => {
  const note = {
    text: "",
    created_at: new Date(),
  };
  const txtNote = document.getElementById("txtNote");
  note.text = txtNote.value;
  const generatedId = await createNoteFire(note);
  if (generatedId != "no-created") {
    txtNote.value = "";
    Toastify({
      text: "Nota creada exitosamente! :D",
      duration: 2000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  } else {
    alert("Nota no creada :(");
  }
};

const btnSave = document.getElementById("btnSave");
btnSave.addEventListener("click", saveNote);

getAllNotes();
