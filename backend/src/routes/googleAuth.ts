import express from "express";
import { User } from "database/models";

const router = express.Router();
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);

router.post("/google", async (req: any, res: any) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    setTimeout(function () {
      if (!ticket) throw new Error("Timeout on logging in");
    }, 500);
    const { name, email } = ticket.getPayload();
    let user = await User.findOne({ email: email }).exec();
    if (!user) {
      user = await User.create({ name: name, email: email });
    }
    req.session.userId = user?._id;
    res.status(201);
    res.json(user);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Could not log in" });
  }
});

router.delete("/logout", async (req: any, res) => {
  if (!req.user) {
    return res.status(500).send({ error: "No user logged in" });
  }
  await req.session.destroy();
  res.status(200);
  res.json({
    message: "Logged out successfully",
  });
});

router.get("/current/user", async (req: any, res) => {
  if (!req.user) {
    return res.status(404).send({ error: "User not found" });
  }
  res.status(200);
  res.json(req.user);
});

export default router;
