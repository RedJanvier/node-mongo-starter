/* eslint-disable class-methods-use-this */
import Mailgen from 'mailgen';
import { createTransport, getTestMessageUrl } from 'nodemailer';
import authHelpers from './auth';

const { EMAIL, EMAIL_PASS, BASE_URL, JWT_SECRET } = process.env;

class MailHelpers {
  constructor() {
    this.mailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'Node Mongo Starter - by RedJanvier',
        link: `${BASE_URL}`,
      },
    });

    this.transporter = createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: EMAIL,
        pass: EMAIL_PASS,
      },
    });

    this.sendMail = (mailOptions) => {
      const info = this.transporter.sendMail(mailOptions);
      return console.log(`Preview: ${getTestMessageUrl(info)}`);
    };
  }

  requestEmailConfirm({ email, name }) {
    const token = authHelpers.signToken({ email }, JWT_SECRET, '1day');
    const template = {
      body: {
        name,
        intro: `Welcome to Node Mongo Starter🔥! We're very excited to have you on board.`,
        action: {
          instructions:
            'To get started with the starter confirm your email by clicking the button below 👇👇👇',
          button: {
            color: '#008c52',
            text: 'Confirm your Email',
            link: `${BASE_URL}/api/v1/users/confirm/${token}`,
          },
        },
        outro:
          "The link will be expired by tomorrow! So don't miss the chance today.",
      },
    };
    const mailOptions = {
      to: email,
      subject: 'Email Verification - NMS',
      from: '"noreply@nms.com"<noreply@nms.com>',
      html: this.mailGenerator.generate(template),
    };
    this.sendMail(mailOptions);
  }
}

const mailHelpers = new MailHelpers();

export default mailHelpers;
