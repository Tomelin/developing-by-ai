
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
import { DollarSign, Briefcase, Building, Layers } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { updateProfessionalProfile } from '@/lib/actions/profile.actions';
import { INDUSTRY_SECTORS } from '@/lib/constants';
import type { IndustrySector } from '@/lib/types';

const professionalProfileFormSchema = z.object({
  jobTitle: z.string().min(2, { message: 'Job title must be at least 2 characters.' }).max(100),
  company: z.string().min(2, { message: 'Company name must be at least 2 characters.' }).max(100),
  industrySector: z.string({ required_error: 'Please select an industry sector.' }) as z.ZodType<IndustrySector>,
  annualSalary: z.coerce.number().min(0, { message: 'Salary must be a positive number.' }).optional(),
});

export type ProfessionalProfileFormData = z.infer<typeof professionalProfileFormSchema>;

export function ProfessionalProfileForm() {
  const { toast } = useToast();
  const form = useForm<ProfessionalProfileFormData>({
    resolver: zodResolver(professionalProfileFormSchema),
    defaultValues: {
      jobTitle: '',
      company: '',
      industrySector: undefined,
      annualSalary: undefined,
    },
  });

  async function onSubmit(values: ProfessionalProfileFormData) {
    const result = await updateProfessionalProfile(values);
    if (result.success) {
      toast({
        title: 'Profile Updated',
        description: result.message,
      });
    } else {
      toast({
        title: 'Update Failed',
        description: result.message,
        variant: 'destructive',
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="jobTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Job Title</FormLabel>
              <FormControl>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="e.g., Software Engineer" className="pl-10" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company</FormLabel>
              <FormControl>
                <div className="relative">
                  <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="e.g., FiscalFlow Inc." className="pl-10" {...field} />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="industrySector"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Industry / Sector</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <Layers className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground hidden group-data-[state=open]:hidden group-focus:hidden" />
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {INDUSTRY_SECTORS.map((sector) => (
                    <SelectItem key={sector} value={sector}>
                      {sector}
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
          name="annualSalary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Annual Salary (Optional)</FormLabel>
              <FormControl>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    type="number" 
                    placeholder="e.g., 75000" 
                    className="pl-10" 
                    {...field} 
                    value={field.value ?? ''}
                    onChange={e => field.onChange(e.target.value === '' ? undefined : parseFloat(e.target.value))}
                  />
                </div>
              </FormControl>
              <FormDescription>Enter your gross annual salary.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Saving...' : 'Save Professional Info'}
        </Button>
      </form>
    </Form>
  );
}
