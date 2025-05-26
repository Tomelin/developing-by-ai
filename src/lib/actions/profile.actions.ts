
'use server';

import type { PersonalProfileFormData } from '@/components/forms/personal-profile-form';
import type { ProfessionalProfileFormData } from '@/components/forms/professional-profile-form';
import type { GoalsProfileFormData } from '@/components/forms/goals-profile-form';

interface ActionResult {
  success: boolean;
  message?: string;
}

export async function updatePersonalProfile(data: PersonalProfileFormData): Promise<ActionResult> {
  console.log('Updating personal profile:', data);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Simulate success/failure
  if (data.name.toLowerCase().includes('error')) {
    return { success: false, message: 'Simulated failure: Name contained "error".' };
  }
  return { success: true, message: 'Personal profile updated successfully.' };
}

export async function updateProfessionalProfile(data: ProfessionalProfileFormData): Promise<ActionResult> {
  console.log('Updating professional profile:', data);
  await new Promise(resolve => setTimeout(resolve, 1000));

  if (data.jobTitle.toLowerCase().includes('error')) {
     return { success: false, message: 'Simulated failure: Job title contained "error".' };
  }
  return { success: true, message: 'Professional profile updated successfully.' };
}

export async function updateGoalsProfile(data: GoalsProfileFormData): Promise<ActionResult> {
  console.log('Updating goals:', data);
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const allGoalDescriptions = [
    data.goal5_1.description, data.goal5_2.description, data.goal5_3.description,
    data.goal10_1.description, data.goal10_2.description, data.goal10_3.description
  ];

  // Example: Check if any goal description is too short (just for simulation)
  // Only validate if description is present and not empty.
  if (allGoalDescriptions.some(desc => desc && desc.length > 0 && desc.length < 5)) {
    return { success: false, message: 'Falha simulada: A descrição de uma das metas é muito curta (mínimo 5 caracteres).'}
  }
  
  // Example: Check if estimated value is negative (already handled by Zod, but good for server-side)
  const allGoalValues = [
    data.goal5_1.estimatedValue, data.goal5_2.estimatedValue, data.goal5_3.estimatedValue,
    data.goal10_1.estimatedValue, data.goal10_2.estimatedValue, data.goal10_3.estimatedValue,
  ];
  if (allGoalValues.some(value => value !== undefined && value < 0)) {
     return { success: false, message: 'Falha simulada: O valor estimado de uma meta não pode ser negativo.'}
  }


  return { success: true, message: 'Metas atualizadas com sucesso.' };
}
