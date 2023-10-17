import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    // extract name, email, password from the request sent
    const data = await request.json();
    const { email, password } = data;
    console.log(data);

    // check if user already exist in the database
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (user) {
      throw new Error("Account with this email already exist");
    } else {
      const newUser = await prisma.user.create({
        data: {
          email: email,
          password: password,
        },
      });
      return NextResponse.json({ message: "User created" });
    }
    // if not, create a new user using credentials provided
    // make sure password is hashed
    // return user
  } catch (error) {
    return NextResponse.json({ error: "Error creating user" }, { status: 400 });
  }
}
