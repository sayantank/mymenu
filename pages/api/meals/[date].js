import { auth } from "@/lib/firebase-admin";
import { getOwnerMeals } from "@/lib/db-admin";

export default async (req, res) => {
  try {
    const { date } = req.query;
    const { uid } = await auth.verifyIdToken(req.headers.token);
    const { meals } = await getOwnerMeals(uid, date);
    res.status(200).json({ meals });
  } catch (error) {
    res.status(500).json({ error });
  }
};
