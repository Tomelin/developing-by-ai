import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { PlusCircle, Landmark as LandmarkIcon } from 'lucide-react';
import Link from 'next/link';
import { MOCK_BANK_ACCOUNTS } from '@/lib/constants';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BankAccount } from '@/lib/types';

export const metadata: Metadata = {
  title: 'FiscalFlow | Bank Accounts',
  description: 'Manage your registered bank accounts.',
};

function BankAccountDisplay({ account }: { account: BankAccount }) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{account.accountNickname}</CardTitle>
            <CardDescription>{account.bankName} - {account.accountType}</CardDescription>
          </div>
          <LandmarkIcon className="h-8 w-8 text-primary opacity-70" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Initial Balance:</span>
          <span className="font-medium">${account.initialBalance.toLocaleString()}</span>
        </div>
        {account.currentBalance !== undefined && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Current Balance:</span>
            <span className="font-bold">${account.currentBalance.toLocaleString()}</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">View Transactions</Button>
      </CardFooter>
    </Card>
  );
}

export default function BankAccountsPage() {
  // In a real app, fetch data here
  const accounts = MOCK_BANK_ACCOUNTS;

  return (
    <>
      <PageHeader 
        title="Bank Accounts"
        description="View and manage your registered bank accounts."
        icon={LandmarkIcon}
        actions={
          <Button asChild>
            <Link href="/banks/register">
              <PlusCircle className="mr-2 h-4 w-4" /> Register New Account
            </Link>
          </Button>
        }
      />
      {accounts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {accounts.map(account => (
            <BankAccountDisplay key={account.id} account={account} />
          ))}
        </div>
      ) : (
         <Card className="flex flex-col items-center justify-center py-12">
          <CardHeader>
            <LandmarkIcon className="h-16 w-16 text-muted-foreground mb-4" />
            <CardTitle>No Bank Accounts Registered</CardTitle>
            <CardDescription>Get started by adding your bank accounts.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/banks/register">
                <PlusCircle className="mr-2 h-4 w-4" /> Register First Account
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
}
