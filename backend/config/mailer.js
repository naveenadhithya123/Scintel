const BREVO_API_KEY = "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";

const parseSender = (from) => {
  const match = from?.match(/"?(.*?)"?\s*<([^>]+)>/);

  if (match) {
    return {
      name: match[1],
      email: match[2]
    };
  }

  return {
    name: "Scintel",
    email: from || "lap100gbfree@gmail.com"
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
