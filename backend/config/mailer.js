const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_SENDER_EMAIL = process.env.BREVO_SENDER_EMAIL || "lap100gbfree@gmail.com";
const BREVO_SENDER_NAME = process.env.BREVO_SENDER_NAME || "Scintel";

if (!BREVO_API_KEY) {
  throw new Error("Missing BREVO_API_KEY environment variable");
}

const parseSender = (from) => {
  const match = from?.match(/"?(.*?)"?\s*<([^>]+)>/);

  if (match) {
    return {
      name: match[1],
      email: match[2]
    };
  }

  return {
    name: BREVO_SENDER_NAME,
    email: from || BREVO_SENDER_EMAIL
  };
};

const transporter = {
  async sendMail({ from, to, subject, html, text }) {
    const sender = parseSender(from);

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        sender,
        to: Array.isArray(to) ? to.map((email) => ({ email })) : [{ email: to }],
        subject,
        htmlContent: html,
        textContent: text
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Brevo API error: ${response.status} ${errorText}`);
    }

    return response.json();
  }
};

export default transporter;
