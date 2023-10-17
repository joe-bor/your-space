import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    // extract name, email, password from the request sent
    const data = await request.json();
    const { userEmail, userPassword } = data;

    // check if user already exist in the database
    const user = await prisma.user.findUnique({ where: { email: userEmail } });
    if (user) {
      throw new Error("Account with this email already exist");
    } else {
      const newUser = await prisma.user.create({
        data: {
          email: userEmail,
          password: userPassword,
        },
      });

      NextResponse.json(newUser);
    }
    // if not, create a new user using credentials provided
    // make sure password is hashed
    // return user
  } catch (error) {
    NextResponse.json({ error: "Error creating user" }, { status: 400 });
  }
}
