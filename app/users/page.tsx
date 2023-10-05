import { prisma } from "@/lib/prisma"
import UserCard from "../components/UserCard"


async function UsersPage() {

    const users = await prisma.user.findMany()

    return (
    <div className=" bg-slate-400 w-screen h-screen grid place-content-center">
    {users.map( user => <UserCard key={user.id} {...user}/>)}
    </div>
  )
}
export default UsersPage

