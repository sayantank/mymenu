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

export async function registerUser(uid, data) {
  console.log(data.username);
  const snapshot = await firestore
    .collection("users")
    .where("username", "==", data.username)
    .get();

  if (snapshot.empty) {
    await firestore.collection("users").doc(uid).set(data, { merge: true });
    return true;
  } else {
    return false;
  }
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

export async function getClientUser(uid) {
  const userRef = firestore.collection("users").doc(uid);
  const doc = await userRef.get();
  if (!doc.exists) {
    return null;
  } else {
    const data = doc.data();
    return { data };
  }
}
