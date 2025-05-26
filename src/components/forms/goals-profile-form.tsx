
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
  FormDescription,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { updateGoalsProfile } from '@/lib/actions/profile.actions';
import { Separator } from '@/components/ui/separator';
import { DollarSign } from 'lucide-react';

const GoalSchema = z.object({
  description: z.string().max(500, "A descrição da meta é muito longa (máx. 500 caracteres)").optional().default(''),
  estimatedValue: z.coerce.number().positive({ message: "O valor estimado deve ser um número positivo." }).optional(),
});

const goalsProfileFormSchema = z.object({
  goal5_1: GoalSchema,
  goal5_2: GoalSchema,
  goal5_3: GoalSchema,
  goal10_1: GoalSchema,
  goal10_2: GoalSchema,
  goal10_3: GoalSchema,
});

export type GoalsProfileFormData = z.infer<typeof goalsProfileFormSchema>;

export function GoalsProfileForm() {
  const { toast } = useToast();
  const form = useForm<GoalsProfileFormData>({
    resolver: zodResolver(goalsProfileFormSchema),
    defaultValues: {
      goal5_1: { description: '', estimatedValue: undefined },
      goal5_2: { description: '', estimatedValue: undefined },
      goal5_3: { description: '', estimatedValue: undefined },
      goal10_1: { description: '', estimatedValue: undefined },
      goal10_2: { description: '', estimatedValue: undefined },
      goal10_3: { description: '', estimatedValue: undefined },
    },
  });

  async function onSubmit(values: GoalsProfileFormData) {
    const result = await updateGoalsProfile(values);
    if (result.success) {
      toast({
        title: 'Metas Atualizadas',
        description: result.message,
      });
    } else {
      toast({
        title: 'Falha na Atualização',
        description: result.message,
        variant: 'destructive',
      });
    }
  }

  const renderGoalFields = (period: "5" | "10", index: 1 | 2 | 3) => {
    const fieldName = `goal${period}_${index}` as keyof GoalsProfileFormData;
    return (
      <div key={fieldName} className="space-y-4 p-4 border rounded-md shadow-sm bg-card-foreground/5">
        <FormLabel className="text-base font-medium">Meta {index} (Próximos {period} Anos)</FormLabel>
        <FormField
          control={form.control}
          name={`${fieldName}.description`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição da Meta</FormLabel>
              <FormControl>
                <Textarea placeholder={`Descreva sua meta para os próximos ${period} anos...`} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`${fieldName}.estimatedValue`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valor Estimado (Opcional)</FormLabel>
              <FormControl>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="Ex: 5000"
                    className="pl-10"
                    {...field}
                    value={field.value ?? ''} // Handle undefined for display
                    onChange={e => field.onChange(e.target.value === '' ? undefined : parseFloat(e.target.value))}
                  />
                </div>
              </FormControl>
              <FormDescription>Custo ou valor estimado para alcançar esta meta.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-primary">Próximos 5 Anos</h3>
          <div className="space-y-6">
            {renderGoalFields("5", 1)}
            {renderGoalFields("5", 2)}
            {renderGoalFields("5", 3)}
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="text-xl font-semibold mb-4 text-primary">Próximos 10 Anos</h3>
          <div className="space-y-6">
            {renderGoalFields("10", 1)}
            {renderGoalFields("10", 2)}
            {renderGoalFields("10", 3)}
          </div>
        </div>

        <Button type="submit" disabled={form.formState.isSubmitting} size="lg">
          {form.formState.isSubmitting ? 'Salvando...' : 'Salvar Metas'}
        </Button>
      </form>
    </Form>
  );
}
