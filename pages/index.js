import { useEffect } from "react";
import { useAuth } from "@/lib/auth";

const Index = () => {
  const auth = useAuth();
  useEffect(() => {
    console.log(auth.user);
  }, [auth.user]);
  return auth.user ? (
    <div>
      <p>Email: {auth.user.email}</p>
      <button onClick={(e) => auth.signout()}>Sign Out</button>
    </div>
  ) : (
    <button onClick={(e) => auth.signinWithGoogle()}>Sign In</button>
  );
};

export default Index;
