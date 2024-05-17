# Taskify Application

## Introduction
Taskify is a web application designed to manage tasks efficiently. It allows users to create, update, and delete tasks, as well as authenticate via Google OAuth2.

![Taskify Preview](/client/public/images/image.png)

## Images
![image1](/client/public/images/image1.png)
![image2](/client/public/images/image2.png)
![image3](/client/public/images/image3.png)
![image4](/client/public/images/image4.png)
![image5](/client/public/images/image5.png)
![image6](/client/public/images/image6.png)
![image7](/client/public/images/image7.png)
![image8](/client/public/images/image8.png)
![image9](/client/public/images/image9.png)


## Technologies Used


<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg" height="40" alt="chrome logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" height="40" alt="css3 logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" height="40" alt="git logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" height="40" alt="github logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" height="40" alt="google logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" height="40" alt="googlecloud logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" height="40" alt="html5 logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" alt="javascript logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" height="40" alt="mongodb logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="40" alt="nodejs logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/npm/npm-original-wordmark.svg" height="40" alt="npm logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height="40" alt="react logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" height="40" alt="vscode logo"  />
</div>


- **Frontend**: React.js
- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: Passport.js with Google OAuth2

## Backend Overview
The backend of the Taskify application is built using Node.js with Express.js. It provides RESTful APIs for task management and user authentication.

### Dependencies
- **express**: Web framework for Node.js.
- **express-session**: Session middleware for Express.js.
- **passport**: Authentication middleware for Node.js.
- **passport-google-oauth20**: Google OAuth2 authentication strategy for Passport.js.
- **mongoose**: Object Data Modeling (ODM) library for MongoDB.

### Backend Structure
The backend consists of the following components:
1. **Server Setup**: 
   - `index.js`: Main entry point for the backend server. Initializes Express application and connects to the database.

2. **Routes**:
   - `authRoutes.js`: Defines routes for Google OAuth2 authentication.
   - `taskRoutes.js`: Defines routes for task management.
   - `userRoutes.js`: Defines routes for user profile management.

3. **Models**:
   - `User.js`: Defines the Mongoose schema and model for user profiles.
   - `Task.js`: Defines the Mongoose schema and model for tasks.

4. **Middleware**:
   - `authMiddleware.js`: Contains middleware functions for user authentication.

### Authentication
Taskify uses Google OAuth2 for user authentication. Upon successful authentication, users are redirected to the dashboard page.

### Task Management
Users can create, update, and delete tasks through RESTful APIs. Each task is associated with a user and contains information such as task description, status, and creation timestamp.

## Frontend Overview
The frontend of the Taskify application is built using React.js. It provides a user-friendly interface for task management and authentication.

### Components
1. **Dashboard**: Displays tasks, allows task creation, and provides task management functionalities.
2. **Login**: Handles user authentication via Google OAuth2.
3. **UserHeader**: Navigation header component displayed to authenticated users.
4. **DashHeader**: Header component displayed on the dashboard page.
5. **Home**: Landing page component.
6. **Error**: Error page component.

### Features
- **Task Creation**: Users can create new tasks with descriptions.
- **Task Management**: Users can mark tasks as completed, delete tasks, and view task statistics.
- **Authentication**: Users can log in and log out using Google OAuth2.

## Installation and Usage
1. **Clone the Repository**: `git clone <repository-url>`
2. **Install Dependencies**: `npm install`
3. **Start Backend Server**: `npm start`
4. **Start Frontend Server**: `npm start` (in the `client` directory)
5. **Access the Application**: Open the browser and go to `http://localhost:3000`

## Conclusion
Taskify is a simple yet powerful task management application that provides an intuitive interface for users to organize their tasks effectively.
