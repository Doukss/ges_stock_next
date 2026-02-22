import React from "react";
import { Invoice } from "@/app/type";
import Link from "next/link";
import {
  CheckCircle,
  Clock,
  FileText,
  SquareArrowOutUpRight,
  XCircle,
} from "lucide-react";

type InvoiceComponentProps = {
  invoice: Invoice | undefined;
  index: number;
};

const getStatusBadge = (status: number) => {
  switch (status) {
    case 1:
      return (
        <div className="badge badge-lg flex items-center gap-2">
          <FileText className="w-4 h-4" />
          Brouillon
        </div>
      );
    case 2:
      return (
        <div className="badge badge-lg flex items-center gap-2 badge-warning">
          <Clock className="w-4 h-4" />
          En attente
        </div>
      );
    case 3:
      return (
        <div className="badge badge-lg flex items-center gap-2 badge-success">
          <CheckCircle className="w-4 h-4" />
          payée
        </div>
      );
    case 4:
      return (
        <div className="badge badge-lg flex items-center gap-2 badge-info">
          <XCircle className="w-4 h-4" />
          Annuler
        </div>
      );
    case 5:
      return (
        <div className="badge badge-lg flex items-center gap-2 badge-error">
          <XCircle className="w-4 h-4" />
          Impayée
        </div>
      );
    default:
      return (
        <div className="badge badge-lg flex items-center gap-2">Inconnu</div>
      );
  }
};

const InvoiceComponent: React.FC<InvoiceComponentProps> = ({
  invoice,
  index,
}) => {
  const calculateTotal = () => {
    const totalHT =
      invoice?.lines.reduce((total, line) => {
        const quantity = line.quantity || 0;
        const unitPrice = line.unitPrice || 0;
        return total + line.unitPrice * line.quantity;
      }, 0) || 0;

    const totalTVA = invoice?.vatActive ? totalHT * (invoice.vatRate / 100) : 0;
    return totalHT + totalTVA;
  };

  if (!invoice) {
    return null;
  }

  return (
    <div className="bg-base-200/90 p-5 rounded-xl space-y-2 shadow">
      <div className="flex justify-between items-center w-full">
        <div>{getStatusBadge(invoice.status)}</div>
        <Link href={`/invoice/${index}`} className="btn btn-accent btn-sm">
          plus
          <SquareArrowOutUpRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="w-full">
        <div className="">
          <div className="stat-title">
            <div className="uppercase text-sm">FACT-{invoice.id}</div>
          </div>
          <div>
            <div className="stat-value">{calculateTotal().toFixed(2)} €</div>
          </div>
          <div className="stat-desc">
            {invoice.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvoiceComponent;
