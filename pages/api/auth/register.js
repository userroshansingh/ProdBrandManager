import bcrypt from 'bcrypt';
import User from '../../../models/User';
import connectMongo from '../../../lib/mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password, name } = req.body;
    await connectMongo();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, name });
    await user.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
