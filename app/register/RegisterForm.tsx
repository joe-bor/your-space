"use client";

import { Dispatch, FormEvent, SetStateAction } from "react";
import { signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

interface ComponentProps {
  setIsRegisterFormOpen: Dispatch<SetStateAction<boolean>>;
}

export default function RegisterForm({
  setIsRegisterFormOpen,
}: ComponentProps) {
  const { data: session, status } = useSession();
  console.log(session, status);

  if (status === "authenticated") {
    redirect("/");
  }

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const response = await fetch(`/api/auth/register`, {
      method: "POST",
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    console.log({ response });
    // switch to login form
    if (response) {
      setIsRegisterFormOpen(false);
    }
  };

  return (
    <form
      className=" flex flex-col justify-center items-center"
      onSubmit={handleFormSubmit}
    >
      <input
        className=" border border-black text-black m-2 p-2"
        type="text"
        name="name"
        placeholder="name"
      />
      <input
        className="border border-black text-black m-2 p-2"
        type="text"
        name="email"
        placeholder="email"
      />
      <input
        className="border border-black text-black m-2 p-2"
        type="password"
        name="password"
        placeholder="password"
      />
      <button type="submit">Register</button>
    </form>
  );
}
