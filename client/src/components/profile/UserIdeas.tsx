'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Idea {
  id: string;
  title: string;
  description: string;
  created_at: string;
}

export function UserIdeas({ userId }: { userId: string }) {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchIdeas = async () => {
      const { data, error } = await supabase
        .from('ideas')
        .select('id, title, description, created_at')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching ideas:', error);
      } else {
        setIdeas(data || []);
      }
      setIsLoading(false);
    };

    fetchIdeas();
  }, [userId]);

  if (isLoading) {
    return <div>Loading ideas...</div>;
  }

  if (ideas.length === 0) {
    return <div>You haven't posted any ideas yet.</div>;
  }

  return (
    <div className="space-y-4">
      {ideas.map((idea) => (
        <Card key={idea.id}>
          <CardHeader>
            <CardTitle>{idea.title}</CardTitle>
            <CardDescription>{new Date(idea.created_at).toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{idea.description}</p>
            <Button asChild>
              <Link href={`/ideas/${idea.id}`}>View Idea</Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
