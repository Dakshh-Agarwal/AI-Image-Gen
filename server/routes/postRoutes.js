import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';
import mongoose from 'mongoose';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();
const fallbackPosts = [];

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.route('/').get(async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({ success: true, data: [...fallbackPosts].reverse() });
    }

    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Fetching posts failed, please try again' });
  }
});

router.route('/').post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    if (!name || !prompt || !photo) {
      return res.status(400).json({ success: false, message: 'name, prompt and photo are required' });
    }

    let finalPhotoUrl = photo;
    try {
      const photoUrl = await cloudinary.uploader.upload(photo);
      finalPhotoUrl = photoUrl.url;
    } catch (uploadErr) {
      console.warn('Cloudinary upload failed, using original image payload');
    }

    if (mongoose.connection.readyState !== 1) {
      const newPost = {
        _id: `fallback-${Date.now()}`,
        name,
        prompt,
        photo: finalPhotoUrl,
      };
      fallbackPosts.unshift(newPost);
      return res.status(201).json({ success: true, data: newPost, fallback: true });
    }

    const newPost = await Post.create({
      name,
      prompt,
      photo: finalPhotoUrl,
    });

    res.status(201).json({ success: true, data: newPost });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Unable to create a post, please try again' });
  }
});

export default router;
