
'use server';

import type { z } from 'zod';
import type { LoginFormSchema } from '@/components/forms/login-form';
import type { RegisterFormSchema } from '@/components/forms/register-form';

interface AuthActionResult {
  success: boolean;
  message: string;
  user?: { id: string; email: string | null }; // Basic user info
}

// Mock function to simulate email/password sign-up
export async function signUpWithEmailPassword(data: z.infer<typeof RegisterFormSchema>): Promise<AuthActionResult> {
  console.log('Attempting to sign up with:', data.email);
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

  if (data.email === 'test@example.com') {
    return { success: false, message: 'This email is already registered (simulated).' };
  }
  if (data.password !== data.confirmPassword) {
    return { success: false, message: 'Passwords do not match.'}
  }

  // In a real app, you would use Firebase Admin SDK or client SDK to create user
  return {
    success: true,
    message: 'Registration successful! Please log in.',
    user: { id: 'mock-user-id-' + Date.now(), email: data.email },
  };
}

// Mock function to simulate email/password sign-in
export async function signInWithEmailPassword(data: z.infer<typeof LoginFormSchema>): Promise<AuthActionResult> {
  console.log('Attempting to sign in with:', data.email);
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

  if (data.email === 'user@example.com' && data.password === 'password123') {
    // In a real app, you would verify credentials with Firebase
    return {
      success: true,
      message: 'Login successful!',
      user: { id: 'mock-user-id-123', email: data.email },
    };
  }
  return { success: false, message: 'Invalid email or password (simulated).' };
}

// Mock function to simulate Google Sign-In
export async function signInWithGoogle(): Promise<AuthActionResult> {
  console.log('Attempting Google Sign-In...');
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

  // In a real app, this would involve Firebase client-side SDK for popup/redirect
  // and potentially exchanging token on server if needed.
  // For simulation, we'll assume it's successful.
  return {
    success: true,
    message: 'Google Sign-In successful!',
    user: { id: 'mock-google-user-id-' + Date.now(), email: 'googleuser@example.com' },
  };
}

// Mock function to simulate sign-out
export async function signOutUser(): Promise<AuthActionResult> {
  console.log('Signing out user...');
  await new Promise(resolve => setTimeout(resolve, 500));
  // In a real app, you would call Firebase signOut method.
  return { success: true, message: 'Signed out successfully.' };
}
