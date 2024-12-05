import connectMongo from '../../../lib/mongodb';
import Product from '../../../models/Product';
import Brand from '../../../models/Brand';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const { name, description, category, price, image, brandId } = req.body;
    const brand = await Brand.findById(brandId);

    if (!brand || brand.user.toString() !== session.user.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    const product = new Product({ name, description, category, price, image, brand: brandId, user: session.user.id });
    await product.save();
    return res.status(201).json(product);
  } else if (req.method === 'GET') {
    const products = await Product.find({ user: session.user.id });
    return res.status(200).json(products);
  } else {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
}
