import { App } from './app';
import pino from 'pino';
import { buildConfig } from './config';

const logger = pino({ level: 'info' });

export default function gracefulShutdown(app: App): () => Promise<void> {
    const config = buildConfig();
    return async (): Promise<void> => {
        try {
            logger.info(`Shutting down ${config.projectname}.`);
            await app.close();
            logger.info('Shutdown complete. Exit now.');
            process.exit(0);
        } catch (error) {
            logger.error('error while shutting down.', error);
            process.exit(1);
        }
    };
}
