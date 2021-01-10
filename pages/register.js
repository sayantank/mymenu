import DashboardSkeleton from "@/components/Skeletons/DashboardSkeleton";
import { useAuth } from "@/lib/auth";
import { registerUser } from "@/lib/db";
import isAlnum from "@/utils/isAlnum";
import isAlnumSpace from "@/utils/isAlnumSpace";
import validatePhone from "@/utils/validatePhone";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const { default: MainLayout } = require("@/components/layouts/MainLayout");

const Register = () => {
  const [username, setUsername] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [contactError, setContactError] = useState("");
  const [addressError, setAddressError] = useState("");
  const router = useRouter();
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      validatePhone(contact.trim()) &&
      isAlnum(username.trim().toLowerCase()) &&
      isAlnumSpace(address.trim())
    ) {
      setContactError("");
      setUsernameError("");
      setAddressError("");
      const { token, ...userWithoutToken } = auth.user;
      const data = {
        contact: contact.trim(),
        address: address.trim(),
        ...userWithoutToken,
      };
      data.username = username.trim().toLowerCase();
      const res = await registerUser(auth.user.uid, data);
      if (!res) {
        setUsernameError("Username already taken");
      } else {
        window.location.replace("/dashboard");
      }
    } else {
      if (!validatePhone(contact.trim())) {
        setContactError("Invalid Contact Number");
      } else {
        setContactError("");
      }
      if (!isAlnum(username.trim())) {
        setUsernameError("Invalid Username");
      } else {
        setUsernameError("");
      }
      if (!isAlnumSpace(address.trim())) {
        setAddressError("Invalid Address");
      } else {
        setAddressError("");
      }
    }
  };

  useEffect(() => {
    if (!(auth.user || auth.loading)) {
      router.push("/");
    }
  }, [auth.user, auth.loading]);

  useEffect(() => {
    if (!auth.loading) {
      if (auth.user && auth.user?.username !== undefined) {
        router.push("/dashboard");
      }
    }
  }, [auth.user, auth.loading]);

  if (auth.loading) {
    return <DashboardSkeleton />;
  }

  return auth.user && auth.user?.username === undefined ? (
    <MainLayout>
      <h1 className="lg:text-6xl text-4xl text-secondary font-extrabold mb-4">
        Register
      </h1>
      <h2 className="lg:text-xl text-lg text-secondary font-semibold mb-6">
        Before you start cooking, we’ll need a few more details about you.{" "}
      </h2>
      <form
        id="register-form"
        className="flex flex-col space-y-5 w-full lg:w-1/2"
        onSubmit={handleSubmit}
      >
        <div>
          <label
            for="username"
            className="block lg:text-base text-sm font-medium text-secondary mb-2"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="lg:text-lg text-md font-semibold text-secondary rounded-md border-2 p-3 w-full"
          />
          {usernameError !== "" && (
            <h3 className="text-sm lg:text-base text-red-500 font-normal mt-2">
              {usernameError}
            </h3>
          )}
        </div>
        <div>
          <label
            for="contact"
            className="block lg:text-base text-sm font-medium text-secondary mb-2"
          >
            Contact Number
          </label>
          <div className="flex items-center w-full space-x-3">
            <h3 className="lg:text-2xl text-xl text-secondary font-extrabold">
              +91
            </h3>
            <input
              id="contact"
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className="flex-1 lg:text-lg text-md font-semibold text-secondary rounded-md border-2 p-3"
            />
          </div>
          {contactError !== "" && (
            <h3 className="text-sm lg:text-base text-red-500 font-normal mt-2">
              {contactError}
            </h3>
          )}
        </div>
        <div>
          <label
            for="address"
            className="block lg:text-base text-sm font-medium text-secondary mb-2"
          >
            Address
          </label>
          <textarea
            form="register-form"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="lg:text-lg text-md font-semibold w-full rounded-md border-2 p-3 h-32 resize-none"
          />
          {addressError !== "" && (
            <h3 className="text-sm lg:text-base text-red-500 font-normal mt-2">
              {addressError}
            </h3>
          )}
        </div>
        <button
          type="submit"
          className="bg-primary hover:bg-secondary transition-colors text-lg lg:text-xl font-bold p-3 w-full rounded-md text-white"
        >
          Submit
        </button>
      </form>
    </MainLayout>
  ) : (
    <DashboardSkeleton />
  );
};

export default Register;
