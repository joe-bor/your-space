import Link from "next/link";
import Image from "next/image";
import { SignInButton } from "./components/buttons";


const NavMenu = () => {
  return (
    <nav className=" flex bg-blue-400 text-white h-16 justify-between items-center">
        <Link href={'/'}>
            <Image
                src='/next.svg'
                width={216}
                height={30}
                alt="Next Logo"
                priority
            />
        </Link>
        <ul className=" list-none flex mr-4">
            <li className=" h-12 flex items-center p-1">
                <Link href={'about'}>About</Link>
            </li>
            <li className=" h-12 flex items-center p-1">
                <Link href={'/blog'}>Blog</Link>
            </li>
            <li className=" h-12 flex items-center p-1">
                <Link href={'/users'}>Users</Link>
            </li>
            <li className=" h-12 flex items-center p-1">
                <SignInButton/>
            </li>
        </ul>

    </nav>

  )
}
export default NavMenu