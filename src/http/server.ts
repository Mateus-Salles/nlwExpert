import fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const app = fastify();

const prisma = new PrismaClient();

const port = 3333;

app.post('/polls', async (request, reply) => {
    const createPollBody = z.object({
        title: z.string() // Isso obriga que seja passada uma string para title
    });

    const { title } = createPollBody.parse(request.body); // Valida e retorna request.body

    const poll = await prisma.poll.create({
        data: {
            title,
        }
    });

    return reply.status(201).send({
        pollId: poll.id
    })
});

app.listen({ port: 3333 }).then(() => {
    console.log(`Server running... [PORT ${port}]`);
});
