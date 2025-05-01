export interface ServiceConfiguration {
    httpPort: number;
    jwtSecret: string;
    postgresConfig: {
        port: number;
        host: string;
        user: string;
        password: string;
        database: string;
    },
    withMigration: boolean;
}
