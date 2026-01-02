"use server";

import { prisma } from "./lib/prisma";

export async function checAndAddAssociation(email: string, firstName: string) {
  if (!email) return;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    await prisma.user.create({
      data: {
        email,
        name: firstName,
      },
    });
  }
}
