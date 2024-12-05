import connectMongo from '../../../lib/mongodb';
import Product from '../../../models/Product';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const { id } = req.query;
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const product = await Product.findById(id);
    if (product.user.toString() !== session.user.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    if (req.method === 'GET') {
      return res.status(200).json(product);
    }

    if (req.method === 'PUT') {
      const { name, description, category, price, image } = req.body;
      product.name = name || product.name;
      product.description = description || product.description;
      product.category = category || product.category;
      product.price = price || product.price;
      product.image = image || product.image;
      await product.save();
      return res.status(200).json(product);
    }

    if (req.method === 'DELETE') {
      await product.delete();
      return res.status(200).json({ message: 'Product deleted' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Error processing request' });
  }
}
