import { createTransport } from 'nodemailer';

const transport: any = createTransport({
  host: 'smtp.gmail.com',
  secure: true,
  auth: {
    user: process.env.NODEMAILER_EMAIL || '',
    pass: process.env.NODEMAILER_PASSWORD || ''
  },
});

export default transport;
