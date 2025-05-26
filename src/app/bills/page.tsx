import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/page-header';
import { BillsTable } from '@/components/bills/bills-table';
import { Button } from '@/components/ui/button';
import { PlusCircle, ListChecks } from 'lucide-react';
import Link from 'next/link';
import { MOCK_TRANSACTIONS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'FiscalFlow | Bills Overview',
  description: 'Manage your accounts payable and receivable.',
};

export default function BillsPage() {
  // In a real app, fetch data here
  const bills = MOCK_TRANSACTIONS;

  return (
    <>
      <PageHeader 
        title="Bills Overview"
        description="Keep track of your upcoming and past due bills."
        icon={ListChecks}
        actions={
          <Button asChild>
            <Link href="/transactions/record">
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Bill
            </Link>
          </Button>
        }
      />
      <BillsTable bills={bills} />
    </>
  );
}
