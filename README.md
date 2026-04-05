# docker-project
Dockerized App — A containerized application built with Docker for consistent, portable, and scalable deployment. Includes Dockerfile, Docker Compose setup, and environment configuration. Easy to run anywhere with a single command.

# Access the Application

# Frontend : http://localhost

# Backend API : http://localhost:3001


## Services

| Service  | Port | Description              |
|----------|------|--------------------------|
| nginx    | 80   | Nginx web server         |
| backend  | 3001 | Node.js REST API         |
| frontend | -    | Nginx serving static files |
| database | 5432 | PostgreSQL database      |


## API Endpoints

- `GET /api/health` - Health check
- `GET /api/items` - List items
- `POST /api/items` - Create new items

## Environment Variables

### Backend

| Variable     | Default | Description                          |
|--------------|---------|--------------------------------------|
| `PORT`         | 3001    | Port on which the server listens     |
| `NODE_ENV`    | development | Environment mode (development/production) |
| `DATABASE_URL` | -       | PostgreSQL database connection string |

### Database

| Variable         | Default | Description                          |
|------------------|---------|--------------------------------------|
| `POSTGRES_DB`      | myapp   | Database name                        |
| `POSTGRES_USER`    | user    | Database user                        |
| `POSTGRES_PASSWORD`| password| Database password                    |




