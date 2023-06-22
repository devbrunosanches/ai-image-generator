import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration); // a payment is necessary for using openai api

router.route('/').get((req, res) =>
{
    res.status(200).json({ message: 'AI Image Generator!' });
});

router.route('/').post(async (req, res) =>
{
    try {
        const { prompt } = req.body;
        console.log(req.body);

        const aiResponse = await openai.createImage({
            prompt: "",
            n: 1,
            size: "1024x1024",
            //response_format: 'b64_json',
        });
        console.log(aiResponse.data);
        
        const data = await aiResponse.json();

        const image = aiResponse.data.data[0].url;
        res.status(200).json({ image });
    } catch (error) {
        console.error(error);
        res.status(500).send(error?.response.data.error.message);
    }
});

export default router;
