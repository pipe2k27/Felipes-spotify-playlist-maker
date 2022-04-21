import express from 'express';
import cors from 'cors';
import Router from 'express-promise-router';
import SpotifyWebApi from 'spotify-web-api-node';
import dotenv from 'dotenv';

dotenv.config({ path: process.env.ENV_PATH || '.env' });

const { env } = process;

// const PORT = process.env.PORT || 8000;
const PORT = 8000;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

const router = Router();
app.use(router);

app.get('/', async (req, res) => {
  res.send('Api is live.');
});

app.post('/login', async (req, res) => {
  const code = req.body.code;
  try {
    const spotifyApi = new SpotifyWebApi({
      redirectUri: process.env.REDIRECT_URI,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
    });

    const data = await spotifyApi.authorizationCodeGrant(code);

    const tokens = {
      accessToken: data.body.access_token,
      refreshToken: data.body.refresh_token,
      expiresIn: data.body.expires_in,
    };

    res.status(200).send(tokens);
  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(PORT, () => console.log('app is live on port 8000'));
