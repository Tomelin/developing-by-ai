
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { updateGoalsProfile } from '@/lib/actions/profile.actions';
import { Separator } from '@/components/ui/separator';

const goalsProfileFormSchema = z.object({
  goal5_1: z.string().max(500, "Goal is too long (max 500 chars)").optional(),
  goal5_2: z.string().max(500, "Goal is too long (max 500 chars)").optional(),
  goal5_3: z.string().max(500, "Goal is too long (max 500 chars)").optional(),
  goal10_1: z.string().max(500, "Goal is too long (max 500 chars)").optional(),
  goal10_2: z.string().max(500, "Goal is too long (max 500 chars)").optional(),
  goal10_3: z.string().max(500, "Goal is too long (max 500 chars)").optional(),
});

export type GoalsProfileFormData = z.infer<typeof goalsProfileFormSchema>;

export function GoalsProfileForm() {
  const { toast } = useToast();
  const form = useForm<GoalsProfileFormData>({
    resolver: zodResolver(goalsProfileFormSchema),
    defaultValues: {
      goal5_1: '',
      goal5_2: '',
      goal5_3: '',
      goal10_1: '',
      goal10_2: '',
      goal10_3: '',
    },
  });

  async function onSubmit(values: GoalsProfileFormData) {
    const result = await updateGoalsProfile(values);
    if (result.success) {
      toast({
        title: 'Goals Updated',
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Next 5 Years</h3>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="goal5_1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goal 1 (Next 5 Years)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your first major goal for the next 5 years..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="goal5_2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goal 2 (Next 5 Years)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your second major goal for the next 5 years..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="goal5_3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goal 3 (Next 5 Years)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your third major goal for the next 5 years..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-lg font-medium mb-4">Next 10 Years</h3>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="goal10_1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goal 1 (Next 10 Years)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your first major goal for the next 10 years..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="goal10_2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goal 2 (Next 10 Years)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your second major goal for the next 10 years..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="goal10_3"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Goal 3 (Next 10 Years)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe your third major goal for the next 10 years..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Saving...' : 'Save Goals'}
        </Button>
      </form>
    </Form>
  );
}
