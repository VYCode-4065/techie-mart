import nodemailer from "nodemailer";

type SendEmailPayload = {
    to: string;
    subject: string;
    html: string;
};

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT ? Number(process.env.EMAIL_PORT) : 587,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: process.env.EMAIL_USER && process.env.EMAIL_PASS ? {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    } : undefined
});

const sendEmail = async ({ to, subject, html }: SendEmailPayload) => {
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.log('Email transport is not configured. Falling back to console output.');
        console.log('To:', to);
        console.log('Subject:', subject);
        console.log('HTML:', html);
        return;
    }

    await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
        to,
        subject,
        html
    });
};

export default sendEmail;
