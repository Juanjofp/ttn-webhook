import { FastifyInstance } from 'fastify';
import { Config } from './config';
import { buildLogger } from './logger';
import { buildServer } from './server';

export type App = {
    close(): Promise<void>;
    getServer(): FastifyInstance;
};

export async function buildApp(config: Config): Promise<App> {
    const { log } = config;
    const logger = buildLogger(log);
    const server = buildServer(logger);
    return {
        async close(): Promise<void> {
            await server.close();
        },
        getServer(): FastifyInstance {
            return server;
        }
    };
}
