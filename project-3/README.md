# Docker .NET Web Application

This project is a containerized .NET web application that serves a simple frontend interface using Nginx as a reverse proxy.

## Project Structure

- `docker-compose.yml`: Defines the multi-container setup including the .NET app and Nginx.
- `Dockerfile`: Builds the .NET application image.
- `nginx.config`: Nginx configuration for serving static files and proxying to the app.
- `App/`: Contains the .NET project source code.
  - `Program.cs`: Main application entry point.
  - `frontend/`: Static web assets (HTML, CSS, JS).
- `App.Tests/`: Unit tests for the application.

## Prerequisites

- Docker and Docker Compose installed on your system.

## Running the Application

1. Clone or navigate to the project directory.
2. Run `docker-compose up --build` to build and start the containers.
3. Access the application at `http://localhost` (or the configured port).

## Building and Testing

- To build the .NET app: Run `dotnet build` in the `App/` directory.
- To run tests: Run `dotnet test` in the `App.Tests/` directory.

## Technologies Used

- .NET (C#)
- Docker
- Nginx
- HTML/CSS/JavaScript