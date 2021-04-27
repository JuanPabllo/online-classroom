import { NextApiRequest, NextApiResponse } from 'next';
import { rmdirSync } from 'node:fs';
import connect from '../../utils/database';

interface ErrorResponseProp {
  error: string;
}

interface SuccessResponseProp {
  _id: string;
  name: string;
  email: string;
  cellphone: string;
  teacher: true;
  coins: 1;
  courses: string[];
  available_hours: object;
  available_location: string[];
  reviews: object[];
  appointments: object[];
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseProp | SuccessResponseProp>
): Promise<void> => {
  if (req.method === 'POST') {
    const {
      name,
      email,
      cellphone,
      teacher,
      courses,
      available_hours,
      available_location,
    } = req.body;

    if (!teacher) {
      if (!name || !email || !cellphone) {
        res.status(400).json({ error: 'Missing body parameter' });
        return;
      }
    } else if (teacher) {
      if (
        !name ||
        !email ||
        !cellphone ||
        !teacher ||
        !courses ||
        !available_hours ||
        !available_location
      ) {
        res.status(400).json({ error: 'Missing body parameter' });
        return;
      }
    }

    const { db } = await connect();

    const response = await db.collection('users').insertOne({
      name,
      email,
      cellphone,
      teacher,
      coins: 1,
      courses: courses || [],
      available_hours: available_hours || {},
      available_location: available_location || [],
      reviews: [],
      appointments: [],
    });

    res.status(200).json(response.ops[0]);
  } else if (req.method === 'GET') {
    const { email } = req.body;
    if (!email) {
      res.status(404).json({ error: 'Missing e-mail on request body' });
      return;
    }

    const { db } = await connect();

    const response = await db.collection('users').findOne({ email });

    if (!response) {
      res.status(404).json({ error: 'User with this e-mail not found' });
      return;
    }

    res.status(200).json(response);
  } else {
    res.status(400).json({ error: 'Wrong request method' });
  }
};
