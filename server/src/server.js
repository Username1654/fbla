import express from "express";
import cors from "cors";
import path from "path";
import loginRoutes from "./routes/login.routes.js"
// import businessRoutes from "./routes/business.routes.js";
import { fileURLToPath } from "url";
const app = express();
const PORT = 5000;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(
  cors({
      origin: "http://localhost:5173",
      credentials:true,
    })
);
app.use(express.json());

app.use('/api/login', loginRoutes)
//GET rout
// app.get("/", (req, res) => {
//   res.send("Server running");
// });
// app.get("/login", (req, res) => {
//   res.send("this is the login page");
// });
// app.get("/business", (req, res) => {
//   res.send("this is the business page");
// });

// login GET requests


app.post("/login", (req,res) =>{

})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
