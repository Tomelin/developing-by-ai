
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
  
  // Example: Check if any goal description is too short (just for simulation)
  const allGoals = [
    data.goal5_1, data.goal5_2, data.goal5_3,
    data.goal10_1, data.goal10_2, data.goal10_3
  ];
  if (allGoals.some(goal => goal && goal.length < 5)) {
    return { success: false, message: 'Simulated failure: One of the goals is too short.'}
  }

  return { success: true, message: 'Goals updated successfully.' };
}
