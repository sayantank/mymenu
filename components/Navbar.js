import { useAuth } from "@/lib/auth";
import { useRouter } from "next/router";
import MainLayout from "./layouts/MainLayout";

const Navbar = () => {
  const auth = useAuth();
  const router = useRouter();
  return (
    <div className="h-14 md:h-16 my-3 md:my-6 flex items-center">
      <div className="bg-primary h-8 md:h-10 text-center flex items-center justify-center">
        <h1 className="text-lg md:text-2xl font-bold text-white">MyMenu</h1>
      </div>
      <div className="flex-1 flex flex-row justify-end items-center">
        {auth.user ? (
          <div
            className="h-8 md:h-10 w-8 md:w-10 overflow-hidden rounded-full cursor-pointer"
            onClick={(e) => router.push("/dashboard")}
          >
            <img src={auth.user.photoUrl} className="h-full w-auto" />
          </div>
        ) : (
          <button
            className="px-6 py-1 shadow-md bg-secondary hover:bg-tertiary text-base md:text-xl font-bold text-white"
            onClick={(e) => auth.signinWithGoogle("/dashboard")}
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
