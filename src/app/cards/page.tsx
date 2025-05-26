import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { PlusCircle, CreditCard as CreditCardIcon } from 'lucide-react';
import Link from 'next/link';
import { MOCK_CREDIT_CARDS } from '@/lib/constants';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CreditCard } from '@/lib/types';

export const metadata: Metadata = {
  title: 'FiscalFlow | Credit Cards',
  description: 'Manage your registered credit cards.',
};

function CreditCardDisplay({ card }: { card: CreditCard }) {
  return (
    <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{card.name}</CardTitle>
            <CardDescription>{card.bankName || 'N/A'}</CardDescription>
          </div>
          <CreditCardIcon className="h-8 w-8 text-primary opacity-70" />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Last 4 Digits:</span>
          <span className="font-medium">**** {card.last4Digits}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Credit Limit:</span>
          <span className="font-medium">${card.creditLimit.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Closing Day:</span>
          <span className="font-medium">{card.statementClosingDay}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Due Day:</span>
          <span className="font-medium">{card.paymentDueDay}</span>
        </div>
        {card.interestRate !== undefined && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Interest Rate:</span>
            <span className="font-medium">{card.interestRate}% APR</span>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" size="sm" className="w-full">Manage Card</Button>
      </CardFooter>
    </Card>
  );
}

export default function CreditCardsPage() {
  // In a real app, fetch data here
  const cards = MOCK_CREDIT_CARDS;

  return (
    <>
      <PageHeader 
        title="Credit Cards"
        description="View and manage your registered credit cards."
        icon={CreditCardIcon}
        actions={
          <Button asChild>
            <Link href="/cards/register">
              <PlusCircle className="mr-2 h-4 w-4" /> Register New Card
            </Link>
          </Button>
        }
      />
      {cards.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cards.map(card => (
            <CreditCardDisplay key={card.id} card={card} />
          ))}
        </div>
      ) : (
        <Card className="flex flex-col items-center justify-center py-12">
          <CardHeader>
            <CreditCardIcon className="h-16 w-16 text-muted-foreground mb-4" />
            <CardTitle>No Credit Cards Registered</CardTitle>
            <CardDescription>Start by registering your credit cards to manage them effectively.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/cards/register">
                <PlusCircle className="mr-2 h-4 w-4" /> Register First Card
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
}
