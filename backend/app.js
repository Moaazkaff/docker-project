const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const rateLimit = require('express-rate-limit');

const app = express();
const port = process.env.PORT || 3001;

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://user:password@database:5432/myapp'
});

app.use(limiter);
app.use(cors());
app.use('/api/', express.json());

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.status(200).json({ status: 'OK', message: 'Service is healthy' });
  } catch (error) {
    res.status(500).json({ status: 'ERROR', message: 'Database connection failed' });
  }
});

// List items endpoint
app.get('/api/items', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM items ORDER BY id');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// Create new item endpoint
app.post('/api/items', async (req, res) => {
  const { name, description } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO items (name, description) VALUES ($1, $2) RETURNING *',
      [name, description || '']
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create item' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});