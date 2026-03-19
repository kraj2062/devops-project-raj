-- Initialization script for Ansh's Postgres DB
-- This script automatically runs on the first DB startup

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL
);

-- Insert a default user to ensure there's dummy data
INSERT INTO users (full_name) VALUES ('Ansh Negi Initial User');