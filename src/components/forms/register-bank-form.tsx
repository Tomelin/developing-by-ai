'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { DollarSign } from 'lucide-react';
import { BANK_ACCOUNT_TYPES, COMMON_BANK_NAMES } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';
import { registerBankAccount } from '@/lib/actions/bank.actions';

const formSchema = z.object({
  bankName: z.string({ required_error: 'Please select a bank name.' }),
  accountNickname: z.string().min(2, { message: 'Account nickname must be at least 2 characters.' }).max(50),
  accountType: z.string({ required_error: 'Please select an account type.' }),
  initialBalance: z.coerce.number().min(0, { message: 'Initial balance cannot be negative.' }),
});

export type RegisterBankFormData = z.infer<typeof formSchema>;

export function RegisterBankForm() {
  const { toast } = useToast();
  const form = useForm<RegisterBankFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bankName: undefined,
      accountNickname: '',
      accountType: undefined,
      initialBalance: 0,
    },
  });

 async function onSubmit(values: RegisterBankFormData) {
    // console.log(values); // For testing
    const result = await registerBankAccount(values);
    if (result.success) {
      toast({
        title: "Bank Account Registered",
        description: `Successfully registered account "${values.accountNickname}".`,
      });
      form.reset();
    } else {
      toast({
        title: "Error",
        description: result.message || "Could not register bank account.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Name</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a bank" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {COMMON_BANK_NAMES.map((bank) => (
                      <SelectItem key={bank} value={bank}>
                        {bank}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="accountNickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Nickname</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Main Checking, Vacation Savings" {...field} />
                </FormControl>
                <FormDescription>A name to easily identify this account.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="accountType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select account type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {BANK_ACCOUNT_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="initialBalance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Initial Balance</FormLabel>
                <FormControl>
                   <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type="number" placeholder="0.00" className="pl-8" {...field} />
                  </div>
                </FormControl>
                <FormDescription>Current balance if adding an existing account.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full md:w-auto" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Registering...' : 'Register Bank Account'}
        </Button>
      </form>
    </Form>
  );
}
