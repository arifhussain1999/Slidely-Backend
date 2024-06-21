// server.ts

import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import cors from 'cors';
import { request } from 'http';

const app = express();
const PORT = 3000;

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Define endpoint to check server status
app.get('/ping', (req: Request, res: Response) => {
  res.json({ success: true });
});

// Define endpoint to save submissions
app.post('/submit', (req: Request, res: Response) => {
  const { Name, Email, PhoneNumber, GitHubLink, ElapsedTime } = req.body;

  //console.log(req.body);

  // Assuming db.json structure as an array of submissions
  let submissions: any[] = [];
  if (fs.existsSync('db.json')) {
    const data = fs.readFileSync('db.json', 'utf8');
    submissions = JSON.parse(data);
  }

  const newSubmission = {
    Name,
    Email,
    PhoneNumber,
    GitHubLink,
    ElapsedTime,
  };

  submissions.push(newSubmission);

  fs.writeFileSync('db.json', JSON.stringify(submissions, null, 2));

  res.json({ success: true });
});

// Define endpoint to read all submissions
app.get('/submissions', (req: Request, res: Response) => {
  let submissions: any[] = [];
  if (fs.existsSync('db.json')) {
    const data = fs.readFileSync('db.json', 'utf8');
    submissions = JSON.parse(data);
  }

  res.json(submissions);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
