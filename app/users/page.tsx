import { prisma } from "@/lib/prisma";
import UserCard from "../components/UserCard";

async function UsersPage() {
  const users = await prisma.user.findMany();

  return (
    <div className=" bg-slate-400 w-screen h-screen flex flex-row flex-wrap items-center justify-center gap-10">
      {users.map((user) => (
        <UserCard key={user.id} {...user} />
      ))}
    </div>
  );
}
export default UsersPage;
