# Quick Code Studio

![Quick COde Studio](/Img/new-logo-removebg-preview.png)

Quick Code Studio is a web-based code editor and management platform. It provides a simple interface for users to write, edit, and manage code snippets, with authentication and user management features.

Quick Code Studio is a web-based live code editor that enables users to write, edit, and preview HTML, CSS, and JavaScript in real time, featuring user authentication, project management, a modern responsive UI with CodeMirror integration, theme switching, and a built-in JavaScript terminal, making it ideal for students, educators, and developers seeking a simple, interactive coding environment.

## Features

- User authentication (sign up, sign in)
- Online code editor interface
- User data management (stored in `data/users.json`)
- Static file serving (CSS, JS, images)
- Responsive design for desktop and mobile
- Project logo and preview images

## Project Structure

```
logo.ico                # Application icon
package.json            # Node.js project metadata and dependencies
server.js               # Main server file (Express.js)
data/
  users.json            # User data storage
Img/
  logo.png              # Logo image
  preview-2.png         # Preview image
  prieview.png          # Preview image (possible typo)
public/
  css/                  # CSS stylesheets
  js/                   # JavaScript files
routes/
  auth.js               # Authentication routes
  static.js             # Static file routes
views/
  editor.html           # Editor page
  index.html            # Home page
  signin.html           # Sign-in page
  signup.html           # Sign-up page
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher recommended)

### Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd Quick-Code-Studio-main
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

### Running the Application
Start the server with:
```sh
node server.js
```
The app will be available at `http://localhost:3000` (or the port specified in your `server.js`).

## Usage
- Visit the home page to sign up or sign in.
- Use the editor to write and manage code.
- User data is stored locally in `data/users.json`.

## Folder Details
- **public/css/**: Stylesheets for the UI
- **public/js/**: Client-side JavaScript
- **routes/**: Express.js route handlers
- **views/**: HTML templates
- **data/**: User data storage
- **Img/**: Images and logos

## Author
- GIrish Suthar




