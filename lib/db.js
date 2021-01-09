import firebase from "@/lib/firebase";
const firestore = firebase.firestore();

export function updateUser(uid, data) {
  return firestore.collection("users").doc(uid).update(data);
}

export function createUser(uid, data) {
  return firestore
    .collection("users")
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export function addMeal(meal) {
  return firestore.collection("meals").add(meal);
}

export function deleteMeal(id) {
  return firestore.collection("meals").doc(id).delete();
}

export function updateMeal(meal, id) {
  return firestore.collection("meals").doc(id).update(meal);
}
