import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(request: Request) {
	const { username, password }: { username: string; password: string } =
		await request.json();

	const user = await prisma.user.create({
		data: {
			username,
			password,
		},
	});

	return Response.json({ id: user.id, username: user.username });
}
