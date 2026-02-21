"use server";

import { randomBytes } from "crypto";
import prisma from "./lib/prisma";

export async function checAndAddUser(email: string, name: string) {
  if (!email) return;

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!existingUser) {
      await prisma.user.create({
        data: {
          email: email,
          name: name,
        },
      });
    }
  } catch (error) {
    console.error("Error checking for existing user:", error);
  }
}

const generateUniqueId = async () => {
  let uniqueId;
  let isUnique = false;
  while (!isUnique) {
    uniqueId = randomBytes(3).toString("hex");

    const existingInvoice = await prisma.invoice.findUnique({
      where: {
        Id: uniqueId,
      },
    });
    if (!existingInvoice) {
      isUnique = true;
    }
  }
  return uniqueId;
};
export async function CreateEmptyInvoice(email: string, name: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const invoiceId = generateUniqueId();
    const newInvoice = await prisma.invoice.create({
      data: {
        Id: invoiceId,
        userId: user?.id || "",
        status: "draft",
      },
    })
  } catch (error) {
    console.error("Error creating empty invoice:", error);
  }
}
