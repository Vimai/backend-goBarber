import express from 'express';
import routes from './routes/index';

const app = express();

app.use(express.json());

app.use(routes);

app.listen(3333, () => {
  console.log('🔝 Server Started on port 3333');
});
