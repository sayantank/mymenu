import { auth } from "@/lib/firebase-admin";

export default async (req, res) => {
  try {
    //const { date } = req.query;
    const { uid } = await auth.verifyIdToken(req.headers.token);
    console.log(uid);
    console.log(req.body);
    //const { meals } = await getOwnerMeals(uid, date);
    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ error });
  }
};
