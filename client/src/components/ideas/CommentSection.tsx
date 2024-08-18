'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useState } from 'react';

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
}

async function getComments(ideaId: string): Promise<Comment[]> {
  // This would be replaced with an actual API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    {
      id: '1',
      author: { name: 'Alice Johnson', avatar: 'https://github.com/shadcn.png' },
      content: "This is a great idea! I'd love to see it implemented.",
      createdAt: '2023-06-01T12:00:00Z',
    },
    {
      id: '2',
      author: { name: 'Bob Smith', avatar: 'https://github.com/shadcn.png' },
      content: 'Interesting concept. Have you considered the environmental impact?',
      createdAt: '2023-06-02T14:30:00Z',
    },
  ];
}

export function CommentSection({ ideaId }: { ideaId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    getComments(ideaId).then(setComments);
  }, [ideaId]);

  const handleSubmitComment = () => {
    // In a real app, you'd call an API here
    const comment: Comment = {
      id: Date.now().toString(),
      author: { name: 'Current User', avatar: 'https://github.com/shadcn.png' },
      content: newComment,
      createdAt: new Date().toISOString(),
    };
    setComments((prev) => [comment, ...prev]);
    setNewComment('');
  };

  return (
    <div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add a comment</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Type your comment here."
            className="mb-4"
          />
          <Button onClick={handleSubmitComment}>Submit Comment</Button>
        </CardContent>
      </Card>

      {comments.map((comment) => (
        <Card key={comment.id} className="mb-4">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                <AvatarFallback>{comment.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-sm font-medium">{comment.author.name}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p>{comment.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
