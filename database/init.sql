
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(150) NOT NULL
);

-- Insert a default user to ensure there's dummy data
INSERT INTO users (full_name) VALUES ('Kumar Raj Initial User');
