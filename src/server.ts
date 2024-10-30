import "dotenv/config";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";

const app = express();
const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "../public")));

app.listen(port, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
