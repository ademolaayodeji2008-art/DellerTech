import nodemailer from "nodemailer";

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  const { EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = process.env;
  if (!EMAIL_HOST || !EMAIL_USER || !EMAIL_PASS) return null;

  transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: Number(EMAIL_PORT) || 465,
    secure: Number(EMAIL_PORT) !== 587,
    auth: { user: EMAIL_USER, pass: EMAIL_PASS },
  });
  return transporter;
}

export async function sendContactNotification({ name, email, message }) {
  const to = process.env.CONTACT_TO_EMAIL;
  const t = getTransporter();

  if (!t || !to) {
    console.log("[mailer] Email env vars not configured — skipping send. Message saved to DB only.");
    return { sent: false };
  }

  await t.sendMail({
    from: `"DellerTech Portfolio" <${process.env.EMAIL_USER}>`,
    to,
    replyTo: email,
    subject: `New portfolio message from ${name}`,
    text: `From: ${name} <${email}>\n\n${message}`,
    html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message.replace(/\n/g, "<br/>")}</p>`,
  });

  return { sent: true };
}
