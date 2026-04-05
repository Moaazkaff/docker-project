CREATE TABLE IF NOT EXISTS items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT
);

-- Insert sample data
INSERT INTO 
    items (name) 
VALUES
  ('Laptop'),
  ('Mouse'),
  ('Keyboard'),
  ('Monitor'),
  ('Headphones');