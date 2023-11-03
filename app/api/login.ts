import { PrismaClient } from "@prisma/client";
import { env } from "process";
import * as jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();
const secret = env.JWT_SECRET || "";

export async function POST(request: Request) {
  const params = (await request.json()) as {
    username: string;
    password: string;
  };

  const user = await prisma.user.findFirst({
    where: {
      username: {
        equals: params.username,
      },
    },
  });

  if (user?.password === params.password) {
    const token = jwt.sign(
      {
        id: user.id,
      },
      secret,
      { expiresIn: "1h" },
    );

    return NextResponse.json({ token }, { status: 201 });
  } else {
    return NextResponse.json(
      { err: "Invalid Username or Password" },
      { status: 400 },
    );
  }
}
