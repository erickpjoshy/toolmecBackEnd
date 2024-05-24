import express from 'express';
import User from '../../DB/models/userSchema.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    console.log(req.body);
    const body = { ...req.body };
    const user = await User.findOne({ email: body.email });
    if (user) {
      return res.status(400).json({ error: 'EMAIL ALREADY EXIST' });
    }
    if (body.password != body.confirmPassword) {
      return res.status(400).json({ error: 'PASSWORDS DOES NOT MATCH' });
    }
    const hashedPassword = await bcrypt.hash(body.password, 2);
    body.password = hashedPassword;
    const newUser = await User.create(body);
    return res
      .status(201)
      .json({ message: 'USER SIGNUP SUCCESSFULL', user: newUser });
  } catch (e) {
    res.status(400).json(e);
  }
});

router.post('/login', async (req, res) => {
  try {
    const body = { ...req.body };
    const user = await User.findOne({ email: body.email });
    if (!user) {
      return res.status(403).json({ error: 'EMAIL OR PASSWORD INCORRECT' });
    }
    if (!user.status) {
      return res.status(403).json({ error: 'InActive Account' });
    }
    const isMatching = await bcrypt.compare(body.password, user.password);
    if (!isMatching) {
      return res.status(403).json({ error: 'EMAIL OR PASSWORD INCORRECT' });
    }

    const key = 'jjhjhdbbsjjjsnnwjjkmkmsdjkfdnej';
    const token = jwt.sign({ role: 'User', id: user._id }, key, {
      expiresIn: '10d',
    });
    return res
      .status(200)
      .json({ message: 'User Login Successfull', token: token });
  } catch (e) {
    res.status(400).json(e);
  }
});

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (e) {
    res.status(403).json(e);
  }
});

router.patch('/profile/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = { ...req.body };
    // console.log(body);
    const user = await User.findByIdAndUpdate(id, body);
    res.status(200).json({ user: user, message: 'user updated' });
  } catch (e) {
    res.status(403).json(e);
  }
});

router.get('/profile/:id', async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(id);
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (e) {
    res.status(403).json(e);
  }
});

router.delete('/profile/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.status(201).json({ message: 'user deleted' });
  } catch (e) {
    res.status(403).json(e);
  }
});

router.post('/google', async (req, res) => {
  try {
    const body = { ...req.body };
    const user = await User.findOne({ email: body.email });
    if (!user) {
      const newUser = await User.create(body);
      const key = process.env.SECRET_KEY;
      const token = jwt.sign({ role: 'User', id: newUser._id }, key, {
        expiresIn: '7d',
      });
      return res.status(200).json({ message: 'Login Successfull', token });
    }
    const key = process.env.SECRET_KEY;
    const token = jwt.sign({ role: 'User', id: user._id }, key, {
      expiresIn: '7d',
    });
    return res.status(200).json({ message: 'Login Successfull', token });
  } catch (e) {
    return res.status(403).json({ error: e });
  }
});

export default router;
