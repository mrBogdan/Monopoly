We are using Mermaid, for watching it you need install additional plugin
In webstorm you can open `Settings -> Plugins -> Marketplace` find and install there Mermaid plugin

Diagram example

```mermaid
classDiagram
  class User {
    -string name
    +string email
    +login()
  }

  class Admin {
    +manageUsers()
  }

  User <|-- Admin

```