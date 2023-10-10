import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import FollowClient from "./FollowClient"


interface Props {
    targetUserId: string
}

export default async function FollowButton({ targetUserId }: Props) {
    // grab logged in user's id
    const session = await getServerSession(authOptions)

    const currentUserId = await prisma.user
      .findUnique({ where: { email: session?.user?.email! }})
      .then( user => user?.id!)

    // check if logged in user is already following the target user
    const isFollowing = await prisma.follows.findFirst({
        where: { followerId: currentUserId, followingId: targetUserId }
    })

  return (
    <FollowClient targetUserId={targetUserId} isFollowing={!!isFollowing} />
  )
}