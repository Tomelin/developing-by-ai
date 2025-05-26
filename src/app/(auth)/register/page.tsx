
import type { Metadata } from 'next';
import Link from 'next/link';
import { RegisterForm } from '@/components/forms/register-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { UserPlus } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FiscalFlow | Register',
  description: 'Create a new FiscalFlow account.',
};

export default function RegisterPage() {
  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <UserPlus className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="text-2xl">Create an Account</CardTitle>
        <CardDescription>Join FiscalFlow to manage your finances efficiently.</CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/auth/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
