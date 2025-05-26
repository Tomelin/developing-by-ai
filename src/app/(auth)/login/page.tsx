
import type { Metadata } from 'next';
import Link from 'next/link';
import { LoginForm } from '@/components/forms/login-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { LogIn } from 'lucide-react';

export const metadata: Metadata = {
  title: 'FiscalFlow | Login',
  description: 'Login to your FiscalFlow account.',
};

export default function LoginPage() {
  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <LogIn className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="text-2xl">Welcome Back!</CardTitle>
        <CardDescription>Sign in to continue to FiscalFlow.</CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="font-medium text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
