'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Flag, MessageSquare, Share2 } from 'lucide-react';

interface IdeaDetailProps {
  idea: {
    id: string;
    title: string;
    description: string;
    content: string;
    author: {
      id: string;
      name: string | null;
      createdAt: string;
      updatedAt: string;
      email: string;
      avatar: string | null;
    };
    authorId: string;
    createdAt: string;
    updatedAt: string;
    comments: {
      content: string;
      author: {
        id: string;
        name: string | null;
        createdAt: string;
        updatedAt: string;
        email: string;
        avatar: string | null;
      };
    }[];
    // likesなどの他の必要なプロパティを追加
  };
}

export function IdeaDetail({ idea }: IdeaDetailProps) {
  // const [likes, setLikes] = useState(idea.likes);

  // const handleLike = () => {
  //   // In a real app, you'd call an API here
  //   setLikes((prev) => prev + 1);
  // };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            {idea.author.avatar ? (
              <AvatarImage src={idea.author.avatar} alt={idea.author.name ?? ''} />
            ) : (
              <div></div>
            )}
            <AvatarFallback>{idea.author.name}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{idea.title}</CardTitle>
            <CardDescription>
              by {idea.author.name} • {idea.createdAt}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{idea.description}</p>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: idea.content }} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex space-x-4">
          {/* <Button variant="ghost" size="sm" onClick={handleLike}>
            <ThumbsUp className="mr-2 h-4 w-4" />
            {likes}
          </Button> */}
          <Button variant="ghost" size="sm">
            <MessageSquare className="mr-2 h-4 w-4" />
            {idea.comments.map((comment) => comment.author.name).join(', ')}
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
        <Button variant="ghost" size="sm">
          <Flag className="mr-2 h-4 w-4" />
          Report
        </Button>
      </CardFooter>
    </Card>
  );
}
