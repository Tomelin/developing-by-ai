'use client';

import type { Transaction } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ArrowDownUp } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';

interface BillsTableProps {
  bills: Transaction[];
}

type SortKey = keyof Transaction | '';
type SortOrder = 'asc' | 'desc';

export function BillsTable({ bills: initialBills }: BillsTableProps) {
  const [bills, setBills] = React.useState<Transaction[]>(initialBills);
  const [sortKey, setSortKey] = React.useState<SortKey>('dueDate');
  const [sortOrder, setSortOrder] = React.useState<SortOrder>('asc');

  const sortedBills = React.useMemo(() => {
    let sortableItems = [...bills];
    if (sortKey) {
      sortableItems.sort((a, b) => {
        const valA = a[sortKey as keyof Transaction];
        const valB = b[sortKey as keyof Transaction];

        if (valA === undefined || valB === undefined) return 0;
        
        let comparison = 0;
        if (valA > valB) {
          comparison = 1;
        } else if (valA < valB) {
          comparison = -1;
        }
        return sortOrder === 'desc' ? comparison * -1 : comparison;
      });
    }
    return sortableItems;
  }, [bills, sortKey, sortOrder]);

  const requestSort = (key: SortKey) => {
    let direction: SortOrder = 'asc';
    if (sortKey === key && sortOrder === 'asc') {
      direction = 'desc';
    }
    setSortKey(key);
    setSortOrder(direction);
  };

  const getSortIndicator = (key: SortKey) => {
    if (sortKey === key) {
      return sortOrder === 'asc' ? '↑' : '↓';
    }
    return <ArrowDownUp className="h-3 w-3 opacity-50" />;
  };
  
  const getStatusBadgeVariant = (status: Transaction['status']): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'Paid':
        return 'default'; // Greenish in some themes, or primary
      case 'Pending':
        return 'secondary'; // Yellowish/Orange
      case 'Overdue':
        return 'destructive'; // Reddish
      default:
        return 'outline';
    }
  };


  return (
    <div className="rounded-md border shadow-sm bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => requestSort('description')}>
              <div className="flex items-center gap-1">Description {getSortIndicator('description')}</div>
            </TableHead>
            <TableHead className="cursor-pointer hover:bg-muted/50 text-right" onClick={() => requestSort('amount')}>
               <div className="flex items-center justify-end gap-1">Amount {getSortIndicator('amount')}</div>
            </TableHead>
            <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => requestSort('type')}>
               <div className="flex items-center gap-1">Type {getSortIndicator('type')}</div>
            </TableHead>
            <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => requestSort('dueDate')}>
               <div className="flex items-center gap-1">Due Date {getSortIndicator('dueDate')}</div>
            </TableHead>
            <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => requestSort('category')}>
               <div className="flex items-center gap-1">Category {getSortIndicator('category')}</div>
            </TableHead>
            <TableHead className="cursor-pointer hover:bg-muted/50" onClick={() => requestSort('status')}>
               <div className="flex items-center gap-1">Status {getSortIndicator('status')}</div>
            </TableHead>
            <TableHead><span className="sr-only">Actions</span></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedBills.map((bill) => (
            <TableRow key={bill.id}>
              <TableCell className="font-medium">{bill.description}</TableCell>
              <TableCell className={cn("text-right", bill.type === 'receivable' ? 'text-green-600' : 'text-red-600')}>
                {bill.type === 'receivable' ? '+' : '-'}${bill.amount.toFixed(2)}
              </TableCell>
              <TableCell>
                <Badge variant={bill.type === 'receivable' ? 'outline' : 'secondary'} 
                       className={cn(bill.type === 'receivable' ? 'border-green-500 text-green-700' : 'border-red-500 text-red-700', 
                                      'dark:border-green-400 dark:text-green-400', 
                                      bill.type === 'payable' && 'dark:border-red-400 dark:text-red-400' )}>
                  {bill.type}
                </Badge>
              </TableCell>
              <TableCell>{new Date(bill.dueDate).toLocaleDateString()}</TableCell>
              <TableCell>{bill.category}</TableCell>
              <TableCell>
                <Badge variant={getStatusBadgeVariant(bill.status)}>{bill.status}</Badge>
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <DotsHorizontalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => console.log('Mark as paid', bill.id)}>Mark as Paid</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log('Edit bill', bill.id)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => console.log('Delete bill', bill.id)} className="text-destructive focus:text-destructive focus:bg-destructive/10">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
