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
import { DollarSign, Percent } from 'lucide-react';
import { DAY_OF_MONTH_OPTIONS } from '@/lib/constants';
import { useToast } from '@/hooks/use-toast';
import { registerCreditCard } from '@/lib/actions/card.actions';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Card name must be at least 2 characters.' }).max(50),
  bankName: z.string().max(50).optional(),
  last4Digits: z.string().length(4, { message: 'Must be 4 digits.' }).regex(/^\d{4}$/, { message: "Must be 4 digits."}),
  creditLimit: z.coerce.number().positive({ message: 'Credit limit must be positive.' }),
  statementClosingDay: z.coerce.number().int().min(1).max(31, { message: 'Day must be between 1 and 31.' }),
  paymentDueDay: z.coerce.number().int().min(1).max(31, { message: 'Day must be between 1 and 31.' }),
  interestRate: z.coerce.number().min(0).max(100).optional(),
});

export type RegisterCardFormData = z.infer<typeof formSchema>;

export function RegisterCardForm() {
  const { toast } = useToast();
  const form = useForm<RegisterCardFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      bankName: '',
      last4Digits: '',
      creditLimit: undefined,
      statementClosingDay: undefined,
      paymentDueDay: undefined,
      interestRate: undefined,
    },
  });

  async function onSubmit(values: RegisterCardFormData) {
    // console.log(values); // For testing
    const result = await registerCreditCard(values);
     if (result.success) {
      toast({
        title: "Credit Card Registered",
        description: `Successfully registered card "${values.name}".`,
      });
      form.reset();
    } else {
      toast({
        title: "Error",
        description: result.message || "Could not register credit card.",
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
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Card Nickname</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., My Travel Card" {...field} />
                </FormControl>
                <FormDescription>A name to easily identify this card.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bank Name (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Fiscal Bank" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="last4Digits"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last 4 Digits</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="1234" maxLength={4} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="creditLimit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Credit Limit</FormLabel>
                <FormControl>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input type="number" placeholder="5000" className="pl-8" {...field} />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="statementClosingDay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Statement Closing Day</FormLabel>
                 <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {DAY_OF_MONTH_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Day of the month statement closes.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentDueDay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Due Day</FormLabel>
                 <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {DAY_OF_MONTH_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Day of the month payment is due.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
            control={form.control}
            name="interestRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interest Rate (APR %)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input type="number" placeholder="18.9" step="0.1" className="pr-8" {...field} 
                           value={field.value ?? ''}
                           onChange={e => field.onChange(e.target.value === '' ? undefined : parseFloat(e.target.value))}
                    />
                    <Percent className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </FormControl>
                <FormDescription>Annual Percentage Rate (optional).</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

        <Button type="submit" className="w-full md:w-auto" disabled={form.formState.isSubmitting}>
           {form.formState.isSubmitting ? 'Registering...' : 'Register Card'}
        </Button>
      </form>
    </Form>
  );
}
