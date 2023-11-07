import nodemailer from "nodemailer";
import { FRONTEND_URI, SMTP_HOST, SMTP_PASS, SMTP_PORT, SMTP_USER } from "../data/config";

class MailService {
	private transporter = nodemailer.createTransport({
		host: SMTP_HOST,
		port: SMTP_PORT,
		secure: false,
		auth: {
			user: SMTP_USER,
			pass: SMTP_PASS,
		},
	});

	sendConfirmationMail = async (to: string, link: string) => {
		await this.transporter.sendMail({
			from: SMTP_USER,
			to,
			subject: "Account confirmation",
			text: "",
			html: `
				<div>
					<h1>To confirm, follow the link</h1>
					<a href="${FRONTEND_URI}/users/confirm/${link}">Confirm</a>
				</div>
			`,
		});
	};
}

export default MailService;
