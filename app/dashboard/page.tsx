import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import { prisma } from "@/lib/prisma"
import ProfileForm from "./ProfileForm"



export default async function DashBoard() {
  //protected route
  const session = await getServerSession(authOptions)
  
  if(!session){
    redirect('/api/auth/signin')
  }

  const userEmail = session.user?.email!

  const user = await prisma.user.findUnique({
    where: {
        email: userEmail
    }
  })

  return (
    <>
        <h2>DashBoard</h2>
        <ProfileForm user={user} />
    </>
    
  )
}