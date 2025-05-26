import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/page-header';
import { RegisterBankForm } from '@/components/forms/register-bank-form';
import { Landmark } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'FiscalFlow | Register Bank Account',
  description: 'Add a new bank account to your profile.',
};

export default function RegisterBankPage() {
  return (
    <>
      <PageHeader 
        title="Register New Bank Account"
        description="Enter the details of your bank account."
        icon={Landmark}
      />
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Bank Account Details</CardTitle>
          <CardDescription>Please fill out the form below to add a new bank account.</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterBankForm />
        </CardContent>
      </Card>
    </>
  );
}
