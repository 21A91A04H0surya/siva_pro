// import express from 'express';
// import * as dotenv from 'dotenv';
// import { v2 as cloudinary } from 'cloudinary';

// import Post from '../mongodb/models/post.js';

// dotenv.config();

// const router = express.Router();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });
// //get all posts 
// router.route('/').get(async (req, res) => {
//   try {
//     const posts = await Post.find({});
//     res.status(200).json({ success: true, data: posts });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err });
//   }
// });
// //create a post 
// router.route('/').post(async (req, res) => {
//   try {
//     const { name, prompt, photo } = req.body;
//     const photoUrl = await cloudinary.uploader.upload(photo);

//     const newPost = await Post.create({
//       name,
//       prompt,
//       photo: photoUrl.url,
//     });

//     res.status(200).json({ success: true, data: newPost });
//   } catch (err) {
//     res.status(500).json({ success: false, message: err });
//   }
// });

// export default router;
import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch posts' });
  }
});

// Create a post
router.post('/', async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;

    // Validate input data
    if (!name || !prompt || !photo) {
      return res.status(400).json({ success: false, message: 'Name, prompt, and photo are required' });
    }

    // Upload photo to Cloudinary
    const photoUrl = await cloudinary.uploader.upload(photo);

    // Create new post
    const newPost = await Post.create({
      name,
      prompt,
      photo: photoUrl.url,
    });

    res.status(200).json({ success: true, data: newPost });
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ success: false, message: 'Failed to create post' });
  }
});

export default router;
