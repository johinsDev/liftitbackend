import path from 'path';
import MessageBuilder from './message';

class Mailer {
  constructor(transport, view) {
    if(!Mailer.instance){
      Mailer.instance = this;
      this.transport = transport;
      this.view = view;
    }
 
    return Mailer.instance;
  }

  async send(view, data, callback = null) {
    const message = this.buildMessge();

    callback(message);

    message.body(await this.parseView(view, data));

    try {
      const info = await this.transport.sendMail(message);

      console.log('Message sent: %s', info.messageId)
    } catch (error) {
      throw error;
    }
  }

  parseView(view, data) {
    return this.view.renderAll(path.join(global.__basedir + '/emails', view), data);
  }

  buildMessge() {
    return new MessageBuilder();
  }
}

export function mail() {
  return new Mailer();
}

export default Mailer;