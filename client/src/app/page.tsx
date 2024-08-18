import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Lightbulb, Trophy, Users } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          Welcome to Ideaprix
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Share your innovative ideas, compete with others, and bring your vision to life.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/ideas">Explore Ideas</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Ideaprix?</h2>
        <div className="grid gap-8 md:grid-cols-3">
          <Card>
            <CardHeader>
              <Lightbulb className="w-10 h-10 mb-2 text-primary" />
              <CardTitle>Share Ideas</CardTitle>
            </CardHeader>
            <CardContent>
              Present your innovative concepts to a global audience of creators and investors.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Trophy className="w-10 h-10 mb-2 text-primary" />
              <CardTitle>Compete</CardTitle>
            </CardHeader>
            <CardContent>
              Participate in idea competitions and showcase your creativity to win prizes.
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Users className="w-10 h-10 mb-2 text-primary" />
              <CardTitle>Collaborate</CardTitle>
            </CardHeader>
            <CardContent>
              Connect with like-minded individuals and form teams to bring ideas to life.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center">
        <Card className="p-8">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Ready to Share Your Idea?</CardTitle>
            <CardDescription>Join our community of innovators and make your mark.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild size="lg" className="mt-4">
              <Link href="/ideas/new">
                Post Your Idea <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
