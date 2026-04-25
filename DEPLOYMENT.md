# Deployment Guide

This document describes how to deploy the project end-to-end using any hosting provider of your choice.

## 1. Deployment Architecture

- Frontend: React + Vite app from `client/`
- Backend: Node.js + Express API from `server/`
- Database: MongoDB (managed or self-hosted)
- Media storage: Cloudinary

## 2. Backend Deployment

Deploy the `server/` folder as a Node.js service.

### Build and Start

- Install command: `npm install`
- Start command: `npm start`
- Runtime: Node.js 18+
- Port: use the platform-provided port if required

### Required Environment Variables

Set all of the following on your backend service:

```env
MONGODB_URL=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Backend Health Check

After deploy, verify:

- `GET /` returns `{ "message": "Hello from DALL.E!" }`
- `GET /api/v1/post` returns `{ success: true, data: [...] }` when data exists

## 3. Frontend Deployment

Deploy the `client/` folder as a static Vite site.

### Build Settings

- Install command: `npm install`
- Build command: `npm run build`
- Output directory: `dist`

### Required Environment Variable

Set this in your frontend deployment environment:

```env
VITE_API_URL=https://your-backend-domain
```

The frontend uses `VITE_API_URL` to call:

- `POST /api/v1/dalle`
- `GET /api/v1/post`
- `POST /api/v1/post`

## 4. End-to-End Validation Checklist

1. Open the frontend URL and confirm the app loads.
2. Create a prompt and generate an image.
3. Share the generated image to the community.
4. Confirm the image appears on the home feed.
5. Download an image card and verify file output.

## 5. Troubleshooting

- `Failed to fetch` from frontend:
  - Check `VITE_API_URL` value and redeploy frontend.
  - Ensure backend CORS is enabled and backend is reachable.
- Backend starts but image generation fails:
  - Verify `OPENAI_API_KEY` is valid.
- Post creation fails:
  - Verify Cloudinary credentials and MongoDB connection string.

## 6. Hardening Recommendations

- Add request validation and payload size limits per route.
- Add authentication/authorization for post creation.
- Add API rate limiting for generation endpoints.
- Add structured logging and monitoring.
- Rotate API keys regularly.
