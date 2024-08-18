import { CommentSection } from '@/components/ideas/CommentSection';
import { IdeaDetail } from '@/components/ideas/IdeaDetail';
import { RelatedIdeas } from '@/components/ideas/RelatedIdeas';
import { Skeleton } from '@/components/ui/skeleton';
import { trpc } from '@/lib/trpc/client';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function IdeaPage({ params }: { params: { id: string } }) {
  const { data: idea, isLoading, error } = trpc.getIdea.useQuery({ id: params.id });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error occurred: {error.message}</div>;
  }
  if (!idea) notFound();

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<Skeleton className="w-full h-[200px]" />}>
        <IdeaDetail idea={idea} />
      </Suspense>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <Suspense fallback={<Skeleton className="w-full h-[200px]" />}>
          <CommentSection ideaId={params.id} />
        </Suspense>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Related Ideas</h2>
        <Suspense fallback={<Skeleton className="w-full h-[200px]" />}>
          <RelatedIdeas currentIdeaId={params.id} />
        </Suspense>
      </div>
    </div>
  );
}
