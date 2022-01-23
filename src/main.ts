import { buildConfig } from './config';
import gracefulShutdown from './graceful-shutdown';
import 'make-promises-safe';
import { buildApp } from './app';
import pino from 'pino';

const mainLogger = pino({ level: 'info' });

async function main() {
    const config = buildConfig();
    mainLogger.info(`Starting ${config.projectname}`);
    const app = await buildApp(config);

    const { http } = config;
    await app.getServer().listen(http.port, http.host);

    process.on('SIGTERM', gracefulShutdown(app));
    process.on('SIGINT', gracefulShutdown(app));
}

main().catch(error => {
    const config = buildConfig();
    mainLogger.error(
        `Error while starting up ${config.projectname}. ${error.message}`
    );
    process.exit(1);
});
