// Dependencies
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const PORT = process.env.PORT || 3000;
// Functions
function sortSecretSanta(participants) {
  let assignments = [...participants];
  let isInvalid = true;
  while (isInvalid) {
    // Fisher-Yates Shuffle
    assignments = assignments
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map((obj) => obj.value);
    isInvalid = participants.some(
      (participant, i) => participant === assignments[i]
    );
  }
  const result = participants.map((giver, i) => ({
    giver,
    receiver: assignments[i],
  }));
  return result;
}
function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT);
  const secure = process.env.SMTP_SECURE === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !port || !user || !pass) {
    throw new Error("Missing SMTP Configuration in Environment Variables");
  }
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}
// App Setup
const app = express();
app.use(cors());
app.use(bodyParser.json());
// API Endpoints
app.get("/api/health", (req, res) => res.json({ status: "OK" }));
app.post("/api/assignments", async (req, res) => {
  try {
    const {
      participants,
      sendEmails = true,
      emailSubject,
      emailTextTemplate,
    } = req.body;
    const pairs = sortSecretSanta(participants);
    if (sendEmails) {
      const transporter = createTransporter();
      const subject = emailSubject || "Your Secret Santa Assignment";
      const template =
        emailTextTemplate ||
        "Hello {{GIVER_NAME}}!\n\nYou are the Secret Santa for: ({{RECEIVER_NAME}}) ({{RECEIVER_EMAIL}}).\n\nHappy Gifiting!";
      for (const { giver, receiver } of pairs) {
        const text = template
          .replace(/\{\{GIVER_NAME\}\}/g, giver.name)
          .replace(/\{\{RECEIVER_NAME\}\}/g, receiver.name)
          .replace(/\{\{RECEIVER_EMAIL\}\}/g, receiver.email);
        const mailOptions = {
          from: process.env.FROM_EMAIL || process.env.SMTP_USER,
          to: giver.email,
          subject,
          text,
        };
        await transporter.sendMail(mailOptions);
      }
    }
    return res.json({ success: true, pairs });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error: error.message });
  }
});
// Start Server
app.listen(PORT, () => {
  console.log(`Secret Santa API Listening on http://localhost:${PORT}`);
});
