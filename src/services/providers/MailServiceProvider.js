import Email from 'email-templates';
import nodemailer from 'nodemailer';
import { config } from '../config';
import Mail from '../mail';

class MailServiceProvider {
  register() {
    const { host, port, username, password } = config().get('mail');

    const transport =  nodemailer.createTransport({
      host,
      port,
      secure: false,
      auth: {
          user: username,
          pass: password
      }
    });

    const mail = new Mail(transport, new Email());
  }
}

export default MailServiceProvider;