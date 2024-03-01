import express from 'express';
import multer from 'multer';
import { nanoid } from 'nanoid';
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${nanoid()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post('/image', upload.single('file'), (req, res) => {
  res.status(201).json({ url: `http://localhost:4444/${req.file.filename}` });
});

export default router;
