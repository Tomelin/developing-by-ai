import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/page-header';
import { IncomeExpenseChart } from '@/components/dashboard/income-expense-chart';
import { NetWorthChart } from '@/components/dashboard/networth-chart';
import { ExpenseBreakdownChart } from '@/components/dashboard/expense-breakdown-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, PieChart, LayoutDashboard } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FiscalFlow | Dashboard',
  description: 'Overview of your financial health.',
};

export default function DashboardPage() {
  return (
    <>
      <PageHeader 
        title="Dashboard" 
        description="Welcome back! Here's your financial overview."
        icon={LayoutDashboard}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Income (Month)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5,350.00</div>
            <p className="text-xs text-muted-foreground">+10.2% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses (Month)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,130.50</div>
            <p className="text-xs text-muted-foreground">+5.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$125,780.00</div>
            <p className="text-xs text-muted-foreground">+2.5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Income vs. Expenses
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <IncomeExpenseChart />
          </CardContent>
        </Card>
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              Expense Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <ExpenseBreakdownChart />
          </CardContent>
        </Card>
         <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Net Worth Over Time
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <NetWorthChart />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
