# node-todo

A simple single-page todo app built with **Node.js**, **Express**, **MongoDB** and **AngularJS**.

- Node/Express serves a small REST API
- MongoDB (through Mongoose) stores the todos
- AngularJS runs the frontend and calls the API

## Requirements

- [Node.js and npm](https://nodejs.org)
- MongoDB running locally, or a MongoDB connection string for a remote database

## Getting started

```bash
git clone https://github.com/tramslegend/node-todo.git
cd node-todo
npm install
node server.js
```

Then open <http://localhost:8080> in your browser.

The app connects to `mongodb://localhost/meanstacktutorials` by default. To use a different database, edit `localUrl` in [`config/database.js`](config/database.js).

To run on a different port, set the `PORT` environment variable:

```bash
PORT=3000 node server.js          # macOS / Linux / Git Bash
```

```powershell
$env:PORT=3000; node server.js    # Windows PowerShell
```

## API

| Method | Endpoint          | Description                          |
| ------ | ----------------- | ------------------------------------ |
| GET    | `/api/todos`      | List all todos                       |
| POST   | `/api/todos`      | Create a todo (body: `{ "text": "..." }`), returns all todos |
| DELETE | `/api/todos/:id`  | Delete a todo, returns all todos     |

## Project structure

```
node-todo/
├── app/
│   ├── models/todo.js       # Mongoose model
│   └── routes.js            # API routes
├── config/
│   └── database.js          # MongoDB connection strings
├── public/
│   ├── index.html           # Single-page frontend
│   └── js/                  # Angular app, controller and service
└── server.js                # App entry point
```

## Credits

Based on [scotch-io/node-todo](https://github.com/scotch-io/node-todo) by Chris Sevilleja and contributors, from the scotch.io Node and Angular todo tutorial series. A Spanish version of the original README is in [README_es.md](README_es.md).

## License

[MIT](license)
