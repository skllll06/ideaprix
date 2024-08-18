import { NewIdeaForm } from '@/components/ideas/NewIdeaForm';

export default function NewIdeaPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Share Your Idea</h1>
      <NewIdeaForm />
    </div>
  );
}
