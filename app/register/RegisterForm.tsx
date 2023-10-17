"use client";

import { FormEvent } from "react";

export default function RegisterForm() {
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
    console.log(response);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input type="text" name="email" placeholder="email" />
      <input type="password" name="password" placeholder="password" />
      <button type="submit">Register</button>
    </form>
  );
}
