'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface RelatedIdea {
  id: string;
  title: string;
  description: string;
  author: {
    name: string;
  };
}

async function getRelatedIdeas(currentIdeaId: string): Promise<RelatedIdea[]> {
  // This would be replaced with an actual API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    {
      id: '3',
      title: 'Related Idea 1',
      description: 'A brief description of related idea 1',
      author: { name: 'Jane Doe' },
    },
    {
      id: '4',
      title: 'Related Idea 2',
      description: 'A brief description of related idea 2',
      author: { name: 'John Smith' },
    },
  ];
}

export function RelatedIdeas({ currentIdeaId }: { currentIdeaId: string }) {
  const [relatedIdeas, setRelatedIdeas] = useState<RelatedIdea[]>([]);

  useEffect(() => {
    getRelatedIdeas(currentIdeaId).then(setRelatedIdeas);
  }, [currentIdeaId]);

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {relatedIdeas.map((idea) => (
        <Card key={idea.id}>
          <CardHeader>
            <CardTitle>{idea.title}</CardTitle>
            <CardDescription>by {idea.author.name}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{idea.description}</p>
          </CardContent>
          <Link href={`/ideas/${idea.id}`} className="absolute inset-0">
            <span className="sr-only">View idea</span>
          </Link>
        </Card>
      ))}
    </div>
  );
}
