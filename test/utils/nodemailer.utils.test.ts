import { createTransport } from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

describe('Nodemailer Utils', () => {
  let smtpCredentials: { user: string, pass: string };
  let mail: Mail;

  beforeEach(() => {
    smtpCredentials = { user: 'mail-user@gmail.com', pass: '123' };
    mail = createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      auth: {
        user: smtpCredentials.user,
        pass: smtpCredentials.pass
      },
    });
  });

  it('Should be 535 status code when SMTP credentials are incorrect', async done => {
    const mailOptions = { from: 'mail-user@gmail.com', to: 'testing-user@gmail.com' };
    const expectedResponseCode = 535;

    try {
      await mail.sendMail(mailOptions);
    } catch (err) {
      expect(err.responseCode).toBe(expectedResponseCode);
    }

    done();
  });

});
