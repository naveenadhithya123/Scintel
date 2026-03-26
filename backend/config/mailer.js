import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  auth: {
    user: "a5bbdb001@smtp-brevo.com",
    pass: "xsmtpsib-62603cbb9a280ce7ba48cd056c53b027c2f48a58f8e518a471d778854d5b127f-KvhR3ta1KafYJmZO"
  }
});

export default transporter;
