import express from 'express';
import cors from 'cors';
import DB from './DB/dbConnection.js';
import routes from './routes/index.js';
const app = express();
app.use(express.json());
app.use(cors());
app.use(routes);
app.use(express.static('uploads'));
app.use('*', (req, res) => {
  console.log('invalid link');
});
app.listen(4444, () => {
  console.log('app is running @ http://localhost:4444/');
});
