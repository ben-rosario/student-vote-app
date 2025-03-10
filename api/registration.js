import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { phoneNumber } = req.body;
  if (!phoneNumber) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  try {
    const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await client.connect();

    const db = client.db('test'); // Replace with actual database name
    const collection = db.collection('registrations'); // Replace with actual collection name

    // **Check if the phone number already exists**
    const existingUser = await collection.findOne({ phoneNumber });
    if (existingUser) {
      return res.status(200).json({ message: 'This phone number is already registered.' });
    }

    // **Insert new phone number if not found**
    await collection.insertOne({ phoneNumber, createdAt: new Date() });

    return res.status(200).json({
      message: 'Successfully registered! You will receive a text when ASSC elections begin.'
    });

  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
