import { useEffect } from "react";
import { useAuth } from "@/lib/auth";
import MainLayout from "@/components/layouts/MainLayout";

const Index = () => {
  const auth = useAuth();
  return (
    <MainLayout>
      <h1>Home</h1>
    </MainLayout>
  );
};

export default Index;
