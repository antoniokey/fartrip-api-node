import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

const transport: Mail = createTransport({
  host: 'smtp.gmail.com',
  secure: true,
  auth: {
    user: process.env.NODEMAILER_EMAIL || '',
    pass: process.env.NODEMAILER_PASSWORD || ''
  },
});

export default transport;
