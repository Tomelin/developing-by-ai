import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/page-header';
import { RegisterCardForm } from '@/components/forms/register-card-form';
import { CreditCard } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'FiscalFlow | Register Credit Card',
  description: 'Add a new credit card to your account.',
};

export default function RegisterCardPage() {
  return (
    <>
      <PageHeader 
        title="Register New Credit Card"
        description="Enter the details of your credit card."
        icon={CreditCard}
      />
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Credit Card Details</CardTitle>
          <CardDescription>Please fill out the form below to add a new credit card.</CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterCardForm />
        </CardContent>
      </Card>
    </>
  );
}
