# Deployment Guide

This guide outlines the step-by-step process for deploying the AI Image Generation application using **Vercel** for the React frontend and **Railway** for the Node.js/Express backend.

---

## 1. Backend Deployment (Railway)

We deploy the backend first so we have the live API URL to configure the frontend.

### Steps:
1. **Log in to Railway:** Go to [Railway.app](https://railway.app/) and log in with your GitHub account.
2. **Create a New Project:** Click on **New Project** -> **Deploy from GitHub repo**.
3. **Select Repository:** Choose your repository from the drop-down list.
4. **Configure Root Directory:** 
   - After selecting the repo, Railway will start deploying the root. Cancel or ignore the first deployment if it fails.
   - Go to the project settings, find the **Service Settings**, and set the **Root Directory** to /server.
5. **Set Environment Variables:** 
   - In the **Variables** tab for your backend service, add all the variables from your local .env file:
     - \MONGODB_URL\
     - \CLOUDINARY_CLOUD_NAME\
     - \CLOUDINARY_API_KEY\
     - \CLOUDINARY_API_SECRET\
     - \GEMINI_API_KEY\
     - \PORT\ (Optional, Railway automatically provides the PORT variable).
6. **Deploy:** Railway will automatically detect Node.js, run \
pm install\, and use the \
pm start\ command from your \server/package.json\ to start the server.
7. **Get Live URL:** Go to the **Settings** tab and click **Generate Domain** (or Networking -> Public Networking). Save this custom Railway URL (e.g., \https://your-app-production.up.railway.app\) for the frontend.

---

## 2. Frontend Deployment (Vercel)

Now that the backend is active, we deploy the Vite React app to Vercel.

### Steps:
1. **Log in to Vercel:** Go to [Vercel.com](https://vercel.com/) and log in with GitHub.
2. **Add New Project:** Click on **Add New...** -> **Project**.
3. **Import Repository:** Find your repository and click **Import**.
4. **Configure Project:**
   - **Framework Preset:** Vercel should automatically detect **Vite**.
   - **Root Directory:** Edit the root directory and select \client\.
   - **Build and Output Settings:** Leave as defaults (Build Command: \
pm run build\, Output Directory: \dist\).
5. **Set Environment Variables:**
   - Add \VITE_API_URL\ as a new variable.
   - Set the value to the live backend URL you generated from Railway.
   - **Important:** Ensure your React code uses \import.meta.env.VITE_API_URL\ wherever it calls the backend instead of \http://localhost:5000\.
6. **Deploy:** Click **Deploy**. Vercel will build your Vite app and give you a live production URL.

---

## 3. Post-Deployment Checklist

- **Test Generation:** Visit your Vercel URL and try generating a new image.
- **Check Dashboard Logs:** Monitor Railway logs if image generations fail to ensure your Gemini and Cloudinary keys are active.
- **CORS Check:** If your frontend receives CORS errors, verify that your backend \server/index.js\ has \pp.use(cors())\ correctly configured to accept requests from your Vercel URL.
