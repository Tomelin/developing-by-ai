import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/page-header';
import { RecordTransactionForm } from '@/components/forms/record-transaction-form';
import { PlusCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'FiscalFlow | Record Transaction',
  description: 'Add a new payable or receivable account.',
};

export default function RecordTransactionPage() {
  return (
    <>
      <PageHeader 
        title="Record New Transaction" 
        description="Enter the details of your new income or expense."
        icon={PlusCircle}
      />
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Transaction Details</CardTitle>
          <CardDescription>Please fill out the form below to add a new transaction.</CardDescription>
        </CardHeader>
        <CardContent>
          <RecordTransactionForm />
        </CardContent>
      </Card>
    </>
  );
}
