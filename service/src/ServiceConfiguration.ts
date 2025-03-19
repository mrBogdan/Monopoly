export interface ServiceConfiguration {
    httpPort: number;
    webSocketResponse?: string;
    postgresConfig: {
        port: number;
        host: string;
        user: string;
        password: string;
        database: string;
    }
}
