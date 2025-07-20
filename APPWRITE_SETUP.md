# Appwrite Configuration Setup

## The Issue
Your blog website is showing "An unexpected error occurred" during login because the Appwrite configuration is missing.

## Solution
You need to create a `.env` file in the root directory of your project with the following Appwrite configuration:

```env
# Appwrite Configuration
VITE_APPWRITE_URL=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id_here
VITE_APPWRITE_DB_ID=your_database_id_here
VITE_APPWRITE_COLLECTION_ID=your_collection_id_here
VITE_APPWRITE_BUCKET_ID=your_bucket_id_here
```

## Steps to Get Your Appwrite Credentials:

1. **Create an Appwrite Account**
   - Go to https://appwrite.io/
   - Sign up for a free account

2. **Create a New Project**
   - In the Appwrite console, create a new project
   - Give it a name like "Blog Website"

3. **Get Your Project ID**
   - In your project dashboard, go to Settings > General
   - Copy the "Project ID"

4. **Create a Database**
   - Go to Databases in your project
   - Create a new database
   - Copy the Database ID

5. **Create a Collection**
   - In your database, create a new collection
   - Copy the Collection ID

6. **Create a Storage Bucket**
   - Go to Storage in your project
   - Create a new bucket
   - Copy the Bucket ID

7. **Update the .env file**
   - Replace all the placeholder values with your actual IDs

## After Configuration
Once you've created the `.env` file with your actual Appwrite credentials:
1. Stop your development server (Ctrl+C)
2. Restart it with `npm run dev`
3. Try logging in again

The login should now work properly! 