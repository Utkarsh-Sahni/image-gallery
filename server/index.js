import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import mongoose from "mongoose";
import authRouter from './routes/auth.js'
import postRouter from './routes/posts.js'
import { uploadImage } from "./controllers/posts.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use('/uploads', express.static('uploads'));


/*Image Storage */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+"_"+ file.originalname);
  },
});
const upload = multer({ storage: storage});



/*DB connection */
const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewURLParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to mongoDB");
  })
  .catch((err) => {
    console.log("Connection failed:", err);
  });



  /* routes*/
  app.post('/posts/upload', upload.single('image'), uploadImage);

app.use('/auth', authRouter);
app.use('/posts', postRouter);



app.listen(PORT, () => {
  console.log(`Listening to Port ${PORT}`);
});
