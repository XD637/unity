# Unity API

A simple Node.js Express API with MongoDB for managing Unity classes.

## Endpoints
- `POST /unity` - Create a new class
- `GET /unity` - Get all classes
- `GET /unity/:id` - Get a class by MongoDB ID
- `PUT /unity/:id` - Update a class by MongoDB ID
- `DELETE /unity/:id` - Delete a class by MongoDB ID

## Model Fields
- id (string, unique)
- ClassName (string)
- duration (string)
- Place (string)
- Teachername (string)

## Setup
1. Install dependencies:
```npm install```
2. Start the server:
  ```
npm run dev
   ```

## MongoDB
- Database: unity
- Collection: unity
- Connection string is in `index.js`.
