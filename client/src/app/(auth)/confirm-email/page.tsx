'use client';

import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ConfirmEmailPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
          if (event === 'SIGNED_IN') {
            setIsLoading(false);
            toast({
              title: 'Email confirmed',
              description: 'Your email has been successfully confirmed.',
            });
            router.push('/');
          }
        });

        // エラーチェックのために別途セッション取得
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;

        // クリーンアップ関数
        return () => {
          subscription.unsubscribe();
        };
      } catch (error: any) {
        setIsLoading(false);
        toast({
          title: 'Error',
          description: error.message || 'An error occurred. Please try again.',
          variant: 'destructive',
        });
      }
    };

    confirmEmail();
  }, [router, toast]);

  if (isLoading) {
    return <div>Confirming your email...</div>;
  }

  return null;
}
