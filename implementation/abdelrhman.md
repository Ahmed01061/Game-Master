# 🎮 Game Module Setup

## 📦 Game Model (Schema)

### Fields:

- `title`: `String` – Game title
- `description`: `String` – Detailed description of the game
- `price`: `Number` – Game price
- `coverImage`: `String` – Image path or URL
- `platform`: `String` – e.g., PC, PlayStation, Xbox
- `genre`: `String` – e.g., Action, Adventure
- `stock`: `Number` – Available stock quantity

---

## 📁 Game Router

### Endpoints:

- `GET /` → Get **all games**
- `POST /` → **Create a new game**

---

## 🧠 Game Controller

### Functions:

- `getGames` → Return a list of all games
- `createGame` → Add a new game to the database

---

## 🛡️ Middleware

- **Multer** → For handling file uploads (e.g., `coverImage`)
- **Validation** → Validate incoming request data (e.g., required fields, types)

---

## 📦 Installation

Install required dependency:
