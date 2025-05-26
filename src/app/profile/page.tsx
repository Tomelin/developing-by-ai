
import type { Metadata } from 'next';
import { PageHeader } from '@/components/shared/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UserCircle, Briefcase, Target } from 'lucide-react';
import { PersonalProfileForm } from '@/components/forms/personal-profile-form';
import { ProfessionalProfileForm } from '@/components/forms/professional-profile-form';
import { GoalsProfileForm } from '@/components/forms/goals-profile-form';

export const metadata: Metadata = {
  title: 'FiscalFlow | User Profile',
  description: 'Manage your personal, professional, and financial goals information.',
};

export default function ProfilePage() {
  return (
    <>
      <PageHeader
        title="User Profile"
        description="Manage your account details and preferences."
        icon={UserCircle}
      />

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-3 mb-6">
          <TabsTrigger value="personal" className="flex items-center gap-2">
            <UserCircle className="h-5 w-5" /> Personal Info
          </TabsTrigger>
          <TabsTrigger value="professional" className="flex items-center gap-2">
            <Briefcase className="h-5 w-5" /> Professional Details
          </TabsTrigger>
          <TabsTrigger value="goals" className="flex items-center gap-2">
            <Target className="h-5 w-5" /> Goals
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your personal details. Your email is linked to your account.</CardDescription>
            </CardHeader>
            <CardContent>
              <PersonalProfileForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="professional">
          <Card>
            <CardHeader>
              <CardTitle>Professional Details</CardTitle>
              <CardDescription>Tell us about your career. This helps in tailoring financial advice.</CardDescription>
            </CardHeader>
            <CardContent>
              <ProfessionalProfileForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="goals">
          <Card>
            <CardHeader>
              <CardTitle>Financial & Life Goals</CardTitle>
              <CardDescription>Outline your short-term (5 years) and long-term (10 years) goals.</CardDescription>
            </CardHeader>
            <CardContent>
              <GoalsProfileForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  );
}
