```mermaid
sequenceDiagram
    Client->>Service: WebSocket Action
    Service->>Postgres: Write to DB
    Postgres-->>Service: Success
    Service-->>Client: Broadcast Updates
```
