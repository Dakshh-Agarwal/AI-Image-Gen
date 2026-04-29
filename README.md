# AI Image Gen

A full-stack MERN application for generating high-quality AI images from text prompts, publishing them to a community feed, and downloading results. Enhanced by Google Gemini 2.5 Flash for prompt tuning.

<p align="center">
<img alt="React" src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=0B0F14" />
<img alt="Vite" src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=ffffff" />
<img alt="Node.js" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=ffffff" />
<img alt="Express" src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=ffffff" />
<img alt="MongoDB" src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=ffffff" />
<img alt="Gemini" src="https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white" />
<img alt="Cloudinary" src="https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=ffffff" />
<img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=ffffff" />
</p>

## :rocket: Project Overview

This project provides an end-to-end image generation experience seamlessly powered by top-tier contemporary AI:

1. **Prompt Entry:** The user enters a descriptive prompt.
2. **Prompt Enhancement:** The backend uses **Google Gemini 2.5 Flash** to intelligently enhance and enrich the original prompt.
3. **Image Generation:** The enhanced prompt is passed to **Pollinations.ai** to generate a visually stunning image.
4. **Display:** The image is returned to the frontend as Base64 and shown in the UI.
5. **Community Sharing:** Users can share their creations to a global feed.
6. **Data Resiliency:** The backend stores image metadata in MongoDB and uploads media to Cloudinary, with built-in resilient fallback modes for local testing when network access drops.

## :sparkles: Key Features

- **High-Quality AI Generation:** Free, native image generation via Pollinations.ai.
- **Smart Prompt Tuning:** Intelligent prompt expansion utilizing Google GenAI.
- **Fail-safe Fallbacks:** In-memory fallback posts allow local testing without Cloudinary/MongoDB configuration.
- **Community Feed:** Searchable grid to discover community posts.
- **Responsive UI:** Modern React interface styled efficiently with Tailwind CSS.
- **Image Downloads:** Instantly save generated assets directly to disk.

## :building_construction: Architecture

``mermaid
flowchart LR
    A[React Client<br/>Vite + Tailwind] -->|POST /api/v1/dalle| B[Express API]
    A -->|GET/POST /api/v1/post| B
    B -->|Tune Prompt| C[Google Gemini 2.5 Flash]
    B -->|Generate Image| D[Pollinations.ai Image API]
    B -->|Store Metadata| E[(MongoDB Atlas)]
    B -->|Host Image| F[Cloudinary]
``

## :hammer_and_wrench: Tech Stack

| Layer          | Technology                                   |
|----------------|----------------------------------------------|
| **Frontend**   | React 18, Vite 4, Tailwind CSS, React Router |
| **Backend**    | Node.js, Express                             |
| **Database**   | MongoDB + Mongoose                           |
| **AI Models**  | Google Gemini 2.5 Flash (Text), Pollinations.ai (Image) |
| **Media Storage**| Cloudinary                                |

## :electric_plug: API Endpoints

The backend Express server natively runs on **\http://localhost:5000\**.

| Method | Endpoint | Description |
|---|---|---|
| GET | \/\ | Health-style message from the API |
| GET | \/api/v1/dalle\ | Route health-check message |
| POST | \/api/v1/dalle\ | Generate an image from a text prompt via Gemini + Pollinations |
| GET | \/api/v1/post\ | Get all community posts |
| POST | \/api/v1/post\ | Create and physically store a post |

## :computer: Local Development Setup

Ensure you have Node.js installed, then initialize both the client and server.

1. **Install Server Dependencies:**
   `ash
   cd server
   npm install
   `

2. **Install Client Dependencies:**
   `ash
   cd client
   npm install
   `

3. **Configure Environment Variables (\server/.env\):**
   `env
   MONGODB_URL=your_mongodb_cluster_url
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   GEMINI_API_KEY=your_google_gemini_api_key
   `

4. **Start Development Servers:**
   - **Backend:** \
pm start\ (Runs on \localhost:5000\)
   - **Frontend:** \
pm run dev\ (Runs on \localhost:5173\)
