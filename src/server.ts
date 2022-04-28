import fastify, { FastifyInstance } from 'fastify';
import { Logger } from 'pino';

export function buildServer(logger: Logger): FastifyInstance {
    const server = fastify({ logger });
    server.get('/version', (req, reply) => {
        reply
            .status(200)
            .headers({ 'content-type': 'application/json' })
            .send({ version: '0.0.2' });
    });

    server.post('/message', (req, reply) => {
        logger.info(`/message ${JSON.stringify(req.body)}`);
        reply
            .status(200)
            .headers({ 'content-type': 'application/json' })
            .send({ version: '0.0.1' });
    });

    server.post('/join', (req, reply) => {
        logger.info(`/join ${JSON.stringify(req.body)}`);
        reply
            .status(200)
            .headers({ 'content-type': 'application/json' })
            .send({ version: '0.0.1' });
    });
    return server;
}
