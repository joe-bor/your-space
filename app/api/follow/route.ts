import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse, NextRequest } from "next/server";


export async function POST(req: Request){
    // grab current logged in user
    const session = await getServerSession(authOptions)
    const currentUserEmail = session?.user?.email!
    // extract user id to be followed ( sent via request object )
    const { targetUserId } = await req.json() 

    // get current user id by querying db
    const currentUserId = await prisma.user
        .findUnique({where: { email: currentUserEmail }})
        .then( user => user?.id!)

    // create a new data in Follows model using the info above
    const record = await prisma.follows.create({
        data: {
            followerId: currentUserId,
            followingId: targetUserId
        }
    })

    return NextResponse.json(record)
}


export async function DELETE(req: NextRequest) {
    const session = await getServerSession(authOptions)
    const currentUserEmail = session?.user?.email!
    const currentUserId = await prisma.user
     .findUnique({ where: { email: currentUserEmail }})
     .then( user => user?.id!)

    // https://nextjs.org/docs/app/api-reference/functions/next-request#nexturl
    const targetUserId = req.nextUrl.searchParams.get("targetUserId")

    // delete record in the db using prisma
    const record = await prisma.follows.delete({
        where: {
            followerId_followingId: {
                followerId: currentUserId,
                followingId: targetUserId!
            }
        }
    })

    return NextResponse.json(record)



}