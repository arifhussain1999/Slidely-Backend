"use strict";
// server.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const fs_1 = __importDefault(require("fs"));
const app = (0, express_1.default)();
const PORT = 3000;
// Middleware to parse JSON bodies
app.use(body_parser_1.default.json());
// Define endpoint to check server status
app.get('/ping', (req, res) => {
    res.json({ success: true });
});
// Define endpoint to save submissions
app.post('/submit', (req, res) => {
    const { name, email, phone, github_link, stopwatch_time } = req.body;
    // Assuming db.json structure as an array of submissions
    let submissions = [];
    if (fs_1.default.existsSync('db.json')) {
        const data = fs_1.default.readFileSync('db.json', 'utf8');
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
    fs_1.default.writeFileSync('db.json', JSON.stringify(submissions, null, 2));
    res.json({ success: true });
});
// Define endpoint to read submissions by index
app.get('/read', (req, res) => {
    const { index } = req.query;
    if (typeof index !== 'string') {
        return res.status(400).json({ error: 'Invalid index parameter' });
    }
    const idx = parseInt(index);
    if (isNaN(idx)) {
        return res.status(400).json({ error: 'Invalid index parameter' });
    }
    let submissions = [];
    if (fs_1.default.existsSync('db.json')) {
        const data = fs_1.default.readFileSync('db.json', 'utf8');
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
