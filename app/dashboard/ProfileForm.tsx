"use client";

import React from "react";

interface Props {
  user: {
    id: string;
    name: string | null;
    bio: string | null;
    age: number | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
  } | null;
}

export default function ProfileForm({ user }: Props) {
  async function updateUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const body = {
      name: formData.get("name"),
      bio: formData.get("bio"),
      age: formData.get("age"),
      image: formData.get("image") ?? "/user-icon.svg",
    };

    const res = await fetch("/api/user", {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    await res.json();
  }

  return (
    <div>
      <h2>Edit Your Profile</h2>
      <form onSubmit={updateUser}>
        <label htmlFor="name">Name: </label>
        <input type="text" name="name" defaultValue={user?.name ?? ""} />
        <label htmlFor="bio">Bio: </label>
        <textarea
          name="bio"
          cols={30}
          rows={10}
          defaultValue={user?.bio ?? ""}
        ></textarea>
        <label htmlFor="age">Age: </label>
        <input type="text" name="age" defaultValue={user?.age ?? 0} />
        <label htmlFor="image">Profile Image URL: </label>
        <input
          type="text"
          name="image"
          defaultValue={user?.image ?? "/user-icon.svg"}
        />

        <button className=" border-lime-500  rounded border" type="submit">
          Save
        </button>
      </form>
    </div>
  );
}
