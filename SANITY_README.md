# Sanity Setup Guide

Your project is now configured to use **Sanity.io** as the Content Management System (CMS).

## 1. Create a Sanity Project
1. Go to [sanity.io](https://www.sanity.io) and create a new project.
2. Retrieve your **Project ID** and **Dataset Name** (usually `production`).

## 2. Configure Environment Variables
Create a `.env` (or `.env.local` for local, and Vercel Environment Variables for production) with the following:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID="your_project_id_here"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-02-13"
```

## 3. Access the Studio
Run the dev server and visit:
`http://localhost:3000/studio`

You will be asked to log in. Once logged in, you can add "Car" documents.

## 4. Import Initial Data (Optional)
Since you are starting fresh, you might want to import the 9 mock cars.
I can generate a `.ndjson` file for you to import using CLI:
`npx sanity dataset import initial-data.ndjson production`

## 5. Fallback Mode
Currently, the website is running in **Hybrid Mode**.
- It attempts to fetch from Sanity.
- If it fails (invalid keys) or finds no data, it falls back to the hardcoded `cars.ts` data.
- Once you add data to Sanity, it will start appearing on the site automatically (after revalidation).
