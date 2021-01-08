import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import MainLayout from "@/components/layouts/MainLayout";

const Index = () => {
  const auth = useAuth();
  useEffect(() => {
    console.log(auth.user);
  }, [auth.user]);
  return (
    <MainLayout>
      <h1>Home</h1>
    </MainLayout>
  );
};

export default Index;
