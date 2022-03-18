import convict from 'convict';

export type Config = {
    env: 'production' | 'development' | 'test';
    projectname: string;
    log: {
        level: string;
        enabled: boolean;
    };
    http: {
        host: string;
        port: number;
    };
};

export function buildConfig(): Config {
    const config = convict<Config>({
        projectname: {
            doc: 'TTN Sample',
            format: String,
            default: 'Default Project',
            env: 'PROJECT_NAME'
        },
        env: {
            doc: 'The application environment.',
            format: ['production', 'development', 'test'],
            default: 'development',
            env: 'NODE_ENV'
        },
        log: {
            level: {
                doc: 'The log level (default info).',
                format: String,
                default: 'info',
                env: 'LOG_LEVEL'
            },
            enabled: {
                doc: 'enable log (default true).',
                format: Boolean,
                default: true,
                env: 'LOG_ENABLED'
            }
        },
        http: {
            host: {
                doc: 'The host ip address to bind the http server.',
                format: String,
                default: '0.0.0.0',
                env: 'HTTP_HOST'
            },
            port: {
                doc: 'The port to bind the http server.',
                format: 'port',
                default: 3099,
                env: 'HTTP_PORT'
            }
        }
    });
    config.validate({ allowed: 'strict' });
    return config.getProperties();
}
