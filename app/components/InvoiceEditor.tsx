"use client";

import React, { useState } from "react";
import { Invoice } from "@/app/type";
import InvoiceInfo from "./InvoiceInfo";
import { Trash } from "lucide-react";

interface InvoiceEditorProps {
  initialInvoice: Invoice | null;
}

const InvoiceEditor: React.FC<InvoiceEditorProps> = ({ initialInvoice }) => {
  const [invoice, setInvoice] = useState<Invoice | null>(initialInvoice);

  const handleSetInvoice = (newInvoice: Invoice | null) => {
    setInvoice(newInvoice);
  };

  

  return (
    <div>
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
        <div>
          <p className="badge badge-lg badge-ghost uppercase">
            <span>Facture-</span>
          </p>
        </div>
        <div className="flex md:mt-0 mt-4">
          <select className="select select-sm select-bordered w-full">
            <option value={1}>Brouillon</option>
            <option value={2}>En attente</option>
            <option value={3}>Payée</option>
            <option value={4}>Annuler</option>
            <option value={5}>Impayée</option>
          </select>

          <button className="btn btn-sm btn-accent ml-4">Sauvegarder</button>
          <button className="btn btn-sm btn-accent ml-2">
            <Trash className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3">
          <InvoiceInfo invoice={invoice} setInvoice={handleSetInvoice} />
        </div>
      </div>
    </div>
  );
};

export default InvoiceEditor;
