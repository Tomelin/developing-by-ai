'use server';

import type { RegisterBankFormData } from '@/components/forms/register-bank-form';

interface ActionResult {
  success: boolean;
  message?: string;
}

export async function registerBankAccount(data: RegisterBankFormData): Promise<ActionResult> {
  console.log('Registering bank account:', data);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (data.bankName.toLowerCase().includes('testfail')) {
     return { success: false, message: 'Simulated failure: Bank name contained "testfail".' };
  }

  return { success: true, message: 'Bank account registered successfully.' };
}
