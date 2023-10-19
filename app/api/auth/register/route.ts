import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";

export async function POST(request: Request) {
  try {
    // extract name, email, password from the request sent
    const { email, password } = await request.json();
    const hashedPassword = await hash(password, 10);

    // check if user already exist in the database
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (user) {
      throw new Error("Account with this email already exist");
    } else {
      const newUser = await prisma.user.create({
        data: {
          email: email,
          password: hashedPassword,
        },
      });
      return NextResponse.json(newUser);
    }
    // if not, create a new user using credentials provided
    // make sure password is hashed
    // return user
  } catch (error) {
    return NextResponse.json({ error: "Error creating user" }, { status: 400 });
  }
}
