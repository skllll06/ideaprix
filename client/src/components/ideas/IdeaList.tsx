'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Eye, MessageSquare, ThumbsUp } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// This would typically come from your API
const fetchIdeas = async (page: number) => {
  // Simulating API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return Array(10)
    .fill(null)
    .map((_, i) => ({
      id: `${page}-${i}`,
      title: `Idea ${page}-${i}`,
      description: 'This is a brief description of the idea...',
      author: {
        name: 'John Doe',
        avatar: 'https://github.com/shadcn.png',
      },
      likes: Math.floor(Math.random() * 100),
      comments: Math.floor(Math.random() * 50),
      views: Math.floor(Math.random() * 1000),
    }));
};

export function IdeaList() {
  const [ideas, setIdeas] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMoreIdeas();
  }, []);

  const loadMoreIdeas = async () => {
    setLoading(true);
    const newIdeas = await fetchIdeas(page);
    setIdeas((prevIdeas) => [...prevIdeas, ...newIdeas]);
    setPage((prevPage) => prevPage + 1);
    setLoading(false);
  };

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {ideas.map((idea) => (
          <Card key={idea.id}>
            <CardHeader>
              <CardTitle>{idea.title}</CardTitle>
              <CardDescription>by {idea.author.name}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{idea.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex space-x-4 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <ThumbsUp className="mr-1 h-4 w-4" /> {idea.likes}
                </span>
                <span className="flex items-center">
                  <MessageSquare className="mr-1 h-4 w-4" /> {idea.comments}
                </span>
                <span className="flex items-center">
                  <Eye className="mr-1 h-4 w-4" /> {idea.views}
                </span>
              </div>
              <Button variant="ghost" asChild>
                <Link href={`/ideas/${idea.id}`}>View</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {loading ? (
        <div className="text-center mt-8">Loading more ideas...</div>
      ) : (
        <Button onClick={loadMoreIdeas} className="mt-8 mx-auto block">
          Load More
        </Button>
      )}
    </div>
  );
}
