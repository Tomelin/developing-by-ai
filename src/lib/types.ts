import type { LucideIcon } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
}

export type TransactionType = 'payable' | 'receivable';
export type TransactionCategory = 'Salary' | 'Food' | 'Transport' | 'Housing' | 'Bills' | 'Entertainment' | 'Shopping' | 'Health' | 'Education' | 'Investment' | 'Gift' | 'Other';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  dueDate: Date;
  category: TransactionCategory;
  isRecurring: boolean;
  recurrenceMonths?: number;
  status: 'Pending' | 'Paid' | 'Overdue'; 
}

export interface CreditCard {
  id: string;
  name: string; // e.g., "Nubank Platinum" or "My Travel Card"
  bankName?: string;
  last4Digits: string;
  creditLimit: number;
  statementClosingDay: number; // Day of the month
  paymentDueDay: number; // Day of the month
  interestRate?: number; // Annual percentage rate (APR)
}

export type BankAccountType = 'Checking' | 'Savings' | 'Investment' | 'Other';

export interface BankAccount {
  id: string;
  bankName: string;
  accountNickname: string;
  accountType: BankAccountType;
  initialBalance: number;
  currentBalance?: number; // Optional, could be calculated
}
