"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "./components/Wrapper";
import Image from "next/image";
import { PackagePlus } from "lucide-react";
import { CreateEmptyInvoice, getInvoicesByEmail } from "./actions";
import { useUser } from "@clerk/nextjs";
import confetti from "canvas-confetti";
import { Invoice } from "./type";
import InvoiceComponent from "./components/InvoiceComponent";

export default function Home() {
  const { user } = useUser();
  const [invoiceName, setInvoiceName] = useState("");
  const [isNameValid, setIsNameValid] = useState(true);
  const email = user?.primaryEmailAddress?.emailAddress as string;

  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const fetchInvoices = async () => {
    try {
      const data = await getInvoicesByEmail(email);
      if (data) {
        setInvoices(data);
      }
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [email]);

  useEffect(() => {
    setIsNameValid(invoiceName.length <= 60);
  }, [invoiceName]);

  const handleCreateInvoice = async () => {
    try {
      if (email) {
        await CreateEmptyInvoice(email, invoiceName);
      }

      fetchInvoices();
      setInvoiceName("");
      const modal = document.getElementById("my_modal_3") as HTMLDialogElement;
      if (modal) {
        modal.close();
      }

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        zIndex: 9999,
      });
    } catch (error) {
      console.error("Error creating invoice:", error);
    }
  };

  return (
    <Wrapper>
      <div className="flex flex-col space-y-4">
        <h1 className="text-lg font-bold">Mes factures</h1>

        <div className="grid md:grid-cols-3 gap-4">
          <div
            className="cursor-pointer border border-accent rounded-lg flex flex-col items-center p-5"
            onClick={() =>
              (
                document.getElementById("my_modal_3") as HTMLDialogElement
              ).showModal()
            }
          >
            <div className="font-bold">Créer une facture</div>
            <div className=" bg-accent rounded-full p-2">
              <PackagePlus className="h-6 w-6" />
            </div>
          </div>

          {/* liste des factures */}
          {invoices.length > 0 &&
            invoices.map((invoice, index) => (
              <div key={index}>
                <InvoiceComponent invoice={invoice} index={index} />
              </div>
            ))}
        </div>

        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Nouvelle facture</h3>
            <input
              type="text"
              placeholder="Nom de la facture"
              className="input input-bordered w-full my-4"
              value={invoiceName}
              onChange={(e) => setInvoiceName(e.target.value)}
            />
            {!isNameValid && (
              <p className="text-red-500 text-sm">
                Le nom ne peut pas depassé 60 caractères.
              </p>
            )}

            <button
              className="btn btn-primary"
              disabled={!isNameValid || invoiceName.trim() === ""}
              onClick={handleCreateInvoice}
            >
              Créer
            </button>
          </div>
        </dialog>
      </div>
    </Wrapper>
  );
}
