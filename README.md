# GitHub Profile Analyzer API

## Features

- Analyze GitHub profile using GitHub API
- Store profile insights in MySQL
- Fetch all stored profiles
- Fetch single stored profile

## Technologies Used

- Node.js
- Express.js
- MySQL
- GitHub API

## Installation

```bash
npm install
```

## Run Project

```bash
npm run dev
```

## Environment Variables

Create `.env`

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=mysql
DB_NAME=github_analyzer
```

## API Endpoints

### Analyze Profile

GET `/api/analyze/:username`

Example:

```text
/api/analyze/octocat
```

### Get All Profiles

GET `/api/profiles`

### Get Single Profile

GET `/api/profiles/:username`

Example:

```text
/api/profiles/octocat
```
