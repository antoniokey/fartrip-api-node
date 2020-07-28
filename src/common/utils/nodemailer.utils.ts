import mail from '../../../config/nodemailer';

export const sendEmail = (from: string, to: string, subject: string, text?: string, html?: string): void => {
  const mailOptions: any = { from, to, subject };

  if (text) {
    mailOptions.text = text;
  } else if (html) {
    mailOptions.html = html;
  }

  mail.sendMail(mailOptions);
};
