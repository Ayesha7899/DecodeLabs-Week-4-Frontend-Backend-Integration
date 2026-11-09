# Student Management System – Frontend & Backend Integration

## Project Overview
This project demonstrates frontend and backend integration using Node.js, Express.js, and SQLite. It provides a web-based Student Management System that allows users to add, view, update, and delete student records.

The frontend communicates with backend REST APIs using JavaScript `fetch()` and `async/await`.

## Technologies Used
- HTML5
- CSS3
- JavaScript
- Node.js
- Express.js
- SQLite
- Fetch API
- Async/Await

## Features
- Add new student records.
- Display student records dynamically.
- Update existing student information.
- Delete student records.
- Handle API responses and errors.
- Validate required form fields.
- Store student data in an SQLite database.
- Automatically load records when the webpage opens.

## Project Structure

```text
Student-Management-System/
│
├── public/
│   └── index.html
│
├── server.js
├── package.json
├── package-lock.json
├── students.db
└── README.md
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/students` | Retrieve all students |
| POST | `/api/students` | Add a new student |
| PUT | `/api/students/:id` | Update student information |
| DELETE | `/api/students/:id` | Delete a student |

## Installation and Setup

**1. Clone the repository**

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

**2. Navigate to the project folder**

```bash
cd Student-Management-System
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the server**

```bash
npm start
```

**5. Open the application**

Visit:

```text
http://localhost:3000
```

## Frontend and Backend Integration

The frontend uses JavaScript Fetch API to communicate with the Express backend.

- `GET` requests retrieve student records.
- `POST` requests submit new student data.
- `PUT` requests update existing records.
- `DELETE` requests remove student records.

Asynchronous JavaScript with `async/await` is used to handle API requests and responses.

## Testing

The application was tested by performing the following operations:

- Adding a new student.
- Retrieving student records.
- Updating student information.
- Deleting student records.
- Checking duplicate email handling.
- Testing required-field validation.
- Refreshing the page to verify database persistence.

## Learning Outcomes

- Understanding frontend and backend communication.
- Working with RESTful APIs.
- Using Fetch API and async/await.
- Handling HTTP responses and errors.
- Integrating an SQLite database with a web application.
- Implementing CRUD operations through a frontend interface.

## Author

**Ayesha**  
Computer Engineering

**Internship Project – Week 4**
