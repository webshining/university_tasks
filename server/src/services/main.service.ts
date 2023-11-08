import Queue from "bull";
import nodemailer from "nodemailer";
import { FRONTEND_URI, REDIS_URI, SMTP_HOST, SMTP_PASS, SMTP_PORT, SMTP_USER } from "../data/config";

class MailService {
	private emailQueue = new Queue("email sending", REDIS_URI);
	private transporter = nodemailer.createTransport({
		host: SMTP_HOST,
		port: SMTP_PORT,
		secure: false,
		auth: {
			user: SMTP_USER,
			pass: SMTP_PASS,
		},
	});
	constructor() {
		this.emailQueue.process(async (job) => {
			this.transporter.sendMail(job.data);
		});
	}

	sendConfirmationMail = async (to: string, link: string) => {
		const mailOptions = {
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
		};
		this.emailQueue.add(mailOptions);
	};
}

export default MailService;
