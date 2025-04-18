export interface ServiceConfiguration {
    httpPort: number;
    withMigration: boolean;
    postgresConfig: {
        port: number;
        host: string;
        user: string;
        password: string;
        database: string;
    },
    jwtSecret: string;
}
