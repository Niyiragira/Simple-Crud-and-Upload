## Setup

1. **Install PostgreSQL** if you don't have it already.
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

### 📦 Item Form-Data Structure

When creating or updating an item via the API (e.g., using Postman), use the following **form-data** fields:

| Field        | Type   | Description                                 |
|--------------|--------|---------------------------------------------|
| `name`       | Text   | The name of the item (required)             |
| `description`| Text   | A description of the item (optional)        |
| `image`      | File   | An image file (PNG, JPEG, or BMP, optional) |

**Example in Postman:**
- Set the request type to `POST` or `PUT`.
- Under the **Body** tab, select **form-data**.
- Add the fields:
  - `name` (type: Text)
  - `description` (type: Text)
  - `image` (type: File) — select a file from your computer

> **Note:** The `image` field must be of type **File** and is optional. If omitted, the item will be created/updated without an image.
