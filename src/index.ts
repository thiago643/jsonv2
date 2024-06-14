import { serve } from "@hono/node-server";
import { Hono } from "hono";
import env from "dotenv";
const app = new Hono();
env.config();
app.get("/api", (c) => {
  return c.json({ url: "https://binancehub.vercel.app/" });
});

const port = process.env.PORT;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port: port,
});
