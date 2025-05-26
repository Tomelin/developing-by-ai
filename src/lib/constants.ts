import type { NavItem, TransactionCategory, BankAccountType } from '@/lib/types';
import { LayoutDashboard, ListChecks, PlusCircle, CreditCard, Landmark, Settings } from 'lucide-react';

export const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { id: 'bills', label: 'Bills Overview', href: '/bills', icon: ListChecks },
  { id: 'record-transaction', label: 'Record Transaction', href: '/transactions/record', icon: PlusCircle },
  { id: 'register-card', label: 'Credit Cards', href: '/cards', icon: CreditCard },
  { id: 'register-bank', label: 'Bank Accounts', href: '/banks', icon: Landmark },
  // { id: 'settings', label: 'Settings', href: '/settings', icon: Settings }, // Example for future expansion
];

export const TRANSACTION_CATEGORIES: TransactionCategory[] = [
  'Salary', 'Food', 'Transport', 'Housing', 'Bills', 'Entertainment', 'Shopping', 'Health', 'Education', 'Investment', 'Gift', 'Other'
];

export const BANK_ACCOUNT_TYPES: BankAccountType[] = [
  'Checking', 'Savings', 'Investment', 'Other'
];

export const MONTHS_OPTIONS = Array.from({ length: 12 }, (_, i) => ({
  value: (i + 1).toString(),
  label: `${i + 1} Month${i === 0 ? '' : 's'}`,
}));

export const DAY_OF_MONTH_OPTIONS = Array.from({ length: 31 }, (_, i) => ({
  value: (i + 1).toString(),
  label: (i + 1).toString(),
}));

export const MOCK_TRANSACTIONS: import('./types').Transaction[] = [
  { id: '1', description: 'Monthly Salary', amount: 5000, type: 'receivable', dueDate: new Date(2024, 6, 5), category: 'Salary', isRecurring: true, recurrenceMonths: 12, status: 'Pending' },
  { id: '2', description: 'Rent Payment', amount: 1200, type: 'payable', dueDate: new Date(2024, 6, 1), category: 'Housing', isRecurring: true, recurrenceMonths: 12, status: 'Pending' },
  { id: '3', description: 'Groceries', amount: 150, type: 'payable', dueDate: new Date(2024, 6, 10), category: 'Food', isRecurring: false, status: 'Paid' },
  { id: '4', description: 'Internet Bill', amount: 60, type: 'payable', dueDate: new Date(2024, 5, 20), category: 'Bills', isRecurring: true, recurrenceMonths: 1, status: 'Overdue' },
  { id: '5', description: 'Freelance Project X', amount: 800, type: 'receivable', dueDate: new Date(2024, 6, 15), category: 'Other', isRecurring: false, status: 'Pending' },
];

export const MOCK_CREDIT_CARDS: import('./types').CreditCard[] = [
 { id: 'cc1', name: 'Visa Gold', bankName: 'MyBank', last4Digits: '1234', creditLimit: 10000, statementClosingDay: 20, paymentDueDay: 15, interestRate: 18.9 },
 { id: 'cc2', name: 'Mastercard Black', bankName: 'Global Credit', last4Digits: '5678', creditLimit: 25000, statementClosingDay: 5, paymentDueDay: 28, interestRate: 12.5 },
];

export const MOCK_BANK_ACCOUNTS: import('./types').BankAccount[] = [
  { id: 'ba1', bankName: 'First National', accountNickname: 'Main Checking', accountType: 'Checking', initialBalance: 5000, currentBalance: 4500 },
  { id: 'ba2', bankName: 'Savings United', accountNickname: 'Emergency Fund', accountType: 'Savings', initialBalance: 20000, currentBalance: 20100 },
];
