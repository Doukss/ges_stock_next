export interface InvoiceLine {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  invoiceId: string | null;
}

export interface Invoice {
  id: string;
  name: string;
  issuerName: string;
  issuerAddress: string;
  clientName: string;
  clientAddress: string;
  invoiceDate: string;
  dueDate: string;
  vatActive: boolean;
  vatRate: number;
  status: number;
  userId: string;
  lines: InvoiceLine[];
}

export interface Totals {
  totalHT: number;
  totalVAT: number;
  totalTTC: number;
}
