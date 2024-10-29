import "dotenv/config";
import express, { Request, Response } from "express";

const app = express();
const host = process.env.HOST || "localhost";
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
