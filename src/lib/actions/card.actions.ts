'use server';

import type { RegisterCardFormData } from '@/components/forms/register-card-form';

interface ActionResult {
  success: boolean;
  message?: string;
}

export async function registerCreditCard(data: RegisterCardFormData): Promise<ActionResult> {
  console.log('Registering credit card:', data);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (data.name.toLowerCase().includes('errorcard')) {
     return { success: false, message: 'Simulated failure: Card name contained "errorcard".' };
  }
  
  return { success: true, message: 'Credit card registered successfully.' };
}
