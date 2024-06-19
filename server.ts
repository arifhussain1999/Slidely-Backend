// server.ts

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Define endpoint to check server status
app.get('/ping', (req: Request, res: Response) => {
  res.json({ success: true });
});

// Define endpoint to save submissions
app.post('/submit', (req: Request, res: Response) => {
  const { name, email, phone, github_link, stopwatch_time } = req.body;

  // Assuming db.json structure as an array of submissions
  let submissions: any[] = [];
  if (fs.existsSync('db.json')) {
    const data = fs.readFileSync('db.json', 'utf8');
    submissions = JSON.parse(data);
  }

  const newSubmission = {
    name,
    email,
    phone,
    github_link,
    stopwatch_time,
  };

  submissions.push(newSubmission);

  fs.writeFileSync('db.json', JSON.stringify(submissions, null, 2));

  res.json({ success: true });
});

// Define endpoint to read submissions by index
app.get('/read', (req: Request, res: Response) => {
  const { index } = req.query;

  if (typeof index !== 'string') {
    return res.status(400).json({ error: 'Invalid index parameter' });
  }

  const idx = parseInt(index);
  if (isNaN(idx)) {
    return res.status(400).json({ error: 'Invalid index parameter' });
  }

  let submissions: any[] = [];
  if (fs.existsSync('db.json')) {
    const data = fs.readFileSync('db.json', 'utf8');
    submissions = JSON.parse(data);
  }

  if (idx < 0 || idx >= submissions.length) {
    return res.status(404).json({ error: 'Submission not found' });
  }

  const submission = submissions[idx];
  res.json(submission);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

