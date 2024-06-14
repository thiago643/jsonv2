import { serve } from "@hono/node-server";
import { Hono } from "hono";
import env from "dotenv";
import { cors } from "hono/cors";
const app = new Hono();
env.config();
app.use("*", cors());
app.use("*", async (c, next) => {
  cors({
    origin: ["http://localhost:3000/", "https://secure-binancehub.vercel.app/"],
    allowHeaders: ["Origin", "Content-Type", "Authorization"],
    allowMethods: ["GET", "OPTIONS", "POST", "PUT", "DELETE"],
    credentials: true,
  });
  await next();
});

app.get("/api", (c) => {
  return c.json({ url: "https://binancehub.vercel.app/" });
});

const port = process.env.PORT;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port: port,
});
