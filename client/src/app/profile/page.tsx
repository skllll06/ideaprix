import { UserIdeas } from '@/components/profile/UserIdeas';
import { UserProfile } from '@/components/profile/UserProfile';
import { Skeleton } from '@/components/ui/skeleton';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

export default async function ProfilePage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect('/login');
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Suspense fallback={<Skeleton className="w-full h-[200px]" />}>
            <UserProfile userId={session.user.id} />
          </Suspense>
        </div>

        <div className="md:col-span-2">
          <h2 className="text-2xl font-semibold mb-4">Your Ideas</h2>
          <Suspense fallback={<Skeleton className="w-full h-[400px]" />}>
            <UserIdeas userId={session.user.id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
