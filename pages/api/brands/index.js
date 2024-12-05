import connectMongo from '../../../lib/mongodb';
import Brand from '../../../models/Brand';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const { name, description, logo } = req.body;
    const brand = new Brand({ name, description, logo, user: session.user.id });
    await brand.save();
    return res.status(201).json(brand);
  } else if (req.method === 'GET') {
    const brands = await Brand.find({ user: session.user.id });
    return res.status(200).json(brands);
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
