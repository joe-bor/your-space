"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export function SignInButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <>Loading...</>;
  }

  if (status === "authenticated") {
    return (
      <>
        <Link href={"/dashboard"}>
          <Image
            src={session.user?.image ?? "/user-icon.svg"}
            width={32}
            height={32}
            alt="Your name"
          />
        </Link>
        <SignOutButton />
      </>
    );
  }

  return <button onClick={() => signIn()}>Sign In</button>;
}

export function SignOutButton() {
  return <button onClick={() => signOut()}>Sign Out</button>;
}
