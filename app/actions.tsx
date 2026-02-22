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
        id: uniqueId,
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

    const invoiceId = await generateUniqueId();
    if (user) {
      const newInvoice = await prisma.invoice.create({
        data: {
          id: invoiceId,
          name: name,
          userId: user.id,
          issuerName: "",
          issuerAddress: "",
          clientName: "",
          clientAddress: "",
          invoiceDate: "",
          dueDate: "",
          vatActive: false,
          vatRate: 20,
        },
      });
    }
  } catch (error) {
    console.error("Error creating empty invoice:", error);
  }
}

export async function getInvoicesByEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        invoices: {
          include: {
            lines: true,
          }
        }
      }
    })
    if (user) {
      const today = new Date();

      const updatedInvoices = await Promise.all(
        user.invoices.map( async (invoice) => {
        const dueDate = new Date(invoice.dueDate);
        if (
          dueDate < today && 
          invoice.status == 2
        ){
          const updatedInvoice = await prisma.invoice.update({
            where: {
              id: invoice.id,
            },
            data: {
              status: 3,
            },
            include: {
              lines: true,
            }
          })
          return updatedInvoice;
        }
        return invoice;
      })
      )
      return updatedInvoices;
      
      
    }
    
  } catch (error) {
    console.error("Error fetching invoices by email:", error);
    return [];
    
  }
}
