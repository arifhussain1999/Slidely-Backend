"use strict";
// server.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const fs_1 = __importDefault(require("fs"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = 3000;
// Middleware to enable CORS
app.use((0, cors_1.default)());
// Middleware to parse JSON bodies
app.use(body_parser_1.default.json());
// Define endpoint to check server status
app.get('/ping', (req, res) => {
    res.json({ success: true });
});
// Define endpoint to save submissions
app.post('/submit', (req, res) => {
    const { Name, Email, PhoneNumber, GitHubLink, ElapsedTime } = req.body;
    //console.log(req.body);
    // Assuming db.json structure as an array of submissions
    let submissions = [];
    if (fs_1.default.existsSync('db.json')) {
        const data = fs_1.default.readFileSync('db.json', 'utf8');
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
    fs_1.default.writeFileSync('db.json', JSON.stringify(submissions, null, 2));
    res.json({ success: true });
});
// Define endpoint to read all submissions
app.get('/submissions', (req, res) => {
    let submissions = [];
    if (fs_1.default.existsSync('db.json')) {
        const data = fs_1.default.readFileSync('db.json', 'utf8');
        submissions = JSON.parse(data);
    }
    res.json(submissions);
});
// Define endpoint to delete a submission by phone number
app.delete('/submissions/:phoneNumber', (req, res) => {
    const phoneNumber = req.params.phoneNumber;
    let submissions = [];
    if (fs_1.default.existsSync('db.json')) {
        const data = fs_1.default.readFileSync('db.json', 'utf8');
        submissions = JSON.parse(data);
    }
    const initialLength = submissions.length;
    // Filter out the submission with the given phone number
    submissions = submissions.filter(submission => submission.PhoneNumber !== phoneNumber);
    const finalLength = submissions.length;
    // Write updated submissions back to the file
    fs_1.default.writeFileSync('db.json', JSON.stringify(submissions, null, 2));
    if (initialLength === finalLength) {
        res.status(404).json({ success: false, message: "Phone number not found" });
    }
    else {
        res.json({ success: true, message: "Submission deleted successfully" });
    }
});
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
