import express from "express";
import type { Request, Response, NextFunction } from "express";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(
    `New ${req.method} request to ${req.url} received at ${new Date().toISOString()} `,
  );

  next();
});

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to our backend pern app");
});

app.listen(PORT, () => {
  console.log(`Backend app is running on port ${PORT}`);
});
