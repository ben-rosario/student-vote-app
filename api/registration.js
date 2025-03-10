import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let client;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { phoneNumber } = req.body;
  if (!phoneNumber) {
    return res.status(400).json({ error: 'Phone number is required' });
  }

  try {
    if (!client) {
      client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      await client.connect();
    }

    const db = client.db('test');
    const collection = db.collection('registrations');

    await collection.insertOne({ phoneNumber, createdAt: new Date() });

    return res.status(200).json({ message: 'Succesfully registered! You will recieve a text when ASSC elections begin.' });
  } catch (error) {
    console.error('Error saving phone number:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
