import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
const PORT = 5000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors(
    {origin: "http://localhost:5173"}
));
app.get("/", (req, res) => {
  res.send("Server running");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
