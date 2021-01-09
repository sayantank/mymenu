import { useAuth } from "@/lib/auth";
import { useRouter } from "next/router";

const Navbar = () => {
  const auth = useAuth();
  const router = useRouter();
  return (
    <div className="h-14 lg:h-16 my-3 lg:my-6 flex items-center">
      <div
        className="bg-primary h-8 lg:h-10 text-center flex items-center justify-center cursor-pointer"
        onClick={() => router.push("/")}
      >
        <h1 className="text-lg lg:text-2xl font-bold text-white">MyMenu</h1>
      </div>
      <div className="flex-1 flex flex-row justify-end items-center">
        {auth.user ? (
          <div className="flex flex-row space-x-5 items-center">
            {router.pathname !== "/dashboard" ? (
              <h2 onClick={() => router.push("/dashboard")}>Dashboard</h2>
            ) : null}
            <div
              className="h-8 lgh-10 w-8 lgw-10 overflow-hidden rounded-full cursor-pointer"
              onClick={(e) => router.push("/dashboard")}
            >
              <img src={auth.user.photoUrl} className="h-full w-auto" />
            </div>
          </div>
        ) : (
          <button
            className="px-6 py-1 shadow-md bg-secondary hover:bg-tertiary text-base lg:text-xl font-bold text-white"
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
