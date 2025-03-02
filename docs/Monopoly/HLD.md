```mermaid
classDiagram
  class User {
    +string name
    +string email
    +login()
  }

  class Admin {
    +manageUsers()
  }

  User <|-- Admin
