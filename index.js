import express from 'express';
import cors from 'cors';
import DB from './DB/dbConnection.js';
import routes from './routes/index.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
//malewares
app.use(express.json());
app.use(cors());
app.use(routes);
app.use(express.static('uploads'));

// CORS middleware setup
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://toolmecback.erickpjoshy.cloud',
  'https://toolmec.erickpjoshy.cloud',
];

const corsOptions = {
  origin: function (origin, callback) {
    if (
      !origin ||
      allowedOrigins.includes(origin) ||
      process.env.NODE_ENV === 'development'
    ) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.get('/', (req, res) => {
  res.status(200).json('Service started');
});

app.use('*', (req, res) => {
  console.log('invalid link');
});
const PORT = process.env.PORT || 4445;
app.listen(PORT, () => {
  console.log(`app is running @ http://localhost:${PORT}/`);
});

// app.listen(4445, () => {
//   console.log('app is running @ http://localhost:4445/');
// });
