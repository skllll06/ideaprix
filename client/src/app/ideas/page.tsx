'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { trpc } from '@/lib/trpc/client';
import Link from 'next/link';
import { useMemo } from 'react';

export default function IdeasPage() {
  const { data, isLoading, isFetching, error, fetchNextPage, hasNextPage } =
    trpc.getIdeas.useInfiniteQuery(
      { limit: 10 },
      {
        queryKey: ['getIdeas', { limit: 10 }], // クエリを一意に識別するためのキー
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        initialCursor: { limit: 10 }, // 初期ページのリクエストパラメータ
      }
    );
  if (isLoading) return <div>Loading ideas...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  const ideas = useMemo(() => {
    return data?.pages.flatMap((page) => page.ideas) ?? [];
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Explore Ideas</h1>
        <Button asChild>
          <Link href="/ideas/new">Post New Idea</Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Input placeholder="Search ideas..." className="md:w-1/3" />
        <Select>
          <option value="">All Categories</option>
          <option value="tech">Technology</option>
          <option value="health">Health</option>
          <option value="education">Education</option>
        </Select>
        <Select>
          <option value="newest">Newest</option>
          <option value="popular">Most Popular</option>
          <option value="trending">Trending</option>
        </Select>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ideas.map((idea) => (
          <div key={idea.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{idea.title}</h2>
            <p className="text-gray-600 mb-4">{idea.description}</p>
            <Link href={`/ideas/${idea.id}`} className="text-blue-500 hover:underline">
              View Details
            </Link>
          </div>
        ))}
      </div>

      {hasNextPage && (
        <Button
          onClick={() => fetchNextPage()}
          disabled={isFetching}
          className="mt-8 mx-auto block"
        >
          {isFetching ? 'Loading more...' : 'Load More'}
        </Button>
      )}
    </div>
  );
}
