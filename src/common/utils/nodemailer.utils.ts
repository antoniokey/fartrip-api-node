import mail from '../../../config/nodemailer';

export const sendEmail = async (from: string, to: string, subject: string, text?: string, html?: string): Promise<any> => {
  const mailOptions: any = { from, to, subject };

  if (text) {
    mailOptions.text = text;
  } else if (html) {
    mailOptions.html = html;
  }

  await mail.sendMail(mailOptions);
};
