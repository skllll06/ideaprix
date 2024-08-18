import { prisma } from '@/lib/prisma';
import { Context } from '@/lib/trpc/context';
import { Prisma } from '@prisma/client';
import { initTRPC, TRPCError } from '@trpc/server';
import { z } from 'zod';

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;

const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return next({
    ctx: {
      session: ctx.session,
    },
  });
});

export const protectedProcedure = t.procedure.use(isAuthed);

export const appRouter = router({
  getIdeas: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.string().nullish(),
      })
    )
    .query(
      async ({
        input,
      }): Promise<{
        ideas: Prisma.IdeaGetPayload<{ include: { author: true } }>[];
        nextCursor: string | undefined;
      }> => {
        const limit = input.limit ?? 50;
        const query: Prisma.IdeaFindManyArgs = {
          take: limit + 1,
          orderBy: { createdAt: 'desc' },
        };

        if (input.cursor) {
          query.cursor = { id: input.cursor };
        }

        const ideas = await prisma.idea.findMany({
          ...query,
          include: { author: true },
        });

        let nextCursor: string | undefined = undefined;
        if (ideas.length > limit) {
          const nextItem = ideas.pop();
          nextCursor = nextItem!.id;
        }

        return {
          ideas,
          nextCursor,
        };
      }
    ),

  getIdea: publicProcedure.input(z.object({ id: z.string() })).query(
    async ({
      input,
    }): Promise<
      Prisma.IdeaGetPayload<{
        include: {
          author: true;
          comments: {
            include: {
              author: true; // これによりauthor情報を取得
            };
          };
        };
      }>
    > => {
      const idea = await prisma.idea.findUnique({
        where: { id: input.id },
        include: {
          author: true,
          comments: {
            include: {
              author: true, // これによりauthor情報を取得
            },
          },
        },
      });

      if (!idea) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No idea with id '${input.id}'`,
        });
      }

      return idea;
    }
  ),

  createIdea: protectedProcedure
    .input(
      z.object({
        title: z.string().min(1).max(100),
        description: z.string().min(1).max(500),
        content: z.string().min(1),
      })
    )
    .mutation(async ({ input, ctx }): Promise<Prisma.IdeaGetPayload<{}>> => {
      const idea = await prisma.idea.create({
        data: {
          ...input,
          authorId: ctx.session.user.id,
        },
      });

      return idea;
    }),

  // Add more procedures as needed (e.g., updateIdea, deleteIdea, createComment, etc.)
});

export type AppRouter = typeof appRouter;
