import connectMongo from '../../../lib/mongodb';
import Brand from '../../../models/Brand';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const { id } = req.query;
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const brand = await Brand.findById(id);
    if (brand.user.toString() !== session.user.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    if (req.method === 'GET') {
      return res.status(200).json(brand);
    }

    if (req.method === 'PUT') {
      const { name, description, logo } = req.body;
      brand.name = name || brand.name;
      brand.description = description || brand.description;
      brand.logo = logo || brand.logo;
      await brand.save();
      return res.status(200).json(brand);
    }

    if (req.method === 'DELETE') {
      await brand.delete();
      return res.status(200).json({ message: 'Brand deleted' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error processing request' });
  }
}
