import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  addDoc,
  limit,
  startAfter,
  startAt,
  orderBy,
} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";
import {} from "https://www.gstatic.com/firebasejs/9.13.0/firebase-storage.js";
import { app } from "/js/firebase.js";

const db = getFirestore(app);

var validation = false;
const q = query(collection(db, "notes"), orderBy("create_at"), limit(1));
const documentSnapshots = await getDocs(q);
var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
var text = document.getElementById("text");

const getAllNoteFire = async () => {
  console.log("last", lastVisible);
  console.log("validation", validation);

  if (validation == false) {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      text = document.getElementById("text");
      text.innerHTML += `<div class="card mt-2" data-bs-toggle='modal' data-bs-target='#exampleModal'>
      <div class="card-body">
          <div class="row"> 
              <div class="col text-truncate" >${doc.data().text}</div>
          </div>
      </div>
  </div>`;
      text.addEventListener("click", () => {
        console.log(doc.data().text);
        document.getElementById("textModal").value = doc.data().text;
      });
    });

    validation = true;
  } else if (validation == true) {
    const next = query(
      collection(db, "notes"),
      orderBy("create_at"),
      limit(1),
      startAfter(lastVisible)
    );
    const documentSnapshots2 = await getDocs(next);
    lastVisible = documentSnapshots2.docs[documentSnapshots2.docs.length - 1];
    const querySnapshot = await getDocs(next);

    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => 2", doc.data());
      text = document.getElementById("text");
      text.innerHTML += `<div class="card mt-2" data-bs-toggle='modal' data-bs-target='#exampleModal'>
      <div class="card-body">
          <div class="row"> 
              <div class="col text-truncate" >${doc.data().text}</div>
          </div>
      </div>
  </div>`;

      text.addEventListener("click", () => {
        console.log(doc.data().text);
        document.getElementById("textModal").value = doc.data().text;
      });
    });
  }
};

const createNoteFire = async (note) => {
  try {
    const docRef = await addDoc(collection(db, "notes"), note);
    const text = document.getElementById("text");
    text.innerHTML += `<div class="card mt-2">
            <div class="card-body">
                <div class="row"> 
                    <div class="col text-truncate" >""</div>
                </div>
            </div>
        </div>`;

    getAllNoteFire();
    return docRef.id;
  } catch (error) {
    return "no create";
  }
};

const loadMore = document.getElementById("loadMore");

loadMore.addEventListener("click", () => {
  getAllNoteFire();
});

export { getAllNoteFire, createNoteFire };
