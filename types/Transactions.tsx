export interface Transaction {
  transactionType: string;
  title: string;
  value: number;
  paymentType: string;
  category: string;
}

export interface UniqueTransaction extends Transaction {
  transactionDate: Date;
}

export interface RecurringTransaction extends Transaction {
  startingDate: Date;
  endingDate: Date;
}
