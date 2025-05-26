'use server';

import type { RecordTransactionFormData } from '@/components/forms/record-transaction-form';

interface ActionResult {
  success: boolean;
  message?: string;
}

export async function recordTransaction(data: RecordTransactionFormData): Promise<ActionResult> {
  console.log('Recording transaction:', data);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate success/failure
  if (data.description.toLowerCase().includes('fail')) {
    return { success: false, message: 'Simulated failure: Description contained "fail".' };
  }

  return { success: true, message: 'Transaction recorded successfully.' };
}
