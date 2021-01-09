import { auth } from "@/lib/firebase-admin";
import { getOwnerMeals } from "@/lib/db-admin";

export default async (req, res) => {
  try {
    const { uid } = await auth.verifyIdToken(req.headers.token);
    console.log(req.body);
    console.log(uid);
    // const { meals } = await getOwnerMeals(uid, date);
    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ error });
  }
};
