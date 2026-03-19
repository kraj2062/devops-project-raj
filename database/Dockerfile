# Lightweight Postgres image
FROM postgres:15-alpine

# Default credentials (will be overridden by Docker Compose)
ENV POSTGRES_DB=ansh_db
ENV POSTGRES_USER=ansh_db_admin
ENV POSTGRES_PASSWORD=SecurePass123

# Copy our initialization script so it runs when the DB starts
COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 5432