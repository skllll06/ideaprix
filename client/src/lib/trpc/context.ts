import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { type inferAsyncReturnType } from '@trpc/server';
import { getServerSession } from 'next-auth';

export async function createTRPCContext() {
  // CreateHttpContext を使用する
  const session = await getServerSession(authOptions);

  return {
    session,
    prisma,
  };
}

export type Context = inferAsyncReturnType<typeof createTRPCContext>;
