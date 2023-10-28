import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignOutButton } from "./components/buttons";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const NavMenu = async () => {
  const session = await getServerSession(authOptions);
  return (
    <nav className=" flex bg-blue-400 text-white h-16 justify-between items-center">
      <Link href={"/"}>
        <Image
          src="/next.svg"
          width={216}
          height={30}
          alt="Next Logo"
          priority
        />
      </Link>
      <ul className=" list-none flex mr-4">
        {session ? (
          <>
            <li className=" h-12 flex items-center p-1">
              <Link href={"about"}>About</Link>
            </li>
            <li className=" h-12 flex items-center p-1">
              <Link href={"/blog"}>Blog</Link>
            </li>
            <li className=" h-12 flex items-center p-1">
              <Link href={"/users"}>Users</Link>
            </li>
          </>
        ) : null}
        <li className=" h-12 flex items-center p-1">
          <SignInButton />
        </li>
      </ul>
    </nav>
  );
};
export default NavMenu;
