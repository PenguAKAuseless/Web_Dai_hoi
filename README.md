# Attendance Conference App

## Features
- View attendance statistics
- Check-in students with admin authentication
- Import students from `.xlsx` before running the app

## Setup

### 1. Install Dependencies
```sh
npm install
```

### 2. Import Student Data from Excel
- Ensure your `students.xlsx` file is located in the backend directory.
- The Excel file should contain:
| MSCB_MSSV | Name         | Image                                  |
| --------- | ------------ | -------------------------------------- |
| 2211111   | Nguyen Van A | https://example.com/images/2211111.png |
| 2311111   | Nguyen Van B | https://example.com/images/2311111.jpg |
- Run the import script:
`node backend/importStudents.js`

### 3. Start the Backend Server
`node backend/server.js`

### 4. Start the Frontend
`npm start`

