import { MailAdapter, SendMailData } from "../MailAdapter";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3fda454ceae765",
    pass: "03625977122595"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
            from: 'Equipe Feedget <equipe@feedget.com>',
            to: 'Leonardo Reis <leosenhordosjogos@hotmail.com>',
            subject,
            html: body
        });
    }
}
