import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(request: Request) {
    const users = await prisma.user.findMany()
    console.log(users)

    return NextResponse.json(users)
}

export async function PUT(request: Request){
    // access user in the server!
    // so clients can't send a request with a different credentials
    const session = await getServerSession(authOptions)

    // access req.body ( which was submitted through the form )
    const data = await request.json()
    data.age = Number(data.age) //parse to number because database expects a number

    //!TODO: create validation to ensure data is what the DB is expecting
    const user = await prisma.user.update({
        where: {
            email: session?.user?.email!
        },
        data
    })
    console.log(user)
    return NextResponse.json(user)

}