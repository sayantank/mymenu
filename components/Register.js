import { useAuth } from "@/lib/auth";
import { registerUser } from "@/lib/db";
import { useState } from "react";

const { default: MainLayout } = require("./layouts/MainLayout");

const Register = ({ auth }) => {
  const [username, setUsername] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { token, ...userWithoutToken } = auth.user;
    const data = { contact, address, ...userWithoutToken };
    data.username = username;
    await registerUser(auth.user.uid, data);
  };

  return (
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
        </div>
        <div>
          <label
            for="contact"
            className="block lg:text-base text-sm font-medium text-secondary mb-2"
          >
            Contact Number
          </label>
          <input
            id="contact"
            type="text"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            className="lg:text-lg text-md font-semibold text-secondary rounded-md border-2 p-3 w-full"
          />
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
        </div>
        <button
          type="submit"
          className="bg-primary hover:bg-secondary transition-colors text-lg lg:text-xl font-bold p-3 w-full rounded-md text-white"
        >
          Submit
        </button>
      </form>
    </MainLayout>
  );
};

export default Register;
