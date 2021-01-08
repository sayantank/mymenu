import { useRouter } from "next/router";
import { getAllMeals, getAllUsers } from "@/lib/db-admin";

export default function FeedbackPage({ initialMeals }) {
  const router = useRouter();
  return <div className="bg-gray-700">Page Id: ${router.query.username}</div>;
}

export async function getStaticProps(context) {
  const username = context.params.username;
  const { meals } = await getAllMeals(username);
  return {
    props: {
      initalMeals: meals,
    },
    revalidate: 1,
  };
}
export async function getStaticPaths() {
  const { sites } = await getAllUsers();
  const paths = sites.map((site) => ({
    params: {
      username: site.username.toString(),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}
