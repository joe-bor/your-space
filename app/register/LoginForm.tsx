"use client";

import { signIn } from "next-auth/react";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  async function handleLoginSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const response = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });
    console.log({ response });
    if (!response?.error) {
      router.push("/");
      router.refresh();
    }
  }

  return (
    <form
      className="flex flex-col items-center justify-center gap-2"
      onSubmit={handleLoginSubmit}
    >
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
      <button type="submit">Login</button>
    </form>
  );
}
