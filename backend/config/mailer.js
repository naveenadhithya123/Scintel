import nodemailer from "nodemailer";

const { user, pass } = process.env;

if (!user || !pass) {
  throw new Error("Missing mail environment variables");
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user,
    pass
  }
});

export default transporter;
