import db from "@/lib/firebase-admin";

export async function getAllMeals(username) {
  try {
    const snapshot = await db
      .collection("meals")
      .where("username", "==", username)
      .get();
    const meals = [];
    snapshot.forEach((doc) => {
      meals.push({ id: doc.id, ...doc.data() });
    });
    meals.sort((a, b) =>
      compareAsc(parseISO(a.createdAt), parseISO(b.createdAt))
    );
    return { meals };
  } catch (error) {
    return { error };
  }
}

export async function getAllUsers() {
  const snapshot = await db.collection("users").get();
  const sites = [];
  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() });
  });
  return { sites };
}
