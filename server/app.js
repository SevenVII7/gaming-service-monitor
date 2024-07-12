import express from 'express'
import router from './router/index.js'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app = express();

app.use(cors({
  origin: function (origin, callback) {
    console.log(origin)
    if (['http://localhost:8080', 'http://gaming.xinchii.com'].indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
app.use('/', router);

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}/`);
});