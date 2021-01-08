import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import MainLayout from "@/components/layouts/MainLayout";
const Dashboard = () => {
  const auth = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!auth.user) {
      router.replace("/");
    }
  }, [auth.user]);
  return (
    auth.user && (
      <MainLayout>
        <h1>Dashboard</h1>
      </MainLayout>
    )
  );
};

export default Dashboard;
