## Setup

1. **Install PostgreSQL** if you don’t have it already.
2. **Create the database** (the default user is `postgres`):
   - Open pgAdmin or psql and run:
     ```sql
     CREATE DATABASE simple_crud_db;
     ```
3. **Copy `.env.example` to `.env`** and fill in your actual credentials.
4. **Install dependencies:**
   ```
   npm install
   ```
5. **Run migrations and seeders:**
   ```
   npm run migrate
   npm run seed
   ```
6. **Start the server:**
   ```
   npm start
   ```
Endpoints are:
Create an item (POST):
http://simple-crud-and-upload-production.up.railway.app/items
Get all items (GET):
http://simple-crud-and-upload-production.up.railway.app/items
Get a single item (GET):
http://simple-crud-and-upload-production.up.railway.app/items/:id
Update an item (PUT):
http://simple-crud-and-upload-production.up.railway.app/items/:id
Delete an item (DELETE):
http://simple-crud-and-upload-production.up.railway.app/items/:id
