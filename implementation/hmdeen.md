# 🎮 Game Module Setup

## Game Router

### Endpoints:

PUT /:id → Update an existing game by ID (partial update, coverImage optional).
DELETE /:id → Delete a game by ID.

---

## Game Controller

### Functions:

updateGame → Update specific fields of a game by ID (all fields optional).
deleteGame → Delete a game by ID.

---

## Validations

- **Validation** → Validate incoming request data (e.g., required fields, types)
