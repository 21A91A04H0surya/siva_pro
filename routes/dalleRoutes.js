// import express from 'express';
// import * as dotenv from 'dotenv';
// import { Configuration, OpenAIApi } from 'openai';

// dotenv.config();

// const router = express.Router();

// const configuration = new Configuration({
//   apiKey: process.env.OPEN_AI_API_KEY,
// });

// const openai = new OpenAIApi(configuration);

// router.route('/').get((req, res) => {
//   // res.status(200).json({ message: 'Hello from DALL-E!' });
//   res.send('hello dall-e');
// });



// router.route('/').post(async(req, res) => {
//   try {
//     const { prompt } = req.body;
//     const aiResponse = await openai.createImage({
//       prompt,
//       n: 1,
//       size: '1024x1024',
//       response_format: 'b64_json',
//     });
//     const image = aiResponse.data.data[0].b64_json;
//     res.status(200).json({ photo: image});
//   }
//   catch(err) {
//     console.log(err);
//     res.status(500).send(err?.response.data.error.message);
//   }
// })

// export default router;
import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Middleware to parse JSON bodies
router.use(express.json());

router.get('/', (req, res) => {
  res.send('Hello from DALL-E!');
});

router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body;

    // Validate prompt
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });

    const image = aiResponse.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
